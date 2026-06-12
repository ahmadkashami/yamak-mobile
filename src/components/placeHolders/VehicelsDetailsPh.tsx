import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContentLoader, { Rect, Circle, Path, List } from 'react-content-loader/native'
import { AppColorsTheme2 } from '../../constants/Colors'
import Screen from '../Screen'

export const VehicelsDetailsPh = () => {
    return (
        <Screen>
            <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: AppColorsTheme2.offWhite }}>

                <View style={styles.container}>
                    <View style={{ marginBottom: 10 }}>
                        <ContentLoader
                            height={250}
                            speed={2}
                            backgroundColor={AppColorsTheme2.primaryLight}
                            foregroundColor={'#fff'}
                            opacity={0.5}
                        >
                            <Path x={100} y={100} />
                        </ContentLoader>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <ContentLoader
                            height={150}
                            width={"90%"}
                            speed={2}
                            style={{ alignSelf: "center" }}
                            backgroundColor={AppColorsTheme2.primaryLight}
                            foregroundColor={'#fff'}
                            opacity={0.5}
                        >
                        </ContentLoader>
                    </View>


                    <View style={{ height: 150, marginHorizontal: 20, marginBottom: 20 }}>
                        <FlatList horizontal data={[1, 2, 3, 4, 5]} renderItem={
                            () => (
                                <ContentLoader
                                    height={150}
                                    width={150}
                                    speed={2}
                                    style={{ marginRight: 10, borderRadius: 10, overflow: "hidden" }}
                                    backgroundColor={AppColorsTheme2.primaryLight}
                                    foregroundColor={'#fff'}
                                    opacity={0.8}
                                >
                                    <Path x={50} y={50} />
                                </ContentLoader>
                            )
                        } />
                    </View>

                    <View style={{ height: 100, marginHorizontal: 20, marginBottom: 20 }}>

                        <ContentLoader
                            title='hello'
                            height={80}
                            width={"100%"}
                            speed={2}
                            style={{ marginRight: 10, borderRadius: 10, overflow: "hidden" }}
                            backgroundColor={AppColorsTheme2.primaryLight}
                            foregroundColor={'#fff'}
                            opacity={0.8}
                        >
                            <Path />
                        </ContentLoader>

                    </View>


                    <View style={{ height: 200, marginHorizontal: 20, marginBottom: 20 }}>
                        <ContentLoader
                            speed={2}
                            style={{ marginRight: 10, borderRadius: 10, overflow: "hidden" }}
                            backgroundColor={AppColorsTheme2.primaryLight}
                            foregroundColor={'#fff'}
                            opacity={0.8}
                        >
                            <List />
                        </ContentLoader>

                    </View>


                </View>
            </ScrollView>

        </Screen>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColorsTheme2.offWhite
    }
})