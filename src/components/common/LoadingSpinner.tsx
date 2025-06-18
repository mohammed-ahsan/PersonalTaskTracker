import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ActivityIndicatorProps,
} from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

interface LoadingSpinnerProps {
  size?: ActivityIndicatorProps['size'];
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = COLORS.primary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingSpinner;
