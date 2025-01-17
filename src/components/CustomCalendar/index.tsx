import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {colors} from '../../theme';

type CustomCalendarProps = {
  visible: boolean;
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  visible,
  selectedDate,
  onDateSelect,
  onClose,
}) => {
  if (!visible) return null;

  return (
   
      <View style={styles.calendarContainer}>
        <Calendar
          current={moment().format('YYYY-MM-DD')}
          onDayPress={(day:any) => {
            if (day?.dateString) {
              onDateSelect(moment(day).format('DD, MMM YYYY'));
              onClose();
            }
          }}
          markedDates={{
            [selectedDate]: {selected: true, selectedColor: colors.main},
          }}
          markingType="simple"
        />
      </View>
  
  );
};

const styles = StyleSheet.create({

  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    
    elevation: 5,
  },
});

export default CustomCalendar;
