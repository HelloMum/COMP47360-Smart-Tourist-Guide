import React from 'react';
import './About.css';
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
    icon:"images/about/icon_1.png",
    title: "Wide Selection of Activities",
    description: "Browse through and select from numerous tourist attractions and events in Manhattan, New York "
  },
  {
    icon:"images/about/icon_2.png",
    title: "Ideal Planning",
    description: "Access your personalized schedule with ideal timings to avoid busyness and other inconveniences"
  },
  {
    icon:"images/about/icon_3.png",
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
  width: '320px',
  height: '350px',
  // margin: '0 auto',
  padding:'20px'
}));

// ---------- static information about team members ----------
const TeamIcons = [
  {
    icon:"images/avatar/nathan.jpg",
    role:"Data Lead",
    name:"Nathan Power"
  },
  {
    icon:"images/avatar/mutu.jpg",
    role:"Coordination Lead",
    name:"Mustafa Tugrul Yilmaz"
  },
  {
    icon:"images/avatar/sha.jpg",
    role:"Frontend Code Lead",
    name:"Sha Luo"
  },
  {
    icon:"images/avatar/zack.jpg",
    role:"Customer Lead",
    name:"Maxim Zack Istasse"
  },
  {
    icon:"images/avatar/boyu.jpg",
    role:"Backend Code Lead",
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
    <Box >
      <Box sx={{ px: '9%' }}>
        {/* ---------- Stack containing information about our service ---------- */}
        <Stack direction="column" alignItems="flex-start"  spacing={1}  sx={{ mt: '80px' }}> 
          <SectionTitle variant="h2" >
            Our Service
          </SectionTitle>
          {/* <SectionDescription variant="body1"  style={{  marginLeft: '2vw',}}>
          TourWise takes the hassle out of planning your trip to New York City. Effortlessly explore curated activities in Manhattan based on your interests, whether it’s sightseeing, dining, shopping, or cultural experiences.
<br/><br/>
Our advanced algorithm creates a personalized itinerary for you, ensuring optimal times for each activity to avoid crowds. Each day, TourWise provides a detailed map with your planned activities and directions.With TourWise, travel planning is stress-free, turning your trip into a seamless and enjoyable experience.
          </SectionDescription> */}
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

        

      </Box>


      <Box sx={{ 
        // backgroundColor:'orange',
        height:'50px',
        mt:'40px' }}>
        <Divider/>
          </Box>
    </Box>
  );
}


export default About;
