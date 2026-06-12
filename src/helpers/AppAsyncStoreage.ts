import AsyncStorage from '@react-native-async-storage/async-storage';


export async function setStorageValues(name: string, value: string) {
  try {
    await AsyncStorage.setItem(name, value);

  } catch (e) {
    console.log(e);
  }

}

export async function deleteStorageValue(name: string) {
  await AsyncStorage.removeItem(name);
}

export async function getStorageValues(name: string,) {
  return AsyncStorage.getItem(name);
}
