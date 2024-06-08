import React from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button as ChakraButton, Box } from '@chakra-ui/react';

interface EventCardProps {
  image: string;
  name: string;
  time: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, name, time, location }) => {
  return (
    <Box width={{ base: '100%', sm: '40%', md: '60%' }} margin="auto" my={4}>
      <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={image}
          alt={name}
        />
        <Stack>
          <CardBody>
            <Heading size="md">{name}</Heading>
            <Text py="2">{time}</Text>
            <Text py="2">{location}</Text>
          </CardBody>
          <CardFooter>
            <ChakraButton variant="solid" colorScheme="blue">
              More Info
            </ChakraButton>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
};

export default EventCard;
