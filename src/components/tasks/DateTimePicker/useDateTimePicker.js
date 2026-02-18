import { useState } from "react";
import { createDateTime } from "./dateTimeUtils";

export const useDateTimePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hours, setHours] = useState("12");
    const [minutes, setMinutes] = useState("00");
    const [step, setStep] = useState("date");

    const changeMonth = (offset) => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + offset,
            ),
        );
    };

    const handleConfirm = (onSelect, onClose) => {
        if (step === "date") {
            setStep("time");
        } else {
            onSelect(createDateTime(selectedDate, hours, minutes));
            onClose();
            setStep("date");
        }
    };

    return {
        selectedDate,
        currentMonth,
        hours,
        minutes,
        step,
        setSelectedDate,
        setHours,
        setMinutes,
        setStep,
        changeMonth,
        handleConfirm,
    };
};
