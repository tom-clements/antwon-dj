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
        <AmplifyAuthenticator>
            <ThemeProvider>
                <ResetGlobalStyle />
                <BaseStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </AmplifyAuthenticator>
    );
}
