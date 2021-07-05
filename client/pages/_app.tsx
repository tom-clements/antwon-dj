import Amplify from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AppProps } from "next/app";

import "../styles/globals.css";
import awsExports from "../aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AmplifyAuthenticator>
            <Component {...pageProps} />
        </AmplifyAuthenticator>
    );
}
