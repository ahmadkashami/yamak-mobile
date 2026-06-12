import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import React, { useRef, useState } from 'react'

const AppPicker = () => {
    const [selectedItem, setSelectedItem] = useState("java");
    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
    return (
        <Picker
            style={{
                position: "absolute",
                bottom: 0
            }}
            ref={pickerRef}
            selectedValue={selectedItem}

            onValueChange={(itemValue, itemIndex) => {
                setSelectedItem(itemValue)
                close()
            }


            }>

            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
    )
}

export default AppPicker

const styles = StyleSheet.create({})