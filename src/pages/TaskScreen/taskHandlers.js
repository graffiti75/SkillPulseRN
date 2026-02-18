export const createTaskHandlers = (taskState, uiState) => ({
	handleAddTask: async (data) => {
		const result = await taskState.addNewTask(data);
		result.success
			? (uiState.closeAddForm(), uiState.showAlert('Task added!'))
			: uiState.showAlert(result.error, 'error');
	},
	handleEditTask: async (data) => {
		const result = await taskState.editTask(uiState.editTaskData.id, data);
		result.success
			? (uiState.closeEditForm(), uiState.showAlert('Task updated!'))
			: uiState.showAlert(result.error, 'error');
	},
	handleDeleteTask: async () => {
		const result = await taskState.removeTask(uiState.deleteTaskData.id);
		result.success
			? (uiState.closeDeleteDialog(), uiState.showAlert('Task deleted!'))
			: uiState.showAlert(result.error, 'error');
	},
	handleLoadMore: async () => {
		const result = await taskState.loadMore();
		if (!result.success && result.error) uiState.showAlert(result.error, 'error');
	},
});
