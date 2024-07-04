import React, { useState, useContext } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import './DateRangePicker.css';
import { ListContext } from '../contexts/ListContext';

const { RangePicker } = DatePicker;

const disabled7DaysDate = (fromDate) => (current) => {
  const tomorrow = moment().add(1, 'days').startOf('day');
  const thirtyDaysFromTomorrow = moment().add(30, 'days').endOf('day');

  if (!current) {
    return false;
  }

  const isOutsideThirtyDaysRange = current.isBefore(tomorrow) || current.isAfter(thirtyDaysFromTomorrow);
  const isOutsideSevenDaysRange = fromDate && Math.abs(current.diff(fromDate, 'days')) >= 7;

  return isOutsideThirtyDaysRange || isOutsideSevenDaysRange;
};

const DateRangePicker = ({ onDateChange }) => {
  const [fromDate, setFromDate] = useState(null);
  const [dates, setDates] = useState([null, null]);
  const { setSelectedDates } = useContext(ListContext);

  const handleCalendarChange = (dates) => {
    setFromDate(dates ? dates[0] : null);
    setDates(dates);
  };

  const handleChange = (dates) => {
    setDates(dates);
    setSelectedDates(dates); // Update context with selected dates
    if (dates && dates[0] && dates[1]) {
      onDateChange(dates);
    } else {
      onDateChange(null);
    }
  };

  return (
    <div className="custom-range-picker">
      <RangePicker
        disabledDate={disabled7DaysDate(fromDate)}
        onCalendarChange={handleCalendarChange}
        onChange={handleChange}
        value={dates}
      />
    </div>
  );
};

export default DateRangePicker;
