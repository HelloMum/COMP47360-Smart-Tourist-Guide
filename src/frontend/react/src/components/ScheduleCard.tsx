import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import moment from 'moment';

interface ScheduleCardProps {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
  busyness: number;
  event: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  id,
  name,
  startTime,
  endTime,
  latitude,
  longitude,
  busyness,
  event,
}) => {
  const formattedStartTime = moment(startTime).format('LT'); // Format start time
  const formattedEndTime = moment(endTime).format('LT');     // Format end time

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">
          <strong>Time:</strong> {formattedStartTime} - {formattedEndTime}
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> {latitude}, {longitude}
        </Typography>
        <Typography variant="body1">
          <strong>Busyness:</strong> {busyness.toFixed(2)}
        </Typography>
        <Typography variant="body1">
          <strong>Event:</strong> {event ? 'Yes' : 'No'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
