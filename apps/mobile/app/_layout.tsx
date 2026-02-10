import { Stack, usePathname, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const pathname = usePathname();

  if (pathname && pathname !== '/') {
    console.log('🔄 Redirecting to / from:', pathname);
    return <Redirect href='/' />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style='light' />
    </>
  );
}
