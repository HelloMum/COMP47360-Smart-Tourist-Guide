import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface TeamMemberProps {
  image: string;
  name: string;
  title: string;
}

const TeamMemberBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
}));

const TeamMemberImage = styled('img')(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  marginBottom: '16px',
}));

const TeamMemberName = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
}));

const TeamMemberTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#666',
}));

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, title }) => (
  <TeamMemberBox>
    <TeamMemberImage src={image} alt={name} />
    <TeamMemberName>{name}</TeamMemberName>
    <TeamMemberTitle>{title}</TeamMemberTitle>
  </TeamMemberBox>
);

export default TeamMember;
