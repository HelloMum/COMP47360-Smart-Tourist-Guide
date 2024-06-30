import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import './DateRangePicker.css';  // 导入自定义 CSS

const { RangePicker } = DatePicker;

// Disabled 7 days from the selected date
const disabled7DaysDate = (fromDate: moment.Moment | null) => (current: moment.Moment) => {
  if (!fromDate) return false;
  return Math.abs(current.diff(fromDate, 'days')) >= 7;
};

const DateRangePicker: React.FC = () => {
  const [fromDate, setFromDate] = useState<moment.Moment | null>(null);

  const handleCalendarChange = (dates: [moment.Moment | null, moment.Moment | null] | null) => {
    setFromDate(dates ? dates[0] : null);
  };

  return (
    <div className="custom-range-picker">
      <RangePicker
        disabledDate={disabled7DaysDate(fromDate)}
        onCalendarChange={handleCalendarChange}
      />
    </div>
  );
};

export default DateRangePicker;
