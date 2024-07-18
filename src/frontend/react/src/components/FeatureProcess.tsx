import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
}));

const FeatureIcon = styled('img')(({ theme }) => ({
  width: '60px',
  height: '60px',
  marginBottom: '16px',
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333',
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#666',
}));

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <FeatureBox>
    <FeatureIcon src={icon} alt={title} />
    <FeatureTitle>{title}</FeatureTitle>
    <FeatureDescription>{description}</FeatureDescription>
  </FeatureBox>
);

export default Feature;
