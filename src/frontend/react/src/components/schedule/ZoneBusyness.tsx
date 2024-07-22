import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { ListContext } from '../../contexts/ListContext';
import { Stack, Select, MenuItem, FormControl, CircularProgress, Box } from '@mui/material';
import { Chart } from 'react-google-charts';
import { getColor } from './colorMappings';
import { Close } from '@mui/icons-material';
import styled from 'styled-components';


const tooltipStyles = `
  .google-visualization-tooltip {
    background-color: #ffffff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
    font-size: 12px;
    color: #333;
    border-radius: 4px;
    white-space: nowrap;
  }
`;


const injectTooltipStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = tooltipStyles;
  document.head.appendChild(styleElement);
};

interface ZoneBusynessProps {
  zoneId: number | null;
  zoneName: string;
  onClose: () => void;
  selectedTime: string | null; 
}

const ZoneBusyness: React.FC<ZoneBusynessProps> = ({ zoneId, zoneName, onClose, selectedTime }) => {
  const { selectedDates } = useContext(ListContext);
  const [busynessData, setBusynessData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTime) {
      const date = moment(selectedTime).format('YYYY-MM-DD');
      setSelectedDate(date);
    }
  }, [selectedTime]);

  useEffect(() => {
    const fetchBusynessData = async () => {
      if (!zoneId || !selectedDates || !selectedDates[0] || !selectedDates[1]) {
        setBusynessData(null);
        setLoading(false);
        return;
      }

      const startDate = selectedDates[0].format('YYYY-MM-DD');
      const endDate = selectedDates[1].format('YYYY-MM-DD');

      try {
        const response = await fetch(`/api/busyness/predict_all_sort_by_zone?startDate=${startDate}&endDate=${endDate}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        console.log(`Fetched busyness data for zone ${zoneId} between ${startDate} and ${endDate}:`, data);

        if (data[zoneId]) {
          setBusynessData(data[zoneId]);
          setAvailableDates(Object.keys(data[zoneId]));
          setSelectedDate(Object.keys(data[zoneId])[0]); // Select the first available date by default
        } else {
          setBusynessData(null);
          setAvailableDates([]);
          setSelectedDate(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching busyness data:', error);
        setError('Failed to fetch busyness data');
        setLoading(false);
      }
    };

    fetchBusynessData();
    injectTooltipStyles(); // Inject the tooltip styles
  }, [zoneId, selectedDates]);

  const handleDateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDate(event.target.value as string);
  };

  const formatDataForChart = (data: any) => {
    const chartData = [['Time', 'Busyness', { role: 'style' }, { role: 'tooltip', type: 'string', p: { html: true } }]];
    Object.keys(data).forEach((time) => {
      const value = data[time];
      const color = getColor(value);
      const tooltipContent = `<div class="custom-tooltip">
                                ${time.split('T')[1]} Busyness: ${value}
                              </div>`;
      chartData.push([time.split('T')[1], value, color, tooltipContent]);
    });
    return chartData;
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  if (!busynessData) return <div>No data available for this zone.</div>;

  return (
    <Box sx={{
      width: 330,
      height: 200,
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      position: 'relative',
      p: 0.5,
    }}>

      <Close 
        sx={{
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: 'transparent',
          border: 'none',
          color: 'grey', 
          fontSize: 16,
          cursor: 'pointer',
          minWidth: 'unset',
          padding: 0
        }}
        onClick={onClose}
      >
        
      </Close>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '10px', marginBottom: '0px' }}>
        <h3>{zoneName}</h3>
        <FormControl sx={{ ml: 2 }}>
          <Select
            labelId="date-select-label"
            id="date-select"
            value={selectedDate || ''}
            onChange={handleDateChange}
            sx={{
              width: 100,
              height: 20,
              fontSize: 11,
              color: 'black',
              backgroundColor: 'background.paper',
              '& .MuiSelect-select': {
                padding: '5px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey',
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
              },
              '&.Mui-active': {
                backgroundColor: 'background.paper',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                },
              },
            }}
          >
            {availableDates.map(date => (
              <MenuItem key={date} value={date} sx={{ fontSize: 11, color: 'black', height: 20 }}>
                {moment(date).format('YYYY-MM-DD')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedDate && busynessData[selectedDate] && (
        <Box sx={{ mt: 1, height: '190px', width: '350px' }}>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={formatDataForChart(busynessData[selectedDate])}
            options={{
              legend: { position: 'none' },
              chartArea: {
                left: 30,    
                right: 20,  
                top: 5,     
                bottom: 30,
              },
              bar: { groupWidth: '50%' },
              series: {
                0: {
                  dataOpacity: 0.8,
                  color: '#1f77b4',
                  visibleInLegend: true,
                },
              },
              annotations: {
                textStyle: {
                  fontSize: 10,
                  color: '#000',
                },
              },
              isStacked: true,
              tooltip: {
                isHtml: true,
                textStyle: {
                  fontSize: 12, 
                  color: '#333', 
                },
                showColorCode: true, 
                trigger: 'focus', 
                ignoreBounds: true, 
                boxStyle: {
                  stroke: '#ccc', 
                  strokeWidth: 1, 
                  shadow: true, 
                  padding: '10px',
                },
                cssClass: 'custom-tooltip', 
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ZoneBusyness;
