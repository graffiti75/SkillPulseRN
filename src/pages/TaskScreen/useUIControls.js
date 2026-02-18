import { useCallback, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
    addTask,
    deleteTask,
    extractSuggestions,
    loadTasks,
    updateTask,
} from "../../firebase";

export const useUIControls = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const [canLoadMore, setCanLoadMore] = useState(false);
    const [lastId, setLastId] = useState(null);
    const [filterDate, setFilterDate] = useState("");

    const fetchTasks = useCallback(async () => {
        if (!user?.email) {
            setIsLoading(false);
            return { success: false, error: "Not authenticated" };
        }
        setIsLoading(true);
        const result = await loadTasks(user.email, null);
        setIsLoading(false);
        if (result.success) {
            setAllTasks(result.tasks);
            setTasks(result.tasks);
            setLastId(result.lastId);
            setCanLoadMore(result.canLoadMore);
            setDescriptions(extractSuggestions(result.tasks));
        }
        return result;
    }, [user?.email]);

    const loadMore = useCallback(async () => {
        if (!user?.email || showLoadingSpinner || !canLoadMore)
            return { success: false };
        setShowLoadingSpinner(true);
        const result = await loadTasks(user.email, lastId);
        if (result.success) {
            setAllTasks((p) => [...p, ...result.tasks]);
            setTasks((p) => [...p, ...result.tasks]);
            setLastId(result.lastId);
            setCanLoadMore(result.canLoadMore);
            setDescriptions((p) => [
                ...new Set([...p, ...extractSuggestions(result.tasks)]),
            ]);
        }
        setShowLoadingSpinner(false);
        return result;
    }, [user?.email, showLoadingSpinner, canLoadMore, lastId]);

    const filterByDate = useCallback(
        (date) => {
            setFilterDate(date);
            setTasks(
                date
                    ? allTasks.filter((t) => t.startTime.includes(date))
                    : allTasks,
            );
        },
        [allTasks],
    );

    const addNewTask = useCallback(
        async (data) => {
            if (!user?.email)
                return { success: false, error: "Not authenticated" };
            const result = await addTask(
                user.email,
                data.description,
                data.startTime,
                data.endTime,
            );
            if (result.success) {
                setAllTasks((p) => [result.task, ...p]);
                setTasks((p) => [result.task, ...p]);
                setDescriptions((p) => [...new Set([data.description, ...p])]);
            }
            return result;
        },
        [user?.email],
    );

    const editTask = useCallback(
        async (id, data) => {
            if (!user?.email)
                return { success: false, error: "Not authenticated" };
            const result = await updateTask(
                user.email,
                id,
                data.description,
                data.startTime,
                data.endTime,
            );
            if (result.success) {
                const upd = { id, ...data };
                setAllTasks((p) =>
                    p.map((t) => (t.id === id ? { ...t, ...upd } : t)),
                );
                setTasks((p) =>
                    p.map((t) => (t.id === id ? { ...t, ...upd } : t)),
                );
            }
            return result;
        },
        [user?.email],
    );

    const removeTask = useCallback(
        async (id) => {
            if (!user?.email)
                return { success: false, error: "Not authenticated" };
            const result = await deleteTask(user.email, id);
            if (result.success) {
                setAllTasks((p) => p.filter((t) => t.id !== id));
                setTasks((p) => p.filter((t) => t.id !== id));
            }
            return result;
        },
        [user?.email],
    );

    return {
        tasks,
        allTasks,
        descriptions,
        isLoading,
        showLoadingSpinner,
        canLoadMore,
        filterDate,
        fetchTasks,
        loadMore,
        filterByDate,
        addNewTask,
        editTask,
        removeTask,
    };
};
