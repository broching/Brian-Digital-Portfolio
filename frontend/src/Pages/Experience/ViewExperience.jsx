import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Grid, IconButton, CircularProgress, Divider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { GetExperienceById } from '../../Services/ExperienceService';
import defaultImage from "../../Image/empty-default.jpg";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBack from '@mui/icons-material/ArrowBack';
import GallerySlideCarousel from '../../Components/Common/GallerySlideCarousel';

const ViewExperience = () => {
    const { id } = useParams();
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await GetExperienceById(id);
                setExperience(response.data);
            } catch (error) {
                console.error('Failed to fetch experience', error);
            }
        };
        fetchExperience();
    }, [id]);

    if (!experience) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: 4, mb: 5 }}>
            <Box display="flex" sx={{ mt: 1, mb: 4 }}>
                <IconButton component={Link} to="/" sx={{ marginRight: 2 }}>
                    <ArrowBack sx={{ fontSize: "3rem" }} />
                </IconButton>
                <Typography variant='h3'>
                    View Experience
                </Typography>
            </Box>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Grid container spacing={2} direction={{ xs: 'column-reverse', md: 'row' }}>
                    <Grid item xs={12} sm={8} md={8}>
                        <Typography variant="h4" align="center" gutterBottom textAlign={"left"}>
                            <b>{experience.title}</b>
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <CalendarTodayIcon color="action" />
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                {new Date(experience.dateStart).toLocaleDateString()} - {new Date(experience.dateEnd).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ mt: 1 }} >
                            <Typography variant="h6" color="textSecondary" align="center" sx={{ mr: 3 }} gutterBottom textAlign={"left"}>
                                {experience.parentName}
                            </Typography>
                            {experience.category === 'Work' ? <WorkIcon color="action" /> : <SchoolIcon color="action" />}
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                {experience.category}
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: 1 }} textAlign={"left"}>
                            {experience.description}
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                            <CheckCircleIcon color="action" />
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                <strong>Accomplishments</strong>
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: 1 }} textAlign={"left"}>
                            {experience.accomplishment}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                            <img src={experience.imageCoverSrc || defaultImage} alt={experience.title} style={{ maxWidth: '100%', maxHeight: 300 }} />
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{mb:2, mt:1}} />
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Gallery
                        </Typography>
                        <GallerySlideCarousel
                            items={experience.imageCollectionSrc}
                        />
                    </Grid>
                </Grid>


            </Paper>
        </Container>
    );
};

export default ViewExperience;
