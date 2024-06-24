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
                <Box>
                    <Typography variant="h3" sx={{ mt: -1.5, mb: 1 }} gutterBottom>
                        <StarsIcon color="primary" sx={{ fontSize: 40, marginRight: 1 }} />
                        Skills
                    </Typography>
                    <Divider sx={{ backgroundColor: "#D5D5D5", width: "10%", minWidth: "200px" }} />
                    <Typography variant="body1" sx={{ mt: 2, }} paragraph>
                        Throughout my career, I have developed and honed multiple skills
                    </Typography>
                </Box>
                <Grid container spacing={4} sx={{ mt: 1 }}>
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
