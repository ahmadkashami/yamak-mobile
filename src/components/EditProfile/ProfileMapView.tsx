import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useUserLocationStore } from '../../store/userLocation.store'

const ProfileMapView = () => {

    const userLocation = useUserLocationStore((state) => state.userLocation)


    return (
        <View style={{ height: 200, borderRadius: 20, overflow: "hidden" }}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: userLocation?.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.1999,
                    longitudeDelta: 0.1499,
                }}
            // region={kuwaitRegion}
            // region={{
            //     ...region,
            //     latitudeDelta: 0.1999,
            //     longitudeDelta: 0.1499,
            // }}
            >
                {userLocation && <Marker
                    title=" you"
                    coordinate={{ latitude: userLocation?.latitude, longitude: userLocation.longitude }}
                />}

            </MapView>
        </View>
    )
}

export default ProfileMapView

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
})