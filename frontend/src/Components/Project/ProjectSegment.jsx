import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Divider, Grid } from '@mui/material';
import ProjectSlideCarousel from './ProjectSlideCarousel';
import { GetAllProject } from '../../Services/ProjectService';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const ProjectSegment = () => {
    const [projects, setProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('work'); // Default category

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await GetAllProject();
                setProjects(response.data);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            }
        };
        fetchProjects();
    }, []);

    // Filter projects based on selected category
    const filteredProjects = projects.filter(project => project.category.toLowerCase() === selectedCategory);

    const handleTabChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    return (
        <Box>
            <Container maxWidth="xl" sx={{ marginTop: 6 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={5}>
                            <Box>
                                <Typography variant="h3" sx={{ mt: -1.5, mb: 1 }} gutterBottom>
                                    <AccountTreeIcon color="primary" sx={{ fontSize: 40, marginRight: 1 }} />
                                    Projects
                                </Typography>
                                <Divider sx={{ backgroundColor: "#D5D5D5", width: "15%", minWidth: "200px" }} />
                                <Typography variant="body1" sx={{ mt: 2 }} paragraph>
                                    Check out the projects that helped me develop my skillset and confidence as a developer.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Box>
                                <Tabs
                                    value={selectedCategory}
                                    onChange={handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                    variant='fullWidth'
                                    sx={{ marginBottom: 3 }}
                                >
                                    <Tab label="Work" value="work" sx={{ fontSize: "1.1rem" }} />
                                    <Tab label="Education" value="education" sx={{ fontSize: "1.1rem" }} />
                                    <Tab label="Personal" value="personal" sx={{ fontSize: "1.1rem" }} />
                                </Tabs>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ marginTop: 4 }}>
                    {filteredProjects.length > 0 ? (
                        <ProjectSlideCarousel items={filteredProjects} />
                    ) : (
                        <Typography variant="body1" color="textSecondary" sx={{ padding: 2 }}>
                            No Projects Available
                        </Typography>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default ProjectSegment;
