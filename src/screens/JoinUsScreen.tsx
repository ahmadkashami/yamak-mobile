import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useTransition } from 'react'
import JoiunUs from "../assets/images/joiunUs.svg"
import { AppColorsTheme2 } from '../constants/Colors'
import { horizontalScale } from '../helpers/Scalling'
import AppText from '../components/ui/AppText'
import AppIcon from '../components/ui/appIcon'
import FilledButton from '../components/ui/common/FilledButton'
import { androidPlayStoreLink, iosAppStoreLink, yamakWebsite } from '../constants/CommonConsstats'
import Clipboard from '@react-native-clipboard/clipboard'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/AppHeader'

const JoinUsScreen = ({ navigation }) => {
    const { t } = useTranslation()
    function copyToClipBoardHandler(text: string) {
        Clipboard.setString(text);
    }
    return (
        <View style={{ flex: 1 }}>
            <AppHeader title={t("JoinUs")} navigation={navigation} />

            <View style={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite, paddingHorizontal: horizontalScale(16) }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, flex: 1 }}>


                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <JoiunUs width={300} height={200} />
                    </View>
                    <AppText weight="700" alignItems="flex-start">{t("JoinOurTeam")}</AppText>
                    <AppText alignItems="flex-start">{t("GoOnlineOnOurMap")}</AppText>

                    <View style={{ marginVertical: 20 }}>
                        <View style={{ flexDirection: "row", }}>
                            <AppIcon name='info-with-circle' type="Entypo" />
                            <AppText style={{ marginLeft: 8 }} weight='700' > {t("HowToApplyForIt")} </AppText>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 20, }}>
                            <View style={{ width: "8%", marginRight: 20 }}>
                                <View style={{ borderColor: "gray", alignSelf: "flex-end", borderRadius: 1, height: 280.8, borderWidth: 4, borderStyle: "dashed", }} />
                                <View style={{ position: "absolute", right: -2, top: 0, backgroundColor: AppColorsTheme2.secandaryLight, borderRadius: 100, width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
                                    <AppText weight="bold" color={AppColorsTheme2.secondary} >1</AppText>
                                </View>
                                <View style={{ position: "absolute", right: -2, top: 100, backgroundColor: AppColorsTheme2.primaryLight, borderRadius: 100, width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
                                    <AppText weight="bold" color={AppColorsTheme2.primary} >2</AppText>
                                </View>
                                <View style={{ position: "absolute", right: -2, top: 200, backgroundColor: AppColorsTheme2.secandaryLight, borderRadius: 100, width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
                                    <AppText weight="bold" color={AppColorsTheme2.secondary} >3</AppText>
                                </View>
                            </View>
                            <View>
                                <View style={{ height: 100, }}>
                                    <AppText style={{ marginBottom: 8 }} weight='700' alignItems='flex-start'>
                                        {t("PrepareAllYourPaper")}
                                    </AppText>

                                    <AppText color='gray' weight='500' alignItems='flex-start'>
                                        - company info (name - logo - address)
                                    </AppText>
                                    <AppText color='gray' weight='500' alignItems='flex-start'>
                                        - driver info (name - email - picture)
                                    </AppText>
                                </View>

                                <View style={{ height: 100, }}>
                                    <AppText style={{ marginBottom: 8 }} weight='700' alignItems='flex-start'>
                                        {t("SendInformationToUs")}
                                    </AppText>
                                    <AppText color='gray' weight='500' alignItems='flex-start'>
                                        - Mail to : "yamak.app@gmail.com"
                                    </AppText>
                                    <AppText color='gray' weight='500' alignItems='flex-start'>
                                        - Call us : "(+965) 50759505"
                                    </AppText>
                                </View>
                                <View style={{ marginBottom: 70 }}>
                                    <AppText style={{ marginBottom: 8 }} weight='700' alignItems='flex-start'>
                                        {t("DownloadOurDriverApp")}
                                    </AppText>
                                    <AppText onPress={() => copyToClipBoardHandler(iosAppStoreLink)} nlines={1} color='gray' weight='500' alignItems='flex-start'>
                                        - App store
                                    </AppText>
                                    <AppText onPress={() => copyToClipBoardHandler(androidPlayStoreLink)} color='gray' nlines={1} weight='500' alignItems='flex-start'>
                                        - Google play
                                    </AppText>
                                </View>
                            </View>


                        </View>


                    </View>
                </ScrollView>
                <View >
                    <View style={{}}>
                        <View style={{ flexDirection: "row", backgroundColor: AppColorsTheme2.primaryLight, marginBottom: 8 }}>
                            <AppText style={{ flex: 1 }} >{yamakWebsite}</AppText>
                            <FilledButton onPress={() => copyToClipBoardHandler(yamakWebsite)} style={{ minWidth: 0, borderRadius: 8, padding: 8, backgroundColor: AppColorsTheme2.primary, width: 120 }} >Copy</FilledButton>
                        </View>
                    </View>
                </View>
                <FilledButton style={{ marginBottom: 10 }} onPress={() => { Linking.openURL("tel://+96550759505") }} >{t("ContactHelp")}</FilledButton>

            </View >
        </View>

    )
}

export default JoinUsScreen

const styles = StyleSheet.create({})

export const DashedLine = ({ height, color, dashWidth, dashGap }: any) => {
    const styles = StyleSheet.create({
        container: {
            height,
            borderRightWidth: dashWidth,
            borderRightColor: color,
            borderRightStyle: 'dashed',
            marginRight: dashGap,
        },
    });

    return <View style={styles.container} />;
};

