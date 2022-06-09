import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, Global } from '@emotion/react';
import { createEmotionCache } from 'common/services/createEmotionCache';
import { ThemeProvider } from 'styles/components/ThemeProvider';
import { getDefaultTheme } from 'styles/services/getTheme';
import { ToastError } from 'toastError/components/ToastError';
import { DependencyProvider } from 'common/components/DependencyProvider';
import { StateProvider } from 'common/components/StateProvider';
import { SafeHydrate } from 'common/components/SafeHydrate';
import { Breadcrumb } from 'common/components/Breadcrumb';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <SafeHydrate>
            <DependencyProvider>
                <StateProvider persist>
                    <Breadcrumb>
                        <CacheProvider value={createEmotionCache()}>
                            <Head>
                                <title>antwon.dj</title>
                                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                                <link rel="icon" type="image/png" href="/favicon.png" />
                                <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
                                <meta content={getDefaultTheme().palette.primary.main} name="theme-color" />
                            </Head>
                            <ThemeProvider>
                                <CssBaseline />
                                <Global styles={{ 'body': { overscrollBehavior: 'contain' } }} />
                                <Component {...pageProps} />
                                <ToastError />
                            </ThemeProvider>
                        </CacheProvider>
                    </Breadcrumb>
                </StateProvider>
            </DependencyProvider>
        </SafeHydrate>
    );
}
