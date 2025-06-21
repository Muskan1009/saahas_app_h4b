import { Slot, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {

  const router = useRouter();

  console.log(`Current route: ${router.pathname}`);

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}