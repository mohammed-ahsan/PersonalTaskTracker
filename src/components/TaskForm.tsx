import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS, PRIORITY_OPTIONS, SPACING } from '../utils/constants';
import Button from './common/Button';
import Input from './common/Input';

type Priority = 'low' | 'medium' | 'high';

interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
}

interface TaskFormErrors {
  title?: string | null;
  description?: string | null;
}

interface TaskFormProps {
  initialValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  loading?: boolean;
  submitButtonText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues = {},
  onSubmit,
  loading = false,
  submitButtonText = 'Save Task',
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialValues.title || '',
    description: initialValues.description || '',
    priority: initialValues.priority || 'medium',
  });

  const [errors, setErrors] = useState<TaskFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: TaskFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
      });
    }
  };

  const updateField = (field: keyof TaskFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'title' || field === 'description') {
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: null }));
  }
}

  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Input
          label="Task Title *"
          value={formData.title}
          onChangeText={value => updateField('title', value)}
          placeholder="Enter task title"
          error={errors.title}
          maxLength={100}
        />

        <Input
          label="Description"
          value={formData.description}
          onChangeText={value => updateField('description', value)}
          placeholder="Enter task description (optional)"
          multiline
          numberOfLines={4}
          error={errors.description}
          maxLength={500}
        />

        <View style={styles.prioritySection}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityOptions}>
            {PRIORITY_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.priorityOption,
                  formData.priority === option.value && styles.selectedPriority,
                  { borderColor: option.color },
                ]}
                onPress={() => updateField('priority', option.value)}
              >
                <Text
                  style={[
                    styles.priorityText,
                    formData.priority === option.value && styles.selectedPriorityText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title={submitButtonText}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: SPACING.medium,
  },
  prioritySection: {
    marginBottom: SPACING.large,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    padding: SPACING.small,
    marginHorizontal: 4,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  selectedPriority: {
    backgroundColor: COLORS.lightPrimary,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  selectedPriorityText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: SPACING.large,
  },
});

export default TaskForm;
