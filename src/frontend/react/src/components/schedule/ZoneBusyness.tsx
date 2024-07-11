import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { ListContext } from '../../contexts/ListContext';

interface ZoneBusynessProps {
  zoneId: number | null;
}

const ZoneBusyness: React.FC<ZoneBusynessProps> = ({ zoneId }) => {
  const { selectedDates } = useContext(ListContext);
  const [busynessData, setBusynessData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        const response = await fetch(`http://localhost:8080/busyness/predict_all_sort_by_zone?startDate=${startDate}&endDate=${endDate}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        console.log(`Fetched busyness data for zone ${zoneId} between ${startDate} and ${endDate}:`, data);

        if (data[zoneId]) {
          setBusynessData(data[zoneId]);
        } else {
          setBusynessData(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching busyness data:', error);
        setError('Failed to fetch busyness data');
        setLoading(false);
      }
    };

    fetchBusynessData();
  }, [zoneId, selectedDates]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!busynessData) return <div>No data available for this zone.</div>;

  return (
    <div style={{
      width: '300px',
      height: '200px',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
    }}>
      <h3>Zone ID: {zoneId}</h3>
      {Object.keys(busynessData).map(date => (
        <div key={date}>
          <h4>{moment(date).format('MMMM Do YYYY')}</h4>
          {Object.keys(busynessData[date]).map(time => (
            <p key={time}>{time}: {busynessData[date][time]}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ZoneBusyness;
