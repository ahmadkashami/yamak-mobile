import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CountryPickerModel from 'react-native-country-picker-modal'

const CountryPicker = ({ setSelectedFlag }: { setSelectedFlag: (countryCode: string) => void }) => {
    const [countryCode, setCountryCode] = useState('KW')
    const [country, setCountry] = useState(null)

    const [withFilter, setWithFilter] = useState<boolean>(true)
    const [withCallingCode, setWithCallingCode] = useState<boolean>(true)

    const onSelect = (country: any) => {
        const code = `+${country.callingCode[0]}`
        setSelectedFlag(code)
        setCountryCode(country.cca2)
        setCountry(country)
    }

    useEffect(() => {
        setSelectedFlag("+965")
    }, [])

    return (
        <View>
            <CountryPickerModel
                {...{
                    countryCode,
                    withFilter,
                    withCallingCode,
                    onSelect,
                }}
            >

            </CountryPickerModel>
        </View >
    )
}

export default CountryPicker

const styles = StyleSheet.create({})