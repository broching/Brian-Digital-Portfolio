import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Tabs, Tab, Divider, Button } from '@mui/material';
import ProjectSlideCarousel from './ProjectSlideCarousel';
import { GetAllProject } from '../../Services/ProjectService';

const ProjectSegment = () => {
    const [projects, setProjects] = useState([]);

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

    return (
        <Box>
            <Container maxWidth="xl" sx={{ marginTop: 4 }}>
                <Box>
                    <Typography variant="h3" sx={{ mt: -1.5, mb: 1 }} gutterBottom>
                        Projects
                    </Typography>
                    <Divider sx={{ backgroundColor: "#D5D5D5", width: "15%", minWidth: "200px" }} />
                    <Typography variant="body1" sx={{ mt: 2, }} paragraph>
                        Check out the projects that helped me develop my skillset and confidence as a developer.
                    </Typography>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    {projects.length > 0 ? (
                        <ProjectSlideCarousel
                            items={projects}
                        />
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
