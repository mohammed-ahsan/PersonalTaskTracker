import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import TaskForm from '../components/TaskForm';
import { useTask } from '../context/TaskContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { UpdateTaskData } from '../services/taskStorage';
import { COLORS, SPACING } from '../utils/constants';
type EditTaskScreenProps = StackScreenProps<RootStackParamList, 'EditTask'>;

const EditTaskScreen = ({ navigation, route }: EditTaskScreenProps) => {
  const { task }: any = route.params;
  const { updateTask, loading } = useTask();

  const handleSubmit = async (taskData: UpdateTaskData) => {
    try {
      await updateTask(task.id, taskData);
      Alert.alert(
        'Success',
        'Task updated successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update task. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TaskForm
          initialValues={task}
          onSubmit={handleSubmit}
          loading={loading}
          submitButtonText="Update Task"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.medium,
  },
});

export default EditTaskScreen;
