import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { useTask } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { COLORS, SPACING } from '../utils/constants';
import { NewTaskData } from '../services/taskStorage';

type RootStackParamList = {
  AddTask: undefined;
};

type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTask'>;
type AddTaskScreenRouteProp = RouteProp<RootStackParamList, 'AddTask'>;

type Props = {
  navigation: AddTaskScreenNavigationProp;
  route: AddTaskScreenRouteProp;
};

const AddTaskScreen: React.FC<Props> = ({ navigation }) => {
  const { addTask, loading } = useTask();

  const handleSubmit = async (taskData: NewTaskData) => {
    try {
      await addTask(taskData);
      Alert.alert(
        'Success',
        'Task created successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create task. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TaskForm
          onSubmit={handleSubmit}
          loading={loading}
          submitButtonText="Create Task"
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

export default AddTaskScreen;
