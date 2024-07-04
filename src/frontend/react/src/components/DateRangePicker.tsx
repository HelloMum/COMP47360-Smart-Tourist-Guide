import React, { useState, useContext, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import './DateRangePicker.css';
import { ListContext } from '../contexts/ListContext';

const { RangePicker } = DatePicker;

const disabled7DaysDate = (fromDate) => (current) => {
  if (!fromDate) return false;
  return Math.abs(current.diff(fromDate, 'days')) >= 7;
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
