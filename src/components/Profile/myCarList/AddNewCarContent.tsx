import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import FilledButton from '../../ui/common/FilledButton';
import { useTranslation } from 'react-i18next';
import AppText from '../../ui/AppText';
import UserCarSvg from "../../../assets/svgs/userCar.svg"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddNewCarContent = ({ onAddCar }) => {
    const { t } = useTranslation()
    const [carMake, setCarMake] = useState('');
    const [carModel, setCarModel] = useState('');
    const [carYear, setCarYear] = useState('');

    const handleAddCar = () => {
        if (!carMake || !carModel || !carYear) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        if (carMake.length < 3) {
            Alert.alert('Validation Error', 'Car make must be at least 3 characters long');
            return;
        }

        if (carModel.length < 3) {
            Alert.alert('Validation Error', 'Car model must be at least 3 characters long');
            return;
        }

        if (!/^\d{4}$/.test(carYear)) {
            Alert.alert('Validation Error', 'Please enter a valid 4-digit year');
            return;
        }

        const currentYear = new Date().getFullYear();
        const enteredYear = parseInt(carYear, 10);

        if (enteredYear < 1900 || enteredYear > currentYear) {
            Alert.alert('Validation Error', 'Please enter a valid car year between 1900 and the current year');
            return;
        }

        onAddCar({ make: carMake, model: carModel, year: carYear })
    };
    return (

        <KeyboardAwareScrollView contentContainerStyle={{
            justifyContent: "center", paddingHorizontal: 24,
            paddingTop: 20,
        }} style={styles.container}>
            <AppText textStyle={styles.title}>{t("EnterNewCarDetails")}</AppText>
            <View style={{ top: -10, justifyContent: "center", alignItems: "center" }}>
                <UserCarSvg width={500} height={200} />

            </View>
            <View style={styles.inputContainer}>
                <AppText textStyle={styles.label}>{t("CarMake")}</AppText>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Toyota"
                    value={carMake}
                    onChangeText={(text) => setCarMake(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <AppText textStyle={styles.label}>{t("CarModel")}</AppText>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Camry"
                    value={carModel}
                    onChangeText={(text) => setCarModel(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <AppText textStyle={styles.label}>{t("CarYear")}</AppText>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., 2022"
                    keyboardType="numeric"
                    value={carYear}
                    onChangeText={(text) => setCarYear(text)}
                />
            </View>

            <FilledButton style={styles.addButton} onPress={handleAddCar}>
                {t("AddCar")}
            </FilledButton>
        </KeyboardAwareScrollView>
    )
}

export default AddNewCarContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
        textAlign: "center"
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    addButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})