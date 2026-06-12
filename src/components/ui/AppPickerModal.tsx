import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import RnRestart from "react-native-restart"

import AppPressable from './AppPressable'
import AppText from './AppText'
import { AppSizes } from '../../constants/Sizes'
import { setStorageValues } from '../../helpers/AppAsyncStoreage'
import { AsyncStorageConstants } from '../../constants/CommonConsstats';

const AppPickerEnvModal = ({ isOpen, setIsOpen, setIsIpModalOpen }) => {
    const values = [{ name: "prod", url: "https://yamak-kw.com/api/mobile/v1/" }, { name: "staging", url: "https://yamak-kw.com/api/mobile/v1/" }, { name: "development", url: "https://yamak-kw.com/api/mobile/v1/" }]


    async function handlePickedEnv(item) {
        await setStorageValues(AsyncStorageConstants.env, JSON.stringify(item))
        setIsOpen()
        RnRestart.restart()
        // await Updates.reloadAsync();
    }



    return (
        <View style={styles.container} >
            <Modal transparent={true} style={{
                flex: 1,
            }} visible={isOpen} >
                <View style={{ margin: 10, position: "absolute", bottom: 20, right: 10, left: 10, }}>
                    <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
                        <AppText textStyle={{ textAlign: "center" }}>
                            Please Pick Environment
                        </AppText>
                        {values.map((el, index) => {

                            return <AppPressable
                                onPress={() => handlePickedEnv(el)}
                                key={index} style={styles.buttonContainer} >
                                <AppText>
                                    {el.name}
                                </AppText>
                            </AppPressable>

                        })}
                        <AppPressable
                            onPress={() => {
                                setIsIpModalOpen(true)
                                setIsOpen()

                            }}
                            style={styles.buttonContainer} >
                            <AppText>
                                custom-ip
                            </AppText>
                        </AppPressable>
                    </View>



                    <AppPressable
                        onPress={() => { setIsOpen() }}
                        style={styles.buttonContainer} >
                        <AppText textStyle={{ color: "tomato", fontSize: AppSizes.large }}>
                            cancel
                        </AppText>
                    </AppPressable>
                </View>

            </Modal>
        </View>
    )
}

export default AppPickerEnvModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: 'rgba(0,0,0,0.5)'

    },
    buttonContainer: {
        paddingHorizontal: 4,
        marginTop: 10,
        backgroundColor: "white",
        alignItems: "center", height: 50,
        borderRadius: 10,
        borderWidth: 1,
        // borderWidth: 1,
        justifyContent: "center"
    }
})