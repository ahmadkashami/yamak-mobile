import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

const AppTextInput = () => {
    const [text, setText] = useState()

    return (
        <View style={{ width: "80%", height: 60, borderWidth: 1 }}>
            <TextInput
                onChangeText={(text) => setText(text)}
            ></TextInput>
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({})