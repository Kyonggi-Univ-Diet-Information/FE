import { StyleSheet, BackHandler, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as Linking from 'expo-linking';

import { WebView } from 'react-native-webview';

import { router, SplashScreen } from 'expo-router';

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const BASE_URL = 'https://kiryong-app.vercel.app';

  const [currentUrl, setCurrentUrl] = useState('');
  const [initialUrl, setInitialUrl] = useState<string>(BASE_URL);

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
    // 앱이 종료된 상태에서 링크로 열릴 때의 초기 URL 처리
    const getInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsedUrl = Linking.parse(url);
        const webUrl = buildWebUrl(parsedUrl);
        setInitialUrl(webUrl);
      }
    };

    getInitialUrl();

    // 앱이 실행 중일 때 링크로 열릴 때의 URL 처리
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const parsedUrl = Linking.parse(url);
      const webUrl = buildWebUrl(parsedUrl);

      // WebView의 URL을 변경
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          window.location.href = '${webUrl}';
          true;
        `);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const buildWebUrl = (parsedUrl: Linking.ParsedURL): string => {
    const baseUrl = BASE_URL;

    let url = `${baseUrl}`;
    if (parsedUrl.path) {
      url += `/${parsedUrl.path || ''}`;
    }
    if (parsedUrl.queryParams) {
      url += `?${new URLSearchParams(parsedUrl.queryParams as Record<string, string>).toString()}`;
    }

    return url;
  };

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
