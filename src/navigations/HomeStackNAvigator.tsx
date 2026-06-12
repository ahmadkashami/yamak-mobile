import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from '../constants/ScreenNames';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import VehiclesDetailsScreen from '../screens/VehiclesDetailsScreen';
import AppIcon from '../components/ui/appIcon';
import { AppColorsTheme2 } from '../constants/Colors';
import PressbleAppIcon from '../components/ui/pressbleAppIcon';
import { useNavigation } from '@react-navigation/native';
import AllVicelessScreen from '../screens/AllVicelessScreen';
import NoNetworkScreen from '../screens/NoNetworkScreen';

const HomeStack = createStackNavigator();


const HomeStackNavigator = () => {
    const navigation = useNavigation()
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={ScreenNames.Home_Screen} >
            <HomeStack.Screen name={ScreenNames.Home_Screen} options={{
                headerShown: true,
                title: "",
                headerRight: () => <View style={styles.imageContainer}>
                    <Image source={require("../assets/images/appLogo.png")} resizeMode={"cover"} style={styles.image} />
                </View>
                ,
                headerLeft: () => <View style={styles.imageContainer}>
                    <PressbleAppIcon onPress={() => { navigation.navigate(ScreenNames.Map_Screen) }} name='map-marker-radius-outline' color={AppColorsTheme2.white} size={30} type="MaterialCommunityIcons" />
                </View>,
                headerStyle: {
                    backgroundColor: AppColorsTheme2.primary
                }
            }}

                component={HomeScreen} />
            <HomeStack.Screen name={ScreenNames.Vehicle_Details_Screen} component={VehiclesDetailsScreen} />
            <HomeStack.Screen name={ScreenNames.ALL_VEHICLES_SCREEN} component={AllVicelessScreen} />
            {/* <HomeStack.Screen name={ScreenNames.No_Network_Screen} component={NoNetworkScreen} /> */}

            <HomeStack.Screen
                options={{
                    presentation: "modal"
                }}
                name={ScreenNames.Search_Screen}
                component={SearchScreen} />

        </HomeStack.Navigator>
    )
}

export default HomeStackNavigator

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        resizeMode: "contain",
    },
    imageContainer: {
        marginHorizontal: 15,

    }
})