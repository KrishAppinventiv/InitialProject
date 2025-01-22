import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Images } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { vh, vw } from '../../theme/dimensions'
// import { useSelector } from 'react-redux'

import { colors } from '../../theme'
import styles from './styles'
import { ThemeContext } from '../../utils/theme-context'
import { useTranslation } from 'react-i18next'
import { ScreenNames } from '../../utils/screenNames'

const Save = () => {
    const navigation:any = useNavigation();
    
    // const favoriteItems = useSelector(state => state.favorites.items);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); 
    const { t } = useTranslation();
  

    
  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
   

    <View style={styles.head}>
      <Text
        style={[styles.heading,{color:isDarkMode?"#ffffff":'#000'}]}>
       {t('screens.saveScreen.heading')}
      </Text>
    </View>
    <View style={styles.savedView}> 
        <Image source={Images.bookmark} style={styles.saveImg}/>
      <Text style={styles.empty}>{t('screens.saveScreen.emptyMessage')}</Text>
    </View>
   
    </SafeAreaView>
  )
}

export default Save

