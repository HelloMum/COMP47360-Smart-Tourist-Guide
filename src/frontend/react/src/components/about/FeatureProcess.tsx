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
  width: 'auto',
  height: 'auto',
  maxWidth: '100px',
  maxHeight: '100px',
  marginBottom: '20px',
  objectFit: 'contain',
}));


const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '14px',
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
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
