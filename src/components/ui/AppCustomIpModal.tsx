import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";

import { TextInput } from 'react-native-gesture-handler'
// import * as Updates from 'expo-updates';

import AppText from './AppText'
import { AppColorsTheme2 } from '../../constants/Colors'
import FilledButton from './common/FilledButton'
import PressbleAppIcon from './pressbleAppIcon'
import { isValidIpAddress } from '../../helpers/AppHelpers'
import { AsyncStorageConstants } from '../../constants/CommonConsstats'
import { setStorageValues } from '../../helpers/AppAsyncStoreage'

const AppCustomIpModal = ({ isOpen, setIsIpModalOpen }: { isOpen: boolean, setIsIpModalOpen: (isOpen: boolean) => void }) => {
    const [ipText, setIpText] = useState("")


    async function enterButtonHandler() {

        if (!isValidIpAddress(ipText)) return
        const url = `http://${ipText}:5001/api/mobile/v1/`
        const obj = { name: "customIp", url: url }
        await setStorageValues(AsyncStorageConstants.env, JSON.stringify(obj))
        setIsIpModalOpen(false)
        // await Updates.reloadAsync();
    }

    return (
        <View style={styles.container} >
            <Modal isVisible={isOpen} hasBackdrop >

                <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", bottom: 0, right: 0, top: 0, left: 0 }}>

                    <View style={{ width: "90%", height: 200, backgroundColor: AppColorsTheme2.white, borderWidth: 1, borderRadius: 10, padding: 20 }}>
                        <View style={{ position: "absolute", right: 10, top: 10, height: 30, width: 30 }}>
                            <PressbleAppIcon onPress={() => setIsIpModalOpen(false)} name='close' />
                        </View>
                        <AppText textStyle={{ textAlign: "center", marginVertical: 10 }}>Ip Address </AppText>
                        <TextInput
                            onChangeText={(text) => { setIpText(text) }}
                            placeholder='Enter Custom Ip'
                            style={{ height: 50, borderWidth: 1, marginHorizontal: 10, marginVertical: 10, padding: 10 }} >

                        </TextInput>
                        <FilledButton onPress={() => enterButtonHandler()} >enter</FilledButton>
                    </View>

                </View>

            </Modal >
        </View >
    )
}

export default AppCustomIpModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})