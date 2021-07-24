import Head from "next/head"
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { BaseStyle } from "styles/BaseStyle";
import { ResetGlobalStyle } from "styles/ResetGlobalStyle";
import { ThemeProvider } from "styles/ThemeProvider";
import { setupApp, useAppStore } from "AppSetup";

setupApp();

export default function App({ Component, pageProps }: AppProps) {
    const store = useAppStore(pageProps.initialReduxState);
    return (
        <>
            <Head>
                <title>antwon.dj</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
            </Head>
            <Provider store={store}>
                <ThemeProvider>
                    <ResetGlobalStyle />
                    <BaseStyle />
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        </>
    );
}
