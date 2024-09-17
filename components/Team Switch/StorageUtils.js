// storageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Fetch a value from AsyncStorage by key.
 * @param {string} key - The key of the value to fetch.
 * @returns {Promise<any>} - The value associated with the key, or null if not found.
 */
export const getFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Failed to fetch data from AsyncStorage for key "${key}":`, error);
    return null;
  }
};
