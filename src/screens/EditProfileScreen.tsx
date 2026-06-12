import { I18nManager, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { showMessage } from "react-native-flash-message";
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppColorsTheme2 } from '../constants/Colors'
import AppIcon from '../components/ui/appIcon'
import { AppFonts } from '../constants/fonts'
import { AppSizes } from '../constants/Sizes'
import FilledButton from '../components/ui/common/FilledButton'
import ProfileMapView from '../components/EditProfile/ProfileMapView'
import { getUserProfile, updateUserProfile } from '../apis/users.api'
import { useTranslation } from 'react-i18next';
import { useAuthenticationStoreAsync } from '../store/auth.store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { httpErrorHandler } from '../helpers/AppHelpers';
import LoadingLoatie from '../components/ui/LoadingLootie';
import AppText from '../components/ui/AppText';
import { ScrollView } from 'react-native-gesture-handler';


const EditProfileScreen = () => {
    // const { data } = useFetch({ endPoint: "app-users/profile", method: "get" })
    const updateUserInfo = useAuthenticationStoreAsync((state) => state.updateUserInfo)
    const [userData, setUserData] = useState(null)
    const [pickedDate, setPickedDate] = useState(new Date());
    const [isPickingDate, setIsPickingDate] = useState(false);
    const formRef = useRef();
    const { t } = useTranslation()

    const initialValues = {
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
        notificationsEnabled: userData?.notificationsEnabled,
    }

    console.log({ userData });

    function onChangeDateHandler(event, selectedDate) {
        setIsPickingDate(false)
        setPickedDate(selectedDate)
        setUserData({ ...userData, birthDay: selectedDate });
    };


    async function onConfirmVerifyHandler(values, { setSubmitting }) {
        try {
            const response = await updateUserProfile(values)
            updateUserInfo(response)

            showMessage({ message: "update success", type: "success" })

        } catch (error) {
            const errorMessage = httpErrorHandler(error)
            showMessage({ message: "update failed", type: "danger" })
        } finally {
            setSubmitting(false)
        }
    }

    async function showPickedDate() {
        setIsPickingDate(true)
    }
    useEffect(() => {
        try {
            fetchUserProfileData()

        } catch (error) {
            console.log(error);
        }
    }, [])
    async function fetchUserProfileData() {
        const data = await getUserProfile()
        setUserData(data)
        if (data?.birthDay) {
            setPickedDate(new Date(data.birthDay))
        }
    }
    return (
        <ScrollView style={{ flexGrow: 1, }}>
            <View style={{ flex: 1, padding: 20 }}>
                {/* <View >
                    <ProfileMapView />
                </View> */}
                <KeyboardAwareScrollView>

                    <View style={{ paddingVertical: 20, opacity: 0.8, }}>

                        <Formik
                            innerRef={formRef}
                            enableReinitialize={true}
                            initialValues={initialValues}
                            // validationSchema={loginValidationSchema}
                            onSubmit={(values, props) => {
                                onConfirmVerifyHandler(values, props)

                            }}
                        >
                            {({
                                values,
                                handleSubmit,
                                handleChange,
                                isValid,
                                errors,
                                touched,
                                isSubmitting,
                                setFieldTouched
                            }) => (
                                <>
                                    {isSubmitting && <LoadingLoatie style={{ alignSelf: "center" }} />}

                                    <AppText textStyle={{ color: "tomato" }}>{
                                        (touched.email && errors.email) && (`${errors.email}`)
                                    }</AppText>

                                    <View>
                                        <AppText alignItems="flex-start" textStyle={styles.labelText}>
                                            {t("Name")}
                                        </AppText>
                                        <View style={{ height: 40, borderWidth: 1, borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 }}>
                                            <View style={{ flex: 1, justifyContent: "center" }}>
                                                <TextInput
                                                    autoCapitalize='none'
                                                    onChangeText={handleChange("name")}
                                                    value={values.name}
                                                    style={styles.inputs}
                                                    placeholderTextColor={"#a4a3a8"}
                                                    onBlur={() => setFieldTouched("name")}
                                                    placeholder={t("Name")}
                                                />
                                            </View>
                                            <AppIcon name="person" type="Ionicons" />
                                            {/* <AppIcon name="mail" color="gray" /> */}
                                        </View>
                                    </View>

                                    <View>
                                        <AppText alignItems="flex-start" textStyle={styles.labelText}>
                                            {t("Email")}
                                        </AppText>
                                        <View style={{ height: 40, borderWidth: 1, borderColor: "gray", borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 }}>
                                            <View style={{ flex: 1, justifyContent: "center" }}>
                                                <TextInput
                                                    editable={false}
                                                    autoCapitalize='none'
                                                    onChangeText={handleChange("email")}
                                                    value={values.email}
                                                    style={[styles.inputs, { color: "gray" }]}
                                                    placeholderTextColor={"#a4a3a8"}
                                                    onBlur={() => setFieldTouched("email")}
                                                    placeholder={t("Email")}
                                                />
                                            </View>
                                            <AppIcon name="mail" type="Ionicons" color='gray' />
                                        </View>
                                    </View>
                                    <View>
                                        <AppText alignItems="flex-start" textStyle={styles.labelText}>
                                            {t("Phone")}
                                        </AppText>
                                        <View style={{ height: 40, borderWidth: 1, borderRadius: 5, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 }}>
                                            <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>

                                                <TextInput
                                                    autoCapitalize='none'
                                                    onChangeText={handleChange("phone")}
                                                    value={values.phone}
                                                    style={styles.inputs}
                                                    placeholderTextColor={"#a4a3a8"}
                                                    onBlur={() => setFieldTouched("phone")}
                                                    placeholder={t("Phone number")}
                                                />

                                            </View>
                                            <AppText>
                                                (+965)
                                            </AppText>
                                        </View>
                                    </View>


                                    {/* <View style={styles.sectionContainer}>
                                        <Text style={styles.labelText}>
                                            {t("AllowNotification")}
                                        </Text>
                                        <Switch
                                            onValueChange={(currentValue) => setUserData({ ...userData, notificationsEnabled: currentValue })}
                                            value={userData?.notificationsEnabled ? userData?.notificationsEnabled : false}
                                        />
                                    </View> */}

                                    {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                                        <Text style={styles.labelText}>
                                            {t("Gender")}
                                        </Text>

                                        <View style={{ flexDirection: "row" }}>
                                            <Pressable
                                                onPress={() => setUserData({ ...userData, gender: "male" })}
                                                style={({ pressed }) => [styles.genderButton, pressed && styles.pressed, userData?.gender == "male" ? styles.selectedButton : userData?.gender == "female" ? null : styles.selectedButton]}>
                                                <Text style={{ fontFamily: AppFonts.Roboto_Med }}>Male</Text>
                                            </Pressable>
                                            <Pressable
                                                onPress={() => setUserData({ ...userData, gender: "female" })}
                                                style={({ pressed }) => [styles.genderButton, pressed && styles.pressed, userData?.gender == "female" ? styles.selectedButton : null]}>
                                                <Text style={{ fontFamily: AppFonts.Roboto_Med }}>Female</Text>
                                            </Pressable>
                                        </View>



                                    </View> */}
                                    {/* <Pressable
                                        onPress={showPickedDate}
                                        style={styles.sectionContainer}>
                                        <Text style={styles.labelText}>
                                            {t("DateOfBirth")}
                                        </Text>
                                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                            <AppIcon type='Fontisto' name='date' />
                                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                {isPickingDate &&
                                                    <DateTimePicker
                                                        value={pickedDate}
                                                        is24Hour={true}
                                                        mode="date"
                                                        onChange={onChangeDateHandler}
                                                    />
                                                }
                                            </View>
                                        </View>
                                    </Pressable> */}


                                    <View style={{ paddingVertical: 20 }}>
                                        <FilledButton
                                            style={{ backgroundColor: isValid ? AppColorsTheme2.secondary : "#fde6b9" }}
                                            disabled={!isValid}
                                            onPress={handleSubmit}
                                        >
                                            {t("Submit")}</FilledButton>
                                    </View>

                                </>
                            )}
                        </Formik>
                    </View>
                    {/* <AppAlert  {...{ visible: verifyModalOpen, title: "Email Confirmation", message: `Code  will be sent to ${formRef.current?.values?.email} . Do you want to continue with this email ?`, onCancel: onCancelVerifyHandler, onConfirm: onConfirmVerifyHandler.bind(this, formRef.current?.values) }} /> */}



                    {/* <FooterArea /> */}
                </KeyboardAwareScrollView>

            </View>
        </ScrollView>


    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    labelText: {
        fontFamily: AppFonts.Roboto_Med,
        fontSize: AppSizes.medium,
        textAlign: "left",
        marginBottom: 8
    },
    action: {
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 5,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: 10

    },
    inputs: { color: AppColorsTheme2.black, flex: 1, width: "100%", fontWeight: "600", textAlign: I18nManager.isRTL ? "right" : "left" },

    textInput: {
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',

    },

    genderButton: { height: 40, justifyContent: "center", alignItems: "center", padding: 8, borderRadius: 10, minWidth: 80 },
    selectedButton: {
        borderWidth: 1,
        borderColor: AppColorsTheme2.primary
    },
    pressed: { opacity: 0.7 },
    sectionContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }
})