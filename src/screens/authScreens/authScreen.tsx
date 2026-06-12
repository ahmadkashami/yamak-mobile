import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { showMessage, hideMessage } from "react-native-flash-message";

import FilledButton from "../../components/ui/common/FilledButton";
import { AppFonts } from "../../constants/fonts";
import { AppSizes } from "../../constants/Sizes";
import CountryPicker from "../../components/auth/CountryPicker";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../constants/ScreenNames";
import WelcomeArea from "../../components/auth/WelcomeArea";
import FooterArea from "../../components/auth/FooterArea";
import AppAlert from "../../components/ui/AppAlert";
import { sendCode } from "../../apis/Auth.api";
import PressbleAppIcon from "../../components/ui/pressbleAppIcon";



const AuthScreen = () => {

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [verifyModalOpen, setVerifyModalOpen] = useState(false)
    const [inputs, setInputs] = useState({
        callingCode: "",
        phone: ""
    });

    const navigation = useNavigation()
    // async function submitHandler() {
    //     if (!inputs.password || !inputs.phone) {
    //         showMessage({
    //             message: "Error Message",
    //             description: "invalid inputs",
    //             type: "danger",
    //         });

    //         return;
    //     }
    //     if (inputs.phone.length < 8) {
    //         Alert.alert("phone must be at least 8 digits");
    //         return;
    //     }

    //     try {
    //         setIsLoading(true);
    //         const phoneWithCode = "965" + inputs.phone;

    //         const { access_token, data } = await login(
    //             phoneWithCode,
    //             inputs.password
    //         );
    //         if (!data || !data.truck) throw new Error("internal server error");
    //         // const user = new UserDto(data);
    //         // AsyncStorage.setItem("token", access_token);
    //         // AsyncStorage.setItem("user", JSON.stringify(user));
    //         // auth.authUser(user);
    //         // auth.authenticate("token");
    //     } catch (error) {
    //         if (error?.response?.data) {
    //             const errorMessage = ErrorHandlerApi(error);
    //             showMessage({
    //                 message: "Error Message",
    //                 description: errorMessage,
    //                 type: "danger",
    //             });
    //         } else {
    //             showMessage({
    //                 message: "Error Message",
    //                 description: error.message,
    //                 type: "danger",
    //             });
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }
    function inputsChangeHandler(text: string, name: string) {
        setInputs((prev) => {
            return { ...prev, [name]: text };
        });
    }
    function handleSelectFlag(callingCode: string) {
        inputsChangeHandler(callingCode, "callingCode")
    }

    async function submitHandler() {
        if (inputs.phone.length < 8) {
            showMessage({ message: "inputs lenght should me 8", type: "danger" })
            return
        }
        setVerifyModalOpen(true)
    }

    function onCancelVerifyHandler() {
        setVerifyModalOpen(false)
    }
    async function onConfirmVerifyHandler() {
        const phoneNum = `${inputs.callingCode}` + inputs.phone
        setVerifyModalOpen(false)
        try {
            const response = await sendCode(phoneNum)
            console.log({ response });
            navigation.navigate(ScreenNames.OTP_VERIFICATION_SCREEN, { phoneNum, inputs })
        } catch (error) {
            console.log(error);
        }


    }

    return (
        // <SafeAreaProvider style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>


            {isLoading && <ActivityIndicator />}
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            padding: 16,
                            alignSelf: "center",
                        }}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../../assets/images/appLogo.png")}
                            />
                        </View>
                        <WelcomeArea />
                        <View style={styles.inputBox}>
                            <CountryPicker setSelectedFlag={handleSelectFlag} />
                            <Text style={{ fontSize: AppSizes.medium }}>({inputs.callingCode}){"  "}</Text>
                            <TextInput
                                maxLength={932e23}
                                value={inputs.phone}
                                placeholder="Enter Phone"
                                keyboardType="number-pad"
                                placeholderTextColor={"#a4a3a8"}
                                style={styles.inputs}
                                onChangeText={(text) => inputsChangeHandler(text, "phone")}
                            />
                            {inputs.phone && <PressbleAppIcon
                                color="gray"
                                name={"close-circle-sharp"}
                                onPress={() => {
                                    setInputs(prev => ({ ...prev, phone: "" }))
                                }} />}
                        </View>


                        <View style={{ paddingVertical: 20 }}>
                            <FilledButton
                                // disabled={!!inputs.phone}
                                onPress={
                                    () => submitHandler()
                                }>SEND OTP</FilledButton>
                        </View>
                    </View>
                    <FooterArea />
                    <AppAlert  {...{ visible: verifyModalOpen, title: "Number Confirmation", message: `sms message will be sent to ${inputs.callingCode} ${inputs.phone} . Do you want to continue with this number ?`, onCancel: onCancelVerifyHandler, onConfirm: onConfirmVerifyHandler }} />
                </KeyboardAwareScrollView>
            </View>
        </View>
        // </SafeAreaProvider>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f1f6" },
    innerContainer: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    inputBox: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "90%",
        height: 60,
        padding: 16,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: { paddingTop: 50, paddingBottom: 10 },
    image: { width: 250, height: 200, resizeMode: "cover" },
    footerText: { fontSize: AppSizes.small, textAlign: "center", fontFamily: AppFonts.Roboto_Med },
    inputs: { flex: 1, fontSize: 16, fontWeight: "600", letterSpacing: 1 },
});
