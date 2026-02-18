import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { tasksToCSV, tasksToFormattedCSV } from "./csvConverter";
import { MONTH_NAMES, generateFilename } from "./downloadUtils";
import { loadTasksByMonth } from "./taskQueries";

const triggerDownloadRN = async (content, filename, mimeType) => {
    const file = new File(Paths.cache, filename);
    file.write(content); // synchronous, no async needed
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
        await Sharing.shareAsync(file.uri, {
            mimeType,
            dialogTitle: `Save ${filename}`,
        });
    }
    return { success: true, filename };
};

export const downloadTasksByMonthAsJSON = async (userEmail, year, month) => {
    try {
        if (!userEmail)
            return { success: false, error: "User email is required" };
        const result = await loadTasksByMonth(userEmail, year, month);
        if (!result.success) return { success: false, error: result.error };
        const filename = generateFilename(year, month, "json");
        const exportData = {
            exportDate: new Date().toISOString(),
            month: MONTH_NAMES[month - 1],
            year,
            totalTasks: result.tasks.length,
            tasks: result.tasks,
        };
        await triggerDownloadRN(
            JSON.stringify(exportData, null, 2),
            filename,
            "application/json",
        );
        return { success: true, filename, taskCount: result.tasks.length };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Failed to download tasks",
        };
    }
};

export const downloadTasksByMonthAsCSV = async (
    userEmail,
    year,
    month,
    formatted = true,
) => {
    try {
        if (!userEmail)
            return { success: false, error: "User email is required" };
        const result = await loadTasksByMonth(userEmail, year, month);
        if (!result.success) return { success: false, error: result.error };
        const filename = generateFilename(year, month, "csv");
        const content = formatted
            ? tasksToFormattedCSV(result.tasks)
            : tasksToCSV(result.tasks);
        await triggerDownloadRN(content, filename, "text/csv");
        return { success: true, filename, taskCount: result.tasks.length };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Failed to download tasks",
        };
    }
};

export const downloadTasksByMonth = async (
    userEmail,
    year,
    month,
    format = "json",
    formattedDates = true,
) => {
    if (!userEmail) return { success: false, error: "User email is required" };
    if (format === "csv")
        return downloadTasksByMonthAsCSV(
            userEmail,
            year,
            month,
            formattedDates,
        );
    return downloadTasksByMonthAsJSON(userEmail, year, month);
};
