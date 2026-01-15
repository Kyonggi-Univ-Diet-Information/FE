import { StyleSheet, BackHandler, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

import { router } from 'expo-router';

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState('');

  const isTransparentPath =
    currentUrl.includes('/entry') || currentUrl.includes('/maintenance');

  useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingBottom: Platform.OS === 'ios' ? -24 : 0,
            backgroundColor: isTransparentPath ? 'transparent' : '#ffffff',
          },
        ]}
      >
        <WebView
          ref={webViewRef}
          source={{
            uri:
              process.env.EXPO_PUBLIC_WEB_URL ||
              'https://new-kiryong-git-feature-77-yujin-hans-projects.vercel.app/entry',
            headers: {
              'X-React-Native-WebView': 'true',
            },
          }}
          onNavigationStateChange={navState => {
            setCurrentUrl(navState.url);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          onError={error => console.error('WebView 에러:', error)}
          injectedJavaScript={`
            window.ReactNativeWebView = true;
            true; 
          `}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
