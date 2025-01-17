import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

import styles from './styles';
import tutorialData from '../../assets/tutorialData';
import {ScreenNames} from '../../navigator/screenNames';

const {width} = Dimensions.get('window');

const TutorialScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const RADIUS = 30;
  const STROKE_WIDTH = 5;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const progress = scrollX.interpolate({
    inputRange: [0, (tutorialData.length - 1) * width],
    outputRange: [CIRCUMFERENCE, 0],
    extrapolate: 'clamp',
  });

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < tutorialData.length) {
      flatListRef.current.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.Signin}],
      });
    }
  };

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={tutorialData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.progressCircleContainer}
          onPress={handleNext}>
          <Svg height={80} width={80}>
            <Circle
              cx="40"
              cy="40"
              r={RADIUS}
              stroke="#E0E0E0"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            <AnimatedCircle
              cx="40"
              cy="40"
              r={RADIUS}
              stroke="#0000FF"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              strokeDashoffset={progress}
              strokeLinecap="round"
            />
          </Svg>
          <TouchableOpacity style={styles.arrowContainer} onPress={handleNext}>
            <Text style={styles.arrowText}>
              {currentIndex === tutorialData.length - 1 ? '✔' : '➔'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TutorialScreen;
