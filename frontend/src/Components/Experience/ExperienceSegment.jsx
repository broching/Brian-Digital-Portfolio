import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Tabs, Tab, Divider, Button } from '@mui/material';
import { GetAllExperience } from '../../Services/ExperienceService';
import defaultImage from "../../Image/empty-default.jpg";
import ExperienceSlideCarousel from './ExperienceSlideCarousel';
import workingDesktop from "../../Image/experiencePortrait4.png"

const ExperienceSegment = () => {
    const [experiences, setExperiences] = useState([]);
    const [educationExperiences, setEducationExperiences] = useState([]);
    const [workExperiences, setWorkExperiences] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await GetAllExperience();
                setExperiences(response.data);
            } catch (error) {
                console.error('Failed to fetch experiences', error);
            }
        };
        fetchExperiences();
    }, []);

    useEffect(() => {
        if (experiences.length > 0) {
            setEducationExperiences(experiences.filter(exp => exp.category === 'Education'));
            setWorkExperiences(experiences.filter(exp => exp.category === 'Work'));
        }
    }, [experiences]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        if (selectedTab === 0) {
            return (
                <>
                    {educationExperiences.length > 0 ? (
                        <ExperienceSlideCarousel
                            items={educationExperiences}
                        />
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ padding: 2 }}>
                            No Education Experiences Available
                        </Typography>
                    )}
                </>
            );
        } else {
            return (
                <>
                    {workExperiences.length > 0 ? (
                        <ExperienceSlideCarousel
                            items={workExperiences}
                        />
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ padding: 2 }}>
                            No Work Experiences Available
                        </Typography>
                    )}
                </>
            );
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "#FAFAFB"
            }}>
            <Container maxWidth="xl" sx={{ marginTop: 4 }}>
                <Grid container spacing={4}>
                    <Grid
                        item xs={12} sm={12} md={4} lg={4} xl={4}
                        sx={{
                            backgroundImage: `url(${workingDesktop})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            minHeight:"550px",
                            maxHeight:"600px"

                        }}
                    >
                        <Typography variant="h3" sx={{mt:-1.5, mb: 1 }} gutterBottom>
                            Experiences
                        </Typography>
                        <Divider sx={{ backgroundColor: "#D5D5D5", width: "80%" }} />
                        <Typography variant="body1" sx={{ mt: 2,}} paragraph>
                            Gaining experience in both education and work is crucial for personal and professional growth.
                        </Typography>
                        <Typography variant="body1"paragraph>
                            It also encourages critical thinking and problem solving, here are my experiences.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>

                        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
                            <Tab label="Education" sx={{ fontSize: "1.3rem" }} />
                            <Tab label="Work" sx={{ fontSize: "1.3rem" }} />
                        </Tabs>

                        <Box sx={{ marginTop: 4 }}>
                            {renderTabContent()}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ExperienceSegment;
