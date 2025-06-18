import { TaskProvider } from '@/src/context/TaskContext';
import AppNavigator from '@/src/navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
    <TaskProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </TaskProvider>
    </SafeAreaProvider>
  );
}
