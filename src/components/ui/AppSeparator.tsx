import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '../../constants/Colors'

const AppSeparator = () => {
  return (
    <View style={{ borderWidth: 1, width: "90%", alignSelf: "center", borderColor: AppColors.gray }}>
    </View>
  )
}

export default AppSeparator

const styles = StyleSheet.create({})