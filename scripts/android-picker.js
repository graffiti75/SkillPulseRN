#!/usr/bin/env node

/**
 * SkillPulse - Android Emulator Picker
 *
 * This script lists all available AVDs and lets you pick one
 * before launching `expo start --android` with that specific emulator.
 *
 * Usage: npm run android
 */

const { execSync, spawn } = require("child_process");
const readline = require("readline");

// ─── Helpers ────────────────────────────────────────────────────────────────

function getAvdList() {
    try {
        // $ANDROID_HOME/emulator/emulator -list-avds
        const androidHome =
            process.env.ANDROID_HOME ||
            process.env.ANDROID_SDK_ROOT ||
            (process.platform === "darwin"
                ? `${process.env.HOME}/Library/Android/sdk`
                : process.platform === "win32"
                  ? `${process.env.LOCALAPPDATA}\\Android\\Sdk`
                  : `${process.env.HOME}/Android/Sdk`);

        const emulatorBin =
            process.platform === "win32"
                ? `"${androidHome}\\emulator\\emulator.exe"`
                : `"${androidHome}/emulator/emulator"`;

        const output = execSync(`${emulatorBin} -list-avds`, {
            encoding: "utf8",
        });
        return output
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
    } catch {
        return [];
    }
}

function getRunningEmulators() {
    try {
        const output = execSync("adb devices", { encoding: "utf8" });
        return output
            .split("\n")
            .slice(1)
            .filter((l) => l.includes("emulator") && l.includes("device"))
            .map((l) => l.split("\t")[0].trim());
    } catch {
        return [];
    }
}

function bootEmulator(avdName) {
    return new Promise((resolve, reject) => {
        const androidHome =
            process.env.ANDROID_HOME ||
            process.env.ANDROID_SDK_ROOT ||
            (process.platform === "darwin"
                ? `${process.env.HOME}/Library/Android/sdk`
                : process.platform === "win32"
                  ? `${process.env.LOCALAPPDATA}\\Android\\Sdk`
                  : `${process.env.HOME}/Android/Sdk`);

        const emulatorBin =
            process.platform === "win32"
                ? `${androidHome}\\emulator\\emulator.exe`
                : `${androidHome}/emulator/emulator`;

        console.log(`\n🚀 Booting emulator "${avdName}"...`);

        const proc = spawn(emulatorBin, ["-avd", avdName], {
            detached: true,
            stdio: "ignore",
        });
        proc.unref();

        // Poll adb until the emulator appears as 'device'
        const start = Date.now();
        const poll = setInterval(() => {
            const running = getRunningEmulators();
            if (running.length > 0) {
                clearInterval(poll);
                console.log(
                    `✅ Emulator ready: ${running[running.length - 1]}`,
                );
                resolve(running[running.length - 1]);
            }
            if (Date.now() - start > 90_000) {
                clearInterval(poll);
                reject(new Error("Timed out waiting for emulator to boot"));
            }
        }, 2000);
    });
}

function ask(question, rl) {
    return new Promise((resolve) => rl.question(question, resolve));
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
    const avds = getAvdList();
    const runningEmulators = getRunningEmulators();

    if (avds.length === 0) {
        console.error("\n❌ No AVDs found.");
        console.error(
            "   Create one via Android Studio → AVD Manager, then try again.\n",
        );
        process.exit(1);
    }

    console.log("\n📱 Available Android Emulators:\n");

    avds.forEach((avd, i) => {
        const isRunning = runningEmulators.some(
            (e) =>
                // Running emulator serial e.g. emulator-5554 won't match name directly,
                // but we note if any emulators are already up.
                false,
        );
        console.log(`  [${i + 1}] ${avd}`);
    });

    if (runningEmulators.length > 0) {
        console.log(
            `\n  ℹ️  ${runningEmulators.length} emulator(s) already running: ${runningEmulators.join(", ")}`,
        );
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let choice;
    while (true) {
        const raw = await ask(`\nEnter number [1–${avds.length}]: `, rl);
        const n = parseInt(raw.trim(), 10);
        if (!isNaN(n) && n >= 1 && n <= avds.length) {
            choice = n - 1;
            break;
        }
        console.log(
            `⚠️  Invalid choice. Please enter a number between 1 and ${avds.length}.`,
        );
    }

    rl.close();

    const selectedAvd = avds[choice];
    console.log(`\n✔ Selected: "${selectedAvd}"`);

    // Boot the emulator if it's not already running
    try {
        await bootEmulator(selectedAvd);
    } catch (err) {
        console.error(`\n❌ Failed to boot emulator: ${err.message}`);
        process.exit(1);
    }

    // Now start Expo targeting that specific device
    console.log("\n▶  Starting Expo...\n");
    const expo = spawn("npx", ["expo", "start", "--android"], {
        stdio: "inherit",
        shell: true,
        env: {
            ...process.env,
            // Pass chosen AVD so Expo opens it (works with Expo SDK 49+)
            EXPO_ANDROID_SERIAL: getRunningEmulators().pop() || "",
        },
    });

    expo.on("error", (err) => {
        console.error("\n❌ Failed to start Expo:", err.message);
        process.exit(1);
    });

    expo.on("exit", (code) => {
        process.exit(code ?? 0);
    });
}

main().catch((err) => {
    console.error("\n💥 Unexpected error:", err.message);
    process.exit(1);
});
