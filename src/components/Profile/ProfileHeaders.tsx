import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColorsTheme2 } from '../../constants/Colors'
import { AppSizes } from '../../constants/Sizes'
import { useAuthenticationStoreAsync } from '../../store/auth.store'
import { AppFonts } from '../../constants/fonts'

const ProfileHeaders = () => {
    const user = useAuthenticationStoreAsync((state) => state.user)

    return (
        <View style={{ padding: 24 }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
                <View
                    style={styles.imageContainer}
                >
                    <Image
                        style={styles.image}
                        source={require("../../assets/images/person1.png")}
                    />
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <Text
                        style={{ color: AppColorsTheme2.primary, fontSize: AppSizes.medium, textAlign: "center", marginBottom: 4 }}
                    >
                        {user ? user.name : "Hussam Maher"}
                        {/* {user?.displayName} */}
                    </Text>
                    <Text
                        style={{ color: "gray", fontSize: AppSizes.small, fontFamily: AppFonts.Roboto_Med, textAlign: "center" }}
                    >
                        {user.email}
                        {/* {user ? user.phone : "+96566917953"} */}
                        {/* {user?.phoneNumber?.slice(4)} */}
                    </Text>
                </View>

            </View>
        </View>
    )
}

export default ProfileHeaders

const styles = StyleSheet.create({

    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderColor: "black",
        resizeMode: "contain",
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderWidth: 6,
        borderColor: AppColorsTheme2.white,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColorsTheme2.secondary,
    }
})