import { HubCallback } from "@aws-amplify/core/lib-esm/Hub";
import { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Store } from "model/Store";
import { UserSlice } from "model/User";

export function connectAmplifyToStore(store: Store) {
    const checkUser = () => {
        Auth.currentAuthenticatedUser()
            .then((user: CognitoUser) => store && store.dispatch(UserSlice.actions.signIn({
                cognitoId: user.getUsername(),
            })))
            .catch(() => store && store.dispatch(UserSlice.actions.signOut()))
            ;
    };

    const signOut = () => {
        store && store.dispatch(UserSlice.actions.signOut());
    };

    const hubListener: HubCallback = hubCapsule => {
        switch (hubCapsule.payload.event) {
            case "signIn":
                checkUser();
                break;
            case "signUp":
                break;
            case "signOut":
                signOut();
                break;
            case "signIn_failure":
                signOut();
                break;
            case "tokenRefresh":
                checkUser();
                break;
            case "tokenRefresh_failure":
                signOut();
                break;
            case "configured":
                checkUser();
                break;
        }
    };

    Hub.listen("auth", hubListener, "hubListener");
    checkUser();
}
