import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigator'
import { ThemeProvider } from './src/utils/theme-context'


const App = () => {
  return (
   <>
     <ThemeProvider>
     <RootNavigator/>
     </ThemeProvider>
   
   </>
  )
}

export default App

const styles = StyleSheet.create({})