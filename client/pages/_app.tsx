import Head from 'next/head';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, defaultTheme } from 'styles/ThemeProvider';
import { setupApp, useAppStore, createEmotionCache } from 'AppSetup';

setupApp();
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const store = useAppStore(pageProps.initialReduxState);
    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>antwon.dj</title>
                    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                    <link rel="icon" type="image/png" href="/favicon.png" />
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
                    <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
                    <meta content={defaultTheme.palette.primary.main} name="theme-color" />
                </Head>
                <ThemeProvider>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </Provider>
    );
}
