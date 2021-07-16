import Head from "next/head"
import Amplify from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AppProps } from "next/app";
import { BaseStyle } from "styles/BaseStyle";
import { ResetGlobalStyle } from "styles/ResetGlobalStyle";
import { ThemeProvider } from "styles/ThemeProvider";

import awsExports from "../aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>antwon.dj</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            <AmplifyAuthenticator>
                <ThemeProvider>
                    <ResetGlobalStyle />
                    <BaseStyle />
                    <Component {...pageProps} />
                </ThemeProvider>
            </AmplifyAuthenticator>
        </>

    );
}
