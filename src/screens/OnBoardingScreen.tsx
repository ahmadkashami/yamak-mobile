import { StyleSheet, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useTranslation } from 'react-i18next';

import { AppColorsTheme2 } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { AppSizes } from '../constants/Sizes';
import { AppFonts } from '../constants/fonts';



const DotComponent = ({ selected }: { selected: Boolean }) => {
    return <View style={[styles.dotContainer, selected && { backgroundColor: AppColorsTheme2.primary }]} />
}

const OnBoardingScreen = () => {
    const { t } = useTranslation()

    const [pagIndex, setPageIndex] = useState(0)
    const navigation = useNavigation()
    function handleOnSkip() {
        navigation?.replace("drawer")
    }
    const changePageHandler = (index) => {
        setPageIndex(index);
    }

    return (
        <Onboarding
            onSkip={handleOnSkip}
            onDone={handleOnSkip}
            skipLabel={t("Skip")}
            nextLabel={t("Next")}
            DotComponent={DotComponent}
            containerStyles={{
                // backgroundColor: pagIndex % 2 == 0 ? AppColorsTheme2.secondary : AppColorsTheme2.primary
                backgroundColor: AppColorsTheme2.offWhite
            }}
            pageIndexCallback={changePageHandler}
            pages={[
                {
                    backgroundColor: AppColorsTheme2.offWhite,
                    image: <Image
                        style={{ resizeMode: "contain", width: 400, height: 400 }}
                        source={require('../assets/images/onboarding/undraw1.png')} />,
                    title: t("selectServiceYouNeed"),
                    subtitle: '',
                    titleStyles: { fontSize: AppSizes.xLarge, color: AppColorsTheme2.primary, textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },
                    subTitleStyles: { fontSize: AppSizes.medium, color: "white", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },

                },
                {
                    backgroundColor: '#fff',
                    image: <Image
                        style={{ resizeMode: "contain", width: 400, height: 400 }}
                        source={require('../assets/images/onboarding/undraw2.png')} />,
                    title: t("ViewNearbyCars"),
                    subtitle: '',
                    titleStyles: { fontSize: AppSizes.xLarge, color: AppColorsTheme2.secondary, textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },
                    subTitleStyles: { fontSize: AppSizes.medium, color: "white", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },

                },
                {
                    backgroundColor: '#fff',
                    image: <Image
                        style={{ resizeMode: "contain", width: 400, height: 400 }}
                        source={require('../assets/images/onboarding/undraw3.png')} />,
                    title: t("CallUsForHelp"),
                    subtitle: '',
                    titleStyles: { fontSize: AppSizes.xLarge, color: AppColorsTheme2.primary, textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },
                    subTitleStyles: { fontSize: AppSizes.medium, color: "white", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },

                },
                {
                    backgroundColor: '#fff',
                    image: <Image
                        style={{ resizeMode: "contain", width: 400, height: 400 }}
                        source={require('../assets/images/onboarding/undraw4.png')} />,
                    title: t("WeWillReachYouAnyPlace"),
                    subtitle: '',
                    titleStyles: { fontSize: AppSizes.xLarge, color: AppColorsTheme2.secondary, textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },
                    subTitleStyles: { fontSize: AppSizes.medium, color: "white", textTransform: "capitalize", fontFamily: AppFonts.Roboto_Med },

                },
            ]}
        />
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    dotContainer: { width: 15, height: 15, borderRadius: 7.5, marginHorizontal: 10, backgroundColor: AppColorsTheme2.secondary, justifyContent: "center", alignItems: "center", }
})