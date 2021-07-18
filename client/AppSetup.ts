import Amplify from "aws-amplify";
import awsExports from "aws-exports";

function setupAmplify() {
    Amplify.configure({ ...awsExports, ssr: true });
}

export function setupApp() {
    setupAmplify();
}
