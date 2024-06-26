import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Tabs, Tab, Divider, Button } from '@mui/material';
import { GetAllExperience } from '../../Services/ExperienceService';
import defaultImage from "../../Image/empty-default.jpg";
import ExperienceSlideCarousel from './AchievementSlideCarousel';
import workingDesktop from "../../Image/experiencePortrait4.png"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import presentation from "../../Image/outstandingPresentation2.jpg"
import { GetAllAchievement } from '../../Services/AchievementService';
import AchievementSlideCarousel from './AchievementSlideCarousel';

const AchievementSegment = () => {
    const [items, setItems] = useState([]);
    const [educationItems, setEducationItems] = useState([]);
    const [workItems, setWorkItems] = useState([]);
    const [personalItems, setPersonalItems] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await GetAllAchievement();
                setItems(response.data);
            } catch (error) {
                console.error('Failed to fetch items', error);
            }
        };
        fetchExperiences();
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            setEducationItems(items.filter(x => x.category === 'Education'));
            setWorkItems(items.filter(x => x.category === 'Work'));
            setPersonalItems(items.filter(x => x.category === 'Personal'));
        }
    }, [items]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        if (selectedTab === 0) {
            return (
                <>
                    {workItems.length > 0 ? (
                        <AchievementSlideCarousel
                            items={workItems}
                        />
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ padding: 2 }}>
                            No Work Achievements Available
                        </Typography>
                    )}
                </>
            );
        } else if (selectedTab === 1) {
            return (
                <>
                    {educationItems.length > 0 ? (
                        <AchievementSlideCarousel
                            items={educationItems}
                        />
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ padding: 2 }}>
                            No Education Achievements Available
                        </Typography>
                    )}
                </>
            );
        }
        else if (selectedTab === 2) {
            return (
                <>
                    {personalItems.length > 0 ? (
                        <AchievementSlideCarousel
                            items={personalItems}
                        />
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ padding: 2 }}>
                            No Personal Achievements Available
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
                        item xs={12} sm={12} md={5} lg={5} xl={5}
                        sx={{
                            backgroundImage: `url(${presentation})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            minHeight: "550px",
                            maxHeight: "600px"

                        }}
                    >
                        <Typography variant="h3" sx={{ mt: -1.5, mb: 1 }} gutterBottom>
                            <EmojiEventsIcon color="primary" sx={{ fontSize: 40, marginRight: 1 }} />
                            Achievements
                        </Typography>
                        <Divider sx={{ backgroundColor: "#D5D5D5", width: "80%" }} />
                        <Typography variant="body1" sx={{ mt: 2, }} paragraph>
                            I have completed many courses and certificates, adding to my achievements
                        </Typography>
                        <Typography variant="body1" paragraph>
                            These achievements are pivitol to my success and confidence as a developer.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>

                        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
                            <Tab label="Work" sx={{ fontSize: "1.1rem" }} />
                            <Tab label="Education" sx={{ fontSize: "1.1rem" }} />
                            <Tab label="Personal" sx={{ fontSize: "1.1rem" }} />
                        </Tabs>

                        <Box sx={{ marginTop: 4 }}>
                            {renderTabContent()}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AchievementSegment;
