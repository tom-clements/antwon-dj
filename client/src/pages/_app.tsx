import Head from 'next/head';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache, Global } from '@emotion/react';
import { ThemeProvider } from 'styles/components/ThemeProvider';
import { getDefaultTheme } from 'styles/services/getTheme';
import { useAppStore, createEmotionCache } from 'AppSetup';
import { ToastError } from 'toastError/components/ToastError';
import { DependencyProvider } from 'common/components/DependencyProvider';

const defaultTheme = getDefaultTheme();
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const store = useAppStore(pageProps.initialReduxState);

    return (
        <DependencyProvider>
            <Provider store={store}>
                <CacheProvider value={emotionCache}>
                    <Head>
                        <title>antwon.dj</title>
                        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                        <link rel="icon" type="image/png" href="/favicon.png" />
                        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
                        <meta content={defaultTheme.palette.primary.main} name="theme-color" />
                    </Head>
                    <ThemeProvider>
                        <CssBaseline />
                        <Global styles={{ 'body': { overscrollBehavior: 'contain' } }} />
                        <Component {...pageProps} />
                        <ToastError />
                    </ThemeProvider>
                </CacheProvider>
            </Provider>
        </DependencyProvider>
    );
}
