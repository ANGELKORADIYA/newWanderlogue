import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import './aboutus.css';

const AboutUs = () => {
  const features = [
    {
      title: "Accommodation Guide",
      description: "Find the perfect place to stay - from luxury hotels to cozy hostels and local homestays. We provide detailed reviews, pricing information, and booking assistance."
    },
    {
      title: "Local Experiences",
      description: "Discover hidden gems and authentic local experiences. Our community shares insider tips about must-visit spots, cultural events, and off-the-beaten-path adventures."
    },
    {
      title: "Transportation Tips",
      description: "Navigate like a pro with our comprehensive transportation guides. Learn about local transit options, best routes, and money-saving travel hacks."
    },
    {
      title: "Food & Dining",
      description: "Explore local cuisines and find the best restaurants, street food, and culinary experiences in your destination."
    },
    {
      title: "Activities & Tours",
      description: "Browse and book recommended activities, guided tours, and unique experiences curated by fellow travelers."
    },
    {
      title: "Travel Safety",
      description: "Stay informed about travel safety tips, local customs, and essential information to ensure a smooth journey."
    }
  ];

  return (
    <Box className="about-us">
      <Typography variant="h2" component="h1" gutterBottom>
        About Wanderlogue
      </Typography>
      
      <Typography variant="h5" component="div" gutterBottom sx={{ my: 4 }}>
        Your Complete Travel Companion
      </Typography>

      <Typography variant="body1" paragraph>
        Wanderlogue is more than just a travel blog platform - it's your comprehensive travel companion. 
        We bring together travelers from around the world to share their experiences, tips, and insights, 
        helping you plan and execute your perfect journey.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card className="feature-card">
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          How We Help You Travel Better
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform connects you with a global community of travelers who share detailed posts about their journeys,
          including where to stay, how to get around, what to eat, and what to experience. Each post includes practical
          information about accommodations, transportation options, and local tips to help you plan your trip effectively.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body1">
          Whether you're planning your next adventure or want to share your travel experiences,
          Wanderlogue is your platform to connect, learn, and inspire. Sign up today to become
          part of our growing community of passionate travelers.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
