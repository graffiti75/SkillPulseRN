import { useEffect, useState } from "react";

export const useTaskFormState = (editTask, isOpen) => {
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editTask) {
            setDescription(editTask.description);
            setStartTime(editTask.startTime);
            setEndTime(editTask.endTime);
        } else {
            setDescription("");
            setStartTime("");
            setEndTime("");
        }
    }, [editTask, isOpen]);

    return {
        description,
        setDescription,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        showSuggestions,
        setShowSuggestions,
        showStartPicker,
        setShowStartPicker,
        showEndPicker,
        setShowEndPicker,
        isLoading,
        setIsLoading,
    };
};
