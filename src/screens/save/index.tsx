// Library Imports
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, View } from 'react-native';

// Asset Imports
import { Images } from '../../assets';

// Utility Imports
import { ThemeContext } from '../../utils/theme-context';

// Style Imports
import styles from './styles';
import { colors } from '../../theme';

const Save = () => {
  const {isDarkMode} = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.head}>
        <Text
          style={[styles.heading, {color: isDarkMode ? colors.white : colors.black}]}>
          {t('screens.saveScreen.heading')}
        </Text>
      </View>
      <View style={styles.savedView}>
        <Image source={Images.bookmark} style={styles.saveImg} />
        <Text style={styles.empty}>{t('screens.saveScreen.emptyMessage')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Save;
