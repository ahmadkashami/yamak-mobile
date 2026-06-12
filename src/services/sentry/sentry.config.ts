import * as Sentry from '@sentry/react-native';

import Config from 'react-native-config';
import { appVersion } from '../../constants/CommonConsstats';

const initSentry = async () => {
    try {

        if (!__DEV__)
            Sentry.init({
                dsn: Config.SENTRY_DSN,
                environment: Config.NODE_ENV,
                release: appVersion,
                sampleRate: 0.5, // Set the percentage of events to be sent (e.g., 0.5 for 50%)
                tracesSampleRate: 0.2,
                maxBreadcrumbs: 50, // Set the maximum number of breadcrumbs to be captured
                shutdownTimeout: 5000, //
            });
    } catch (error) {
        console.error('Error configuring Sentry:', error);
    }
};

const captureException = (error: Error, options = {}): string => {
    return Sentry.captureException(error, options);
};

const captureMessage = (message: string, options = {}): void => {
    Sentry.captureMessage(message, options);
};


const setSentryUserInfo = (user: any) => {
    console.log("user init", user);

    Sentry.setUser({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
    });
};

export { initSentry, setSentryUserInfo, captureException, captureMessage };