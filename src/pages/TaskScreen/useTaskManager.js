import { useState } from 'react';

export const useTaskManager = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [showAddForm, setShowAddForm] = useState(false);
	const [editTaskData, setEditTaskData] = useState(null);
	const [deleteTaskData, setDeleteTaskData] = useState(null);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [alert, setAlert] = useState(null);

	return {
		showFilter,
		showAddForm,
		editTaskData,
		deleteTaskData,
		showDeleteDialog,
		alert,
		openAddForm: () => setShowAddForm(true),
		closeAddForm: () => setShowAddForm(false),
		openEditForm: (task) => setEditTaskData(task),
		closeEditForm: () => setEditTaskData(null),
		openDeleteDialog: (task) => {
			setDeleteTaskData(task);
			setShowDeleteDialog(true);
		},
		closeDeleteDialog: () => {
			setShowDeleteDialog(false);
			setDeleteTaskData(null);
		},
		toggleFilter: () => setShowFilter((p) => !p),
		showAlert: (message, type = 'success') => setAlert({ message, type }),
		closeAlert: () => setAlert(null),
	};
};
