
import { showMessage } from 'react-native-flash-message';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import { useAuthenticationStoreAsync } from "../store/auth.store";
import { loginUserWithSocial, registerUserWithSocial } from "../apis/Auth.api";
import { httpErrorHandler } from "../helpers/AppHelpers";
import { GoogleSignin } from "../config/auth.config"
import { Alert } from 'react-native';
import { Navigation } from '../../RootFun';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../constants/ScreenNames';
import { getStorageValues, setStorageValues } from '../helpers/AppAsyncStoreage';
import { AsyncStorageConstants } from '../constants/CommonConsstats';


export function useSocialAuth(type: "login" | "register") {
    const navigation = useNavigation()
    const authenticate = useAuthenticationStoreAsync((state) => state.authenticate)

    async function handleSignInWithGoogle() {

        try {
            const hasPlayService = await GoogleSignin.hasPlayServices()
            if (!hasPlayService) return
            const userInfo = await GoogleSignin.signIn().catch(error => {
                console.log("error google ====>");
                console.log({ error: error });
            })
            if (userInfo) {
                const serverRes = await loginUserWithSocial({ googleAccessToken: userInfo?.idToken })
                const { accessToken, user } = serverRes?.data
                authenticate(accessToken, user)
                showMessage({ message: "login success", type: "success" })
            }
        }
        catch (error) {
            if (error == "user not registered") {
                Alert.alert("login failed ", "email must register first")
                navigation.navigate(ScreenNames.Register_Screen)
            }
            console.log("backend error ====>", error)

        }
    }

    async function handleRegisterWithGoogle() {
        try {
            const hasPlayService = await GoogleSignin.hasPlayServices()
            if (!hasPlayService) return
            const userInfo = await GoogleSignin.signIn()
            if (userInfo) {
                const response = await registerUserWithSocial({ googleAccessToken: userInfo?.idToken })
                console.log({ response });

                const { accessToken, user } = response.data
                authenticate(accessToken, user)
            }

        } catch (error) {
            console.log("eroror", JSON.stringify(error));

            const errorMessage = httpErrorHandler(error)
            showMessage({ message: errorMessage, type: "danger" })
        }
    }

    async function authWithApple() {

        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                // Note: it appears putting FULL_NAME first is important, see issue #293
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });
            console.log({ appleAuthRequestResponse });
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            // use credentialState response to ensure the user is authenticated
            if (credentialState === appleAuth.State.AUTHORIZED) {
                const existKeys = await getStorageValues(AsyncStorageConstants.appleLoginKeys)
                if (!existKeys) await setStorageValues(AsyncStorageConstants.appleLoginKeys, JSON.stringify(appleAuthRequestResponse))
                return { existKeys, appleAuthRequestResponse }
            }
            return null
        } catch (error) {
            console.log("apple error ===>", error);
            return null

        }
        // performs login request


    }
    async function handleAuthWithApple(authType: "login" | "signUp") {

        const appleResponse = await authWithApple()
        if (!appleResponse) return
        const { existKeys, appleAuthRequestResponse } = appleResponse

        let response = (authType == "login") ? await loginUserWithSocial({ appleAccessToken: appleAuthRequestResponse.identityToken as string }) : await registerUserWithSocial({ appleAccessToken: appleAuthRequestResponse.identityToken as string, appleInfo: JSON.parse(existKeys) })
        console.log({ response });

        const { accessToken, user } = response.data
        authenticate(accessToken, user)

    }

    return { handleRegisterWithGoogle, handleAuthWithApple, handleSignInWithGoogle }

}