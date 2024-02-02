import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import CalendarFlatList from './calendarFlatList/CalendarFlatList';

const { width } = Dimensions.get('window');

export default function Calendar() {
  const swiper = useRef<Swiper>(null);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  //Get weekday name (Torstai)
  var options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  var formatter = new Intl.DateTimeFormat('fi-FI', options);
  var weekdayName = formatter.format(value);

  //Get date (dd/mm/yy)
  var options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  var formattedDate = value.toLocaleDateString('fi-FI', options);
  console.log(weekdayName)
  console.log(formattedDate)

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.subtitle}>{weekdayName.toUpperCase()}</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <View style={styles.seperatorLine}></View>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                
                swiper.current?.scrollTo(1, false);
                
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: 'white',   
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#40D94E' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
      </View>
      <CalendarFlatList />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  container: {
    paddingVertical: 24,
    backgroundColor: '#40D94E'
  },
  picker: {
    maxHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 6,
  },
  header: {
    width: width,
    alignItems: 'flex-end',
    paddingHorizontal: 40,
    marginTop: 50
  },
  content: {
    paddingHorizontal: 16,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  item: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemDate: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
  seperatorLine: {
    width: width,
    borderWidth: 0.4,
    borderColor: 'white',
    marginTop: 10,
    marginBottom: 20
  }
});