import React from 'react';
import './About.css';
import { Box, Container, Stack, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import TeamMember from '../../components/TeamMember';
import FeatureProcess from '../../components/FeatureProcess';


// ---------- Text Styling ----------
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#333',
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#666',
}));

// ---------- static information about feature process ----------
const ProcessIcons = [
  {
    icon:"",
    title: "Wide Selection of Activities",
    description: "Browse through X number of fun events and popular activities and select the ones that you are interestedi in"
  },
  {
    icon:"",
    title: "Ideal Planning",
    description: "Access your personalized schedule with ideal timings to avoid busyness and other inconveniences"
  },
  {
    icon:"",
    title: "Mapped Itinerary",
    description: "Access our map displaying your planned activities for the day"
  }
]

// ---------- set up of the circle container for the feature process ----------
const CircleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: '50%',
  width: '320px',
  height: '320px',
  margin: '0 auto',
}));

// ---------- static information about team members ----------
const TeamIcons = [
  {
    icon:"",
    role:"Data Lead",
    name:"Nathan Power"
  },
  {
    icon:"",
    role:"Coordination Lead",
    name:"Mustafa Tugrul Yilmaz"
  },
  {
    icon:"",
    role:"Front-end Code Lead",
    name:"Sha Luo"
  },
  {
    icon:"",
    role:"Customer Lead",
    name:"Maxim Zack Istasse"
  },
  {
    icon:"",
    role:"Back-end Code Lead",
    name:"Boyu Wang"
  },
  {
    icon:"",
    role:"Maintenance Lead",
    name:"Jorge Duran Gonzalez"
  }
]


const About: React.FC = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Container>
        {/* ---------- Stack containing information about our service ---------- */}
        <Stack direction="column" alignItems="flex-start"  spacing={6}  sx={{ mt: 10 }}> 
          <SectionTitle variant="h2" >
            Our Service
          </SectionTitle>
          <SectionDescription variant="body1">
          XXX, your perfect travel companion!<br />
          Forget about spending hours researching events and activities for your trip to New York City. 
          Instead, let us do the heavy lifting for you. With XXX, you can effortlessly browse through a wide range 
          of popular activities to do in Manhattan. Choose your favourites based on your interests, whether it's sightseeing, 
          dining, shopping, or experiencing the vibrant culture of the city.<br />
          Our advanced algorithm will then create a personalized planning just for you. It ensures you visit 
          each event at the best time, avoiding crowds and other hassles, to make your trip as pleasant as possible.<br /> 
          Each day of your trip, XXX will offer you a detailed map displaying all your planned activities in order. 
          This map will not only show you the sequence of your events but also provide important information on how 
          to reach each destination. (ADD MORE ONCE THE FEATURE IS COMPLETED)<br />
          With XXX, every aspect of your journey planning is taken care of, without the usual stress and inconveniences, turning your trip into a seamless travel experience. 
          </SectionDescription>
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
        <Stack direction="column" alignItems="flex-start" spacing={2} sx={{ mt: 10 }}>
          <SectionTitle variant="h2">Data & Algorithm</SectionTitle>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <SectionDescription variant="body1">
              Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Nibh mauris cursus mattis molestie. 
              Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Pharetra et ultrices neque ornare aenean euismod 
              elementum nisi quis. Aliquam id diam maecenas ultricies mi eget. Sed ullamcorper morbi tincidunt ornare massa eget egestas. 
              Ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Neque laoreet suspendisse interdum consectetur 
              libero id faucibus nisl tincidunt. Sit amet commodo nulla facilisi nullam vehicula ipsum a. Diam ut venenatis tellus in metus 
              vulputate eu. Et tortor at risus viverra adipiscing at in tellus integer. Mattis ullamcorper velit sed ullamcorper morbi 
              tincidunt ornare massa. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Amet porttitor eget dolor morbi 
              non arcu. Sed viverra ipsum nunc aliquet. Neque sodales ut etiam sit. Adipiscing at in tellus integer feugiat. Diam vulputate 
              ut pharetra sit amet aliquam id diam. Ultricies mi quis hendrerit dolor magna eget. Purus sit amet volutpat consequat mauris nunc 
              congue nisi.
              </SectionDescription>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="/path/to/your/image.png" alt="Data & Algorithm" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </Box>
            </Grid>
          </Grid>
        </Stack>


        {/* ---------- Stack containing information about our team ---------- */}
        <Stack direction="column" alignItems="flex-start" spacing={2} sx={{ mt: 10}}>
          <SectionTitle variant="h2">Our Team</SectionTitle>
          <Grid container spacing={4}>
            {TeamIcons.map((member, index) => (
              <Grid item xs={12} md={2} key={index}>
                <TeamMember image={member.icon} title={member.role} name={member.name}/>
              </Grid>
            ))}
          </Grid>
        </Stack>

      </Container>
    </Box>
  );
}


export default About;
