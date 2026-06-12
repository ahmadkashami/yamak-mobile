import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useMemo } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export type Ref = BottomSheetModal
const BottomSheet = forwardRef<Ref>(({ children, snapPoint = ["50%"] }, ref) => {
    const snapPoints = useMemo(() => snapPoint, []);
    return (
        <View >
            <BottomSheetModal ref={ref} snapPoints={snapPoints} >
                {children}
            </BottomSheetModal>
        </View>

    )
})

export default BottomSheet

const styles = StyleSheet.create({})