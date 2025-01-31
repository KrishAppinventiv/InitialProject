import React, {forwardRef, useRef} from 'react';
import {FlatList, ViewStyle, TextStyle, ListRenderItem, Animated} from 'react-native';
import {vh} from '../../utils/dimension';

interface CustomFlatListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor?: (item: T, index: number) => string;
  horizontal?: boolean;
  pagingEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: ViewStyle;
  onScroll?: (event: any) => void;
  onMomentumScrollEnd?: (event: any) => void;
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeIndex?: number;
  activeColor?: string;
  inactiveColor?: string;
  activeTextSize?: number;
  inactiveTextSize?: number;
}

const CustomFlatList = forwardRef<FlatList, CustomFlatListProps<any>>(
  (
    {
      data,
      renderItem,
      keyExtractor = (item, index) => index.toString(),
      horizontal = false,
      pagingEnabled = false,
      showsHorizontalScrollIndicator = false,
      showsVerticalScrollIndicator = false,
      contentContainerStyle,
      onScroll,
      onMomentumScrollEnd,
      style,
    },
    ref, 
  ) => {
    return (
      <FlatList
        ref={ref} 
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={horizontal}
        pagingEnabled={pagingEnabled}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={contentContainerStyle}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={style}
      />
    );
  },
);

export default CustomFlatList;