import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); 

  
  useEffect(() => {
    const loadFontSize = async () => {
      const savedSize = await AsyncStorage.getItem("fontSize");
      if (savedSize) {
        setFontSize(parseInt(savedSize, 10));
      }
    };
    loadFontSize();
  }, []);

 
  const updateFontSize = async (value) => {
    setFontSize(value);
    await AsyncStorage.setItem("fontSize", value.toString());
  };

 
  const fontSizes = {
    title: fontSize * 1.5, // Larger
    subtitle: fontSize * 1.2, // Medium
    body: fontSize, // Default
    small: fontSize * 0.8, // Smaller
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize: updateFontSize, fontSizes }}>
      {children}
    </FontSizeContext.Provider>
  );
};
