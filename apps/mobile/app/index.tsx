import { StyleSheet, BackHandler, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as Linking from 'expo-linking';

import { WebView } from 'react-native-webview';

import { router } from 'expo-router';

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const BASE_URL = '';

  const [currentUrl, setCurrentUrl] = useState('');
  const [initialUrl, setInitialUrl] = useState<string>(BASE_URL);

  const isTransparentPath =
    currentUrl.includes('/entry') || currentUrl.includes('/maintenance');

  const buildWebUrl = useCallback(
    (parsedUrl: Linking.ParsedURL): string => {
      const allowedWebHosts = ['kiryong-app.vercel.app'];
      const queryString =
        parsedUrl.queryParams && Object.keys(parsedUrl.queryParams).length > 0
          ? `?${new URLSearchParams(parsedUrl.queryParams as Record<string, string>).toString()}`
          : '';

      if (parsedUrl.path && parsedUrl.path.startsWith('kiryong://')) {
        try {
          const urlMatch = parsedUrl.path.match(
            /kiryong:\/\/([^/?]+)(\/[^?]*)?(\?.*)?/,
          );
          if (urlMatch) {
            const hostname = urlMatch[1];
            const pathPart = urlMatch[2] || '';
            const urlQueryPart = urlMatch[3] || '';

            if (allowedWebHosts.includes(hostname)) {
              const finalQuery = queryString
                ? urlQueryPart
                  ? urlQueryPart + '&' + queryString.slice(1)
                  : queryString
                : urlQueryPart;
              return `https://${hostname}${pathPart || '/'}${finalQuery}`;
            }
          }
        } catch (e) {
          console.error('Failed to parse URL from path:', e);
        }
      }

      if (parsedUrl.hostname === 'auth') {
        return `${BASE_URL}/auth${queryString}`;
      }

      if (parsedUrl.hostname && allowedWebHosts.includes(parsedUrl.hostname)) {
        const path = parsedUrl.path
          ? parsedUrl.path.startsWith('/')
            ? parsedUrl.path
            : `/${parsedUrl.path}`
          : '';
        return `https://${parsedUrl.hostname}${path || '/'}${queryString}`;
      }

      const path = parsedUrl.path
        ? `/${parsedUrl.path.replace(/^\//, '')}`
        : '/';
      return `${BASE_URL.replace(/\/$/, '')}${path}${queryString}`;
    },
    [BASE_URL],
  );

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

  useEffect(() => {
    const getInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        console.log('🔗 Initial URL:', url);

        // kiryong://kiryong-app.vercel.app/... 형식 직접 처리
        if (url.startsWith('kiryong://kiryong-app.vercel.app')) {
          const webUrl = url.replace('kiryong://', 'https://');
          console.log('🌐 Direct conversion:', webUrl);
          setInitialUrl(webUrl);
          return;
        }

        const parsedUrl = Linking.parse(url);
        console.log('📦 Parsed URL:', JSON.stringify(parsedUrl, null, 2));
        const webUrl = buildWebUrl(parsedUrl);
        console.log('🌐 Built Web URL:', webUrl);
        setInitialUrl(webUrl);
      }
    };

    getInitialUrl();

    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('🔗 URL Event:', url);

      // kiryong://kiryong-app.vercel.app/... 형식 직접 처리
      if (url.startsWith('kiryong://kiryong-app.vercel.app')) {
        const webUrl = url.replace('kiryong://', 'https://');
        console.log('🌐 Direct conversion:', webUrl);
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(`
            window.location.href = '${webUrl}';
            true;
          `);
        }
        return;
      }

      const parsedUrl = Linking.parse(url);
      console.log('📦 Parsed URL:', JSON.stringify(parsedUrl, null, 2));
      const webUrl = buildWebUrl(parsedUrl);
      console.log('🌐 Built Web URL:', webUrl);

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
  }, [buildWebUrl]);

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
            uri: initialUrl,
            headers: {
              'X-React-Native-WebView': 'true',
            },
          }}
          onNavigationStateChange={navState => {
            setCurrentUrl(navState.url);
          }}
          onMessage={event => {
            try {
              const { type, url } = JSON.parse(event.nativeEvent.data);
              if (type === 'OPEN_EXTERNAL' && url) {
                Linking.openURL(url);
              }
            } catch {}
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          onError={error => console.error('WebView 에러:', error)}
          injectedJavaScript={`
            window.IS_REACT_NATIVE_WEBVIEW = true;
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
