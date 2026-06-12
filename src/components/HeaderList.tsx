import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppIcon from './ui/appIcon'
import GoBackButton from './ui/GoBackButton'
import AppSearch from './home/Search'
import { useTranslation } from 'react-i18next'
import PressbleAppIcon from './ui/pressbleAppIcon'
import AppText from './ui/AppText'
import { AppColorsTheme2 } from '../constants/Colors'
import AppPressable from './ui/AppPressable'
import GoBackButtonRelative from './ui/GoBackButtonRelative'
import { AppSizes } from '../constants/Sizes'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames, StackNames } from '../constants/ScreenNames'

const HeaderList = ({ count = 0, showSearch = false, onSortPress = (sortingType: string) => { }, onSearch = () => { } }) => {
    const { t } = useTranslation()
    const [sorting, setSorting] = useState("asc")
    const navigation = useNavigation()
    async function handleSearch(text) {
        onSearch(text)
    }


    function handleFilterPress() {
        console.log("filters")
    }

    function handleSortingPress() {
        const newSort = sorting == "asc" ? "desc" : "asc"
        console.log(newSort, sorting);

        onSortPress(newSort)
        setSorting(newSort)
    }
    function handleNotificationPress() {
        navigation.navigate(StackNames.Profile_Stack, { screen: ScreenNames.Notification_Screen, initial: false })
    }

    return (
        <View style={{ borderBottomWidth: 0.5, backgroundColor: "white" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", height: 40, }}>
                <GoBackButtonRelative />
                <PressbleAppIcon
                    onPress={handleNotificationPress}
                    color='gray' size={25} type="FontAwesome" name='bell' style={{ marginRight: 16 }} />
            </View>
            {showSearch && (<View style={{ marginTop: 8, flexDirection: "row", paddingHorizontal: 16 }}>
                <AppSearch style={{ flex: 1, }} onSearch={handleSearch} label={t("Search")} />
                <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 10, justifyContent: "center", alignItems: "center", marginLeft: 16, width: 100, backgroundColor: AppColorsTheme2.secondary200 }}>
                    <PressbleAppIcon
                        style={{ marginRight: 4 }}
                        onPress={handleFilterPress}
                        name='filter' size={30} />
                    <AppText>
                        {t("Filter")}
                    </AppText>
                </View>
            </View>)}

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginVertical: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <PressbleAppIcon
                        onPress={handleSortingPress}
                        name='sort' type="MaterialIcons" />
                    <View style={{ left: -8, backgroundColor: "white", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                        <Text>{sorting == "asc" ? "A" : "Z"}</Text>
                    </View>
                </View>
                <AppText size={AppSizes.small}>{t("YouHaveNREsult", { count })}</AppText>
            </View>
        </View>

    )
}

export default HeaderList

const styles = StyleSheet.create({})