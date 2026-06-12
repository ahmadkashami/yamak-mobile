import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { View, StyleSheet, Platform } from "react-native";
import ErrorSvg from "../../assets/svgs/internalError.svg"
import FilledButton from "../ui/common/FilledButton";
import { captureException } from "../../services/sentry/sentry.config";
import { appBuildNumber, appVersion } from "../../constants/CommonConsstats";
const myErrorHandler = (error: Error) => {

    captureException(error, {
        data: {
            date: new Date(),
            type: "UnHandled Error",
            device: Platform.OS,
            appVersion: appVersion,
            appBuild: appBuildNumber,

        }
    })


};
function ErrorFallback({ resetErrorBoundary }) {
    return (
        <View style={[styles.container]}>
            <View>
                <ErrorSvg width={300} height={300} />
                <FilledButton onPress={resetErrorBoundary} >try again</FilledButton>
            </View>
        </View>
    );
}
export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        {children}
    </ErrorBoundary>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 12,
    },
});