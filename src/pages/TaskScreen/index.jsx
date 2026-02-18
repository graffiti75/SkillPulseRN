import React, { useEffect, useState } from 'react';
import {
  View, FlatList, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { FAB, Header, FilterBar } from '../../components/layout';
import { TaskCard, EmptyState, TaskForm, DeleteConfirmation } from '../../components/tasks';
import { Alert } from '../../components/common';
import { useUIControls } from './useUIControls';
import { useTaskManager } from './useTaskManager';
import { createTaskHandlers } from './taskHandlers';
import DownloadScreen from '../DownloadScreen';
import { useTheme } from '../../contexts/ThemeContext';
import { colors } from '../../theme';

const TaskScreen = ({ user, onLogout }) => {
  const { isDarkMode } = useTheme();
  const c = colors[isDarkMode ? 'dark' : 'light'];
  const uiControls = useUIControls();
  const taskManager = useTaskManager();
  const handlers = createTaskHandlers(uiControls, taskManager);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    uiControls.fetchTasks().then((result) => {
      if (result && !result.success) taskManager.showAlert(result.error, 'error');
    });
  }, []);

  const renderItem = ({ item }) => (
    <TaskCard
      task={item}
      onEdit={taskManager.openEditForm}
      onDelete={taskManager.openDeleteDialog}
    />
  );

  const renderFooter = () => {
    if (uiControls.showLoadingSpinner) {
      return (
        <View style={styles.footerSpinner}>
          <ActivityIndicator color={c.primary} />
        </View>
      );
    }
    if (uiControls.canLoadMore && !uiControls.filterDate) {
      return (
        <TouchableOpacity
          style={[styles.loadMoreBtn, { backgroundColor: c.primaryLight, borderColor: c.primary }]}
          onPress={handlers.handleLoadMore}
        >
          <Text style={[styles.loadMoreText, { color: c.primary }]}>Load More</Text>
        </TouchableOpacity>
      );
    }
    if (!uiControls.canLoadMore && uiControls.tasks.length > 0 && !uiControls.filterDate) {
      return <Text style={[styles.endText, { color: c.textMuted }]}>No more tasks</Text>;
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <Header
        user={user?.email?.split('@')[0] || 'User'}
        taskCount={uiControls.allTasks.length}
        filteredCount={uiControls.tasks.length}
        showFilter={taskManager.showFilter}
        onToggleFilter={taskManager.toggleFilter}
        onLogout={onLogout}
        onDownload={() => setShowDownload(true)}
      />

      {/* Filter Bar */}
      {taskManager.showFilter && (
        <FilterBar
          filterDate={uiControls.filterDate}
          onFilterChange={uiControls.filterByDate}
          onClear={() => uiControls.filterByDate('')}
          onToggleFilter={taskManager.toggleFilter}
        />
      )}

      {/* Task list */}
      {uiControls.isLoading ? (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={c.primary} />
          <Text style={[styles.loadingText, { color: c.textSecondary }]}>Loading tasks...</Text>
        </View>
      ) : (
        <FlatList
          data={uiControls.tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.list,
            uiControls.tasks.length === 0 && styles.listEmpty,
          ]}
          ListEmptyComponent={<EmptyState />}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB */}
      <FAB onClick={taskManager.openAddForm} />

      {/* Modals */}
      <TaskForm
        isOpen={taskManager.showAddForm}
        onClose={taskManager.closeAddForm}
        onSave={handlers.handleAddTask}
        editTask={null}
        allTasks={uiControls.allTasks}
      />
      <TaskForm
        isOpen={!!taskManager.editTaskData}
        onClose={taskManager.closeEditForm}
        onSave={handlers.handleEditTask}
        editTask={taskManager.editTaskData}
        allTasks={uiControls.allTasks}
      />
      <DeleteConfirmation
        isOpen={taskManager.showDeleteDialog}
        onClose={taskManager.closeDeleteDialog}
        onConfirm={handlers.handleDeleteTask}
        taskDescription={taskManager.deleteTaskData?.description}
      />
      <DownloadScreen isOpen={showDownload} onClose={() => setShowDownload(false)} />

      {taskManager.alert && (
        <Alert
          message={taskManager.alert.message}
          type={taskManager.alert.type}
          onClose={taskManager.closeAlert}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 12, paddingBottom: 100 },
  listEmpty: { flexGrow: 1 },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { fontSize: 14 },
  footerSpinner: { padding: 20, alignItems: 'center' },
  loadMoreBtn: {
    margin: 16, paddingVertical: 14, borderRadius: 12,
    alignItems: 'center', borderWidth: 1,
  },
  loadMoreText: { fontWeight: '600', fontSize: 14 },
  endText: { textAlign: 'center', padding: 20, fontSize: 13 },
});

export default TaskScreen;
