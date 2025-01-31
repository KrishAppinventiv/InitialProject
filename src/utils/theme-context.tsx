import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect, ReactNode} from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        console.log('Loaded theme:', savedTheme);
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme from AsyncStorage', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode ? 'dark' : 'light';
      console.log('Saving theme:', newTheme);
      setIsDarkMode(!isDarkMode);
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme to AsyncStorage', error);
    }
  };

  const setTheme = async (theme: string) => {
    try {
      console.log('Setting theme:', theme);
      setIsDarkMode(theme === 'dark');
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error setting theme in AsyncStorage', error);
    }
  };

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
