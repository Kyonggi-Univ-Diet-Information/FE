import { StyleSheet, BackHandler, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as Linking from 'expo-linking';

import { WebView } from 'react-native-webview';

import { router, SplashScreen, useLocalSearchParams } from 'expo-router';

import {
  BASE_URL,
  buildWebUrl,
  isExpoDevClientUrl,
  WEB_URL_PARAM_KEY,
} from './lib/webUrl';

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const params = useLocalSearchParams();

  const webUrlFromIntent = (
    params as Record<string, string | string[] | undefined>
  )[WEB_URL_PARAM_KEY];

  const resolvedFromIntent =
    typeof webUrlFromIntent === 'string'
      ? webUrlFromIntent
      : Array.isArray(webUrlFromIntent)
        ? webUrlFromIntent[0]
        : undefined;

  const [currentUrl, setCurrentUrl] = useState('');
  const [initialUrl, setInitialUrl] = useState<string>(() => {
    if (resolvedFromIntent && !isExpoDevClientUrl(resolvedFromIntent))
      return resolvedFromIntent;
    return BASE_URL;
  });

  const isTransparentPath =
    currentUrl.includes('/entry') || currentUrl.includes('/maintenance');

  // 뒤로가기 처리
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

  // 스플래시 스크린 처리
  const handleWebViewLoad = useCallback(() => {
    console.log('WebView loaded');
    SplashScreen.hideAsync();
  }, []);

  const handleWebViewError = useCallback((event: any) => {
    console.log('WebView error:', event.nativeEvent);
    SplashScreen.hideAsync();
  }, []);

  if (!initialUrl) {
    throw new Error('webview url is not set');
  }

  useEffect(() => {
    if (resolvedFromIntent && !isExpoDevClientUrl(resolvedFromIntent))
      setInitialUrl(resolvedFromIntent);
  }, [resolvedFromIntent]);

  useEffect(() => {
    if (!resolvedFromIntent) {
      Linking.getInitialURL().then(url => {
        if (!url) return;
        const webUrl = buildWebUrl(Linking.parse(url));
        setInitialUrl(isExpoDevClientUrl(webUrl) ? BASE_URL : webUrl);
      });
    }

    const subscription = Linking.addEventListener('url', ({ url }) => {
      const webUrl = buildWebUrl(Linking.parse(url));
      if (isExpoDevClientUrl(webUrl)) return;
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          window.location.href = '${webUrl.replace(/'/g, "\\'")}';
          true;
        `);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [resolvedFromIntent]);

  useEffect(() => {
    console.log('currentUrl', currentUrl);
  }, [currentUrl]);

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
          onLoad={handleWebViewLoad}
          onError={handleWebViewError}
          source={{
            uri: initialUrl,
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
          injectedJavaScript={`
            window.IS_REACT_NATIVE_WEBVIEW = true;
            true;
          `}
          onMessage={event => {
            try {
              const { type, url } = JSON.parse(event.nativeEvent.data);
              if (type === 'OPEN_EXTERNAL' && url) {
                Linking.openURL(url);
              }
            } catch {}
          }}
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
