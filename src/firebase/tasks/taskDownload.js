import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { loadTasksByMonth } from './taskQueries';
import { MONTH_NAMES, generateFilename } from './downloadUtils';
import { tasksToCSV, tasksToFormattedCSV } from './csvConverter';

const triggerDownloadRN = async (content, filename, mimeType) => {
  const fileUri = FileSystem.documentDirectory + filename;
  await FileSystem.writeAsStringAsync(fileUri, content, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(fileUri, { mimeType, dialogTitle: `Save ${filename}` });
  }
  return { success: true, filename };
};

export const downloadTasksByMonthAsJSON = async (userEmail, year, month) => {
  try {
    if (!userEmail) return { success: false, error: 'User email is required' };
    const result = await loadTasksByMonth(userEmail, year, month);
    if (!result.success) return { success: false, error: result.error };
    const filename = generateFilename(year, month, 'json');
    const exportData = {
      exportDate: new Date().toISOString(),
      month: MONTH_NAMES[month - 1],
      year,
      totalTasks: result.tasks.length,
      tasks: result.tasks,
    };
    await triggerDownloadRN(JSON.stringify(exportData, null, 2), filename, 'application/json');
    return { success: true, filename, taskCount: result.tasks.length };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to download tasks' };
  }
};

export const downloadTasksByMonthAsCSV = async (userEmail, year, month, formatted = true) => {
  try {
    if (!userEmail) return { success: false, error: 'User email is required' };
    const result = await loadTasksByMonth(userEmail, year, month);
    if (!result.success) return { success: false, error: result.error };
    const filename = generateFilename(year, month, 'csv');
    const content = formatted ? tasksToFormattedCSV(result.tasks) : tasksToCSV(result.tasks);
    await triggerDownloadRN(content, filename, 'text/csv');
    return { success: true, filename, taskCount: result.tasks.length };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to download tasks' };
  }
};

export const downloadTasksByMonth = async (userEmail, year, month, format = 'json', formattedDates = true) => {
  if (!userEmail) return { success: false, error: 'User email is required' };
  if (format === 'csv') return downloadTasksByMonthAsCSV(userEmail, year, month, formattedDates);
  return downloadTasksByMonthAsJSON(userEmail, year, month);
};
