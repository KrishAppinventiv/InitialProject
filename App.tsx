import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigator'
import { ThemeProvider } from './src/utils/theme-context'
import { FontSizeProvider } from './src/utils/Font/FontSizeContext'
import Toast from 'react-native-toast-message'


const App = () => {
  return (
   <>
     <ThemeProvider>
      <FontSizeProvider>
     <RootNavigator/>
     <Toast/>  
     </FontSizeProvider>
     </ThemeProvider>
   
   </>
  )
}

export default App

const styles = StyleSheet.create({})