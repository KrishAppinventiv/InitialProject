import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the context type
type FontSizeContextType = {
  fontSize: number;
  setFontSize: (value: number) => void;
  fontSizes: {
    title: number;
    subtitle: number;
    body: number;
    small: number;
  };
};


export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 16,
  setFontSize: () => {},
  fontSizes: {
    title: 24,
    subtitle: 19.2,
    body: 16,
    small: 12.8,
  },
});


export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
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

  const updateFontSize = async (value: number) => {
    setFontSize(value);
    await AsyncStorage.setItem("fontSize", value.toString());
  };

  const fontSizes = {
    title: fontSize * 1.5,
    subtitle: fontSize * 1.2,
    body: fontSize,
    small: fontSize * 0.8,
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize: updateFontSize, fontSizes }}>
      {children}
    </FontSizeContext.Provider>
  );
};