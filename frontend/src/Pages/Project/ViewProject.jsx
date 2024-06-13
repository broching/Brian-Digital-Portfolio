import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Grid, IconButton, CircularProgress, Divider, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import defaultImage from "../../Image/empty-default.jpg";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBack from '@mui/icons-material/ArrowBack';
import GallerySlideCarousel from '../../Components/Common/GallerySlideCarousel';
import { GetProjectById } from '../../Services/ProjectService';

const ViewProject = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await GetProjectById(id);
                setProject(response.data);
            } catch (error) {
                console.error('Failed to fetch experience', error);
            }
        };
        fetchProject();
    }, [id]);

    if (!project) {
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
                    View Project
                </Typography>
            </Box>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Grid container spacing={2} direction={{ xs: 'column-reverse', md: 'row' }}>
                    <Grid item xs={12} sm={8} md={8}>
                        <Typography variant="h4" align="center" gutterBottom textAlign={"left"}>
                            <b>{project.title}</b>
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 1 }} >
                            {project.category === 'Work' ? <WorkIcon color="action" /> : <SchoolIcon color="action" />}
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                {project.category}
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: 1 }} textAlign={"left"}>
                            {project.description}
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                            <CheckCircleIcon color="action" />
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                <strong>Accomplishments</strong>
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ marginTop: 1 }} textAlign={"left"}>
                            {project.accomplishment}
                        </Typography>
                        <Button component={Link} to={`${project.webLink}`} variant="contained" sx={{ mt: 2, mb:2 }}>
                            View
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                            <img src={project.imageCoverSrc || defaultImage} alt={project.title} style={{ maxWidth: '100%', maxHeight: 300 }} />
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 2, mt: 1 }} />
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Gallery
                        </Typography>
                        <GallerySlideCarousel
                            items={project.imageCollectionSrc}
                        />
                    </Grid>
                </Grid>


            </Paper>
        </Container>
    );
};

export default ViewProject;
