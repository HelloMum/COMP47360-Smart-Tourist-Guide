import React from 'react';
import { Box, Container, Stack, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import TeamMember from '../../components/about/TeamMember';
import FeatureProcess from '../../components/about/FeatureProcess';
import { Divider } from 'antd';

// ---------- Text Styling ----------
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: '600',
  color: '#faa134',
  fontFamily: '"Lexend", sans-serif',
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#666',
}));

// ---------- static information about feature process ----------
const ProcessIcons = [
  {
    icon: "images/about/icon_1.png",
    title: "Wide Selection of Activities",
    description: "Browse through and select from numerous tourist attractions and events in Manhattan, New York "
  },
  {
    icon: "images/about/icon_2.png",
    title: "Ideal Planning",
    description: "Access your personalized schedule with ideal timings to avoid busyness and other inconveniences"
  },
  {
    icon: "images/about/icon_3.png",
    title: "Saved Itinerary",
    description: "Save your favorite itineraries permanently to your account for easy access and future reference anytime"
  }
]

// ---------- set up of the circle container for the feature process ----------
const CircleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f9f9f9',
  borderRadius: '2%',
  height: '400px',
  padding: '20px',
  [theme.breakpoints.up('xs')]: {
    width: '70vw',
  },
  [theme.breakpoints.up('sm')]: {
    width: '75vw',
  },
  [theme.breakpoints.up('md')]: {
    width: '25vw',
  },
  [theme.breakpoints.up('lg')]: {
    width: '25vw',
  },
  [theme.breakpoints.up('xl')]: {
    width: '25vw',
  },
}));

// ---------- static information about team members ----------
const TeamIcons = [
  {
    icon: "images/avatar/nathan.jpg",
    role: "Data Lead",
    name: "Nathan Power"
  },
  {
    icon: "images/avatar/mutu.jpg",
    role: "Coordination Lead",
    name: "Mustafa Tugrul Yilmaz"
  },
  {
    icon: "images/avatar/sha.jpg",
    role: "Frontend Code Lead",
    name: "Sha Luo"
  },
  {
    icon: "images/avatar/zack.jpg",
    role: "Customer Lead",
    name: "Maxim Zack Istasse"
  },
  {
    icon: "images/avatar/boyu.jpg",
    role: "Backend Code Lead",
    name: "Boyu Wang"
  },
  {
    icon: "images/avatar/jorge.jpg",
    role: "Maintenance Lead",
    name: "Jorge Duran Gonzalez"
  }
]

const About: React.FC = () => {
  return (
    <Box>
      <Box sx={{ px: '9%' }}>
        {/* ---------- Stack containing information about our service ---------- */}
        <Stack direction="column" alignItems="flex-start" spacing={1} sx={{ mt: '90px' }}>
          <SectionTitle variant="h2">
            Our Services
          </SectionTitle>

          <Grid container spacing={4}>
            {ProcessIcons.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CircleContainer>
                  <FeatureProcess title={feature.title} description={feature.description} icon={feature.icon} />
                </CircleContainer>
              </Grid>
            ))}
          </Grid>
        </Stack>

        {/* ---------- Stack containing information about data and algo ---------- */}
        <Stack direction="column" alignItems="flex-start" spacing={3} sx={{ mt: 10 }}>
          <SectionTitle variant="h2">Machine Learning & Itinerary Algorithm</SectionTitle>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
              alignItems: 'center',
              marginLeft: '10vw'
            }}
          >
            <Box sx={{ width: { md: '44vw', }, marginRight: { md: '5vw', lg: '10vw' } }}>

              <SectionDescription variant="body1" sx={{ marginLeft: 4, mt: 4 }}>
                Our application leverages advanced data analytics to optimize tourist trip scheduling in New York City. By integrating datasets from
                <span style={{ fontWeight: 550 }}> taxi trips, subway ridership, high-volume for-hire vehicle trips, and popular attractions,</span> we provide a comprehensive view into the movement of New Yorkers. Using these diverse datasets, we developed a machine learning model to predict passenger counts and crowd levels. Our unique Busyness Index helps users plan their visits to avoid peak times, enhancing their overall experience.

                <br></br> <br></br>
                <b> taxi trips, subway ridership, high-volume for-hire vehicle trips, and popular attractions,</b> we provide a comprehensive view into the movement of New Yorkers. Using these diverse datasets, we developed a machine learning model to predict passenger counts and crowd levels. Our unique Busyness Index helps users plan their visits to avoid peak times, enhancing their overall experience.
              </SectionDescription>
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', }}>
              <img
                src="images/about/right2.png"
                alt="Data & Algorithm"
                style={{
                  width: '400px'
                }}
              />
            </Box>
          </Box>
        </Stack>

        {/* ---------- Stack containing information about our team ---------- */}
        <Stack direction="column" alignItems="flex-start" spacing={2} sx={{ mt: 10 }}>
          <SectionTitle variant="h2">Our Team</SectionTitle>
          <Grid container spacing={4}>
            {TeamIcons.map((member, index) => (
              <Grid item xs={12} md={2} key={index}>
                <TeamMember image={member.icon} title={member.role} name={member.name} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '3vh',
        }}>
        <Divider />
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'gray',
          }}
        >
          © 2024, University College Dublin,
          Computer Science Conversion  <br />COMP47360-Research Practicum
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
