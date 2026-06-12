import { useEffect, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from '@react-native-community/geolocation';

const userCurrentLocation = () => {
    const [currentLocation, setCurrentLocation] = useState<any>(null)
    const [error, setError] = useState("")


    useEffect(() => {
        requestLocationPermission()
    }, [])

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log({ latitude, longitude });

                setCurrentLocation({ latitude, longitude });
            },
            error => {
                setError(error.message || 'Error getting location');
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    const requestLocationPermission = async () => {

        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            getCurrentLocation()
        } else {

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'Your app needs access to your location',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location permission granted');
                    getCurrentLocation();
                } else {
                    console.log('Location permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };
    return { currentLocation, error }
}

export default userCurrentLocation

