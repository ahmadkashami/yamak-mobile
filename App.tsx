/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  StatusBar,
  View,
} from 'react-native';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';

import { RootFun } from './RootFun';
import { I18nextProvider } from 'react-i18next';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import 'react-native-url-polyfill/auto';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { ModalContextProvider } from './src/context/modelContext';
import AppFlashMessage from './src/components/ui/AppFlashMessage';
import i18next from "./src/translation/Translation.config"
import { ErrorHandler } from './src/components/ErrorsHandler/ErrorHandler';

const queryClient = new QueryClient()

function App() {

  // const

  return (
    <>
      <StatusBar animated={true} barStyle={"default"} />
      <I18nextProvider i18n={i18next} >
        <QueryClientProvider client={queryClient}>
          <ModalContextProvider>
            <ErrorHandler >
              <RootFun />
            </ErrorHandler>
          </ModalContextProvider>
        </QueryClientProvider>
      </I18nextProvider>
      <AppFlashMessage />
      <Toast />
    </>
  );

}


export default App;
