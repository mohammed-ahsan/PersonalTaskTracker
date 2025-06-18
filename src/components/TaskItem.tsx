import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Task } from '../services/taskStorage';
import { COLORS, SPACING } from '../utils/constants';
import { formatDate, getPriorityColor } from '../utils/helpers';

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string, taskTitle: string) => void;
  showCompleted?: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  showCompleted
}) => {
  const handleLongPress = () => {
    Alert.alert(
      'Task Options',
      `What would you like to do with "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Edit', onPress: () => onEdit(task) },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => onDelete(task.id, task.title)
        }
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        task.completed && styles.completedContainer
      ]}
      onPress={() => onToggle(task.id)}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View
              style={[
                styles.checkbox,
                task.completed && styles.checkedCheckbox
              ]}
            >
              {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text
              style={[
                styles.title,
                task.completed && styles.completedTitle
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(task.priority) }
            ]}
          >
            <Text style={styles.priorityText}>
              {task.priority.toUpperCase()}
            </Text>
          </View>
        </View>

        {task.description ? (
          <Text
            style={[
              styles.description,
              task.completed && styles.completedDescription
            ]}
            numberOfLines={3}
          >
            {task.description}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <Text style={styles.date}>
            Created: {formatDate(task.createdAt)}
          </Text>
          {task.updatedAt !== task.createdAt && (
            <Text style={styles.date}>
              Updated: {formatDate(task.updatedAt)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.small,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: COLORS.lightGray,
  },
  content: {
    padding: SPACING.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.small,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: SPACING.small,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: SPACING.small,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkedCheckbox: {
    backgroundColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.small,
    lineHeight: 20,
    fontFamily: 'SpaceMono',
  },
  completedDescription: {
    textDecorationLine: 'line-through',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.small,
    marginTop: SPACING.small,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
    fontFamily: 'SpaceMono',
  },
});

export default TaskItem;
