import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Button, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import SkillCard from './SkillCard';
import StarsIcon from '@mui/icons-material/Stars';
import Pagination from '@mui/material/Pagination';
import SkillSlideCarousel from './SkillSlideCarousel';

function SkillSegment({ skillList }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: '40vh',
                paddingTop: 4,
                paddingBottom: 4,
                color: 'black',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '50vh',
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <StarsIcon color="primary" sx={{ fontSize: 50, mr: 2, mb: 2 }} />
                    <Typography variant="h3" component="h1" gutterBottom align="center">
                        My Skills
                    </Typography>
                </Box>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Throughout the course of my life, I have picked up multiple skills.
                </Typography>
                <Divider />
                <Grid container spacing={4} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <SkillSlideCarousel
                            items={skillList}
                        />
                    </Grid>

                </Grid>
                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Button
                        component={Link}
                        variant="contained"
                        color="primary"
                        to="/skills"
                        startIcon={<InfoIcon />}
                    >
                        View All Skills
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default SkillSegment;
