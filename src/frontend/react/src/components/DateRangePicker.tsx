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

const DateRangePicker = ({ onDateChange, className, value }) => {
  const [fromDate, setFromDate] = useState(value ? value[0] : null);
  const { setSelectedDates } = useContext(ListContext);

  const handleCalendarChange = (dates) => {
    setFromDate(dates ? dates[0] : null);
  };

  const handleChange = (dates) => {
    setSelectedDates(dates); // Update context with selected dates
    onDateChange(dates);
  };

  return (
    <div className={`custom-range-picker ${className}`}>
      <RangePicker
      
        disabledDate={disabled7DaysDate(fromDate)}
        onCalendarChange={handleCalendarChange}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default DateRangePicker;
