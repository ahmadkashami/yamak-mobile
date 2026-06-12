import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AppColorsTheme2 } from '../../constants/Colors'
import AppText from '../ui/AppText'

const YourSaftyMatter = () => {
    const { t } = useTranslation()
    return (
        <View  >
            <AppText style={{ alignItems: "flex-start" }} textStyle={styles.heading}>{t("YourSaftyMatter")}</AppText>
            <View style={{ backgroundColor: AppColorsTheme2.white, borderRadius: 10, overflow: 'hidden' }}>
                <View style={{ alignItems: "flex-start", paddingHorizontal: 20, marginVertical: 10 }}>
                    <AppText textStyle={{ fontWeight: "500", color: "gray" }} style={{ marginBottom: 8 }}>
                        {`\u2022 ${t("onlyMeetInPublic")}`}
                    </AppText>
                    <AppText textStyle={{ fontWeight: "500", color: "gray", flexWrap: "wrap" }} style={{ marginBottom: 8, }}>
                        {`\u2022 ${t("CheckAndIncpect")}`}
                    </AppText>
                    <AppText textStyle={{ fontWeight: "500", color: "gray" }} style={{ marginBottom: 8 }}>
                        {`\u2022 ${t("NeverPayAnythingInAdvance")}`}
                    </AppText>
                    <AppText textStyle={{ fontWeight: "500", color: "gray" }} style={{ marginBottom: 8 }}>
                        {`\u2022 ${t("NeverGoAlone")}`}
                    </AppText>
                </View>

            </View>
        </View>
    )
}

export default YourSaftyMatter

const styles = StyleSheet.create({
    heading: { paddingHorizontal: 10, marginBottom: 10, },
})