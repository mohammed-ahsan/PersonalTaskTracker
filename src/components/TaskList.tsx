import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Task } from '../services/taskStorage';
import { COLORS, SPACING } from '../utils/constants';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string, taskTitle: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => {
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const renderSection = (title: string, taskList: Task[], showCompleted = false) => {
    if (taskList.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {taskList.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            showCompleted={showCompleted}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSection('Pending Tasks', pendingTasks)}
      {renderSection('Completed Tasks', completedTasks, true)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.medium,
  },
  section: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
    paddingLeft: 4,
  },
});

export default TaskList;
