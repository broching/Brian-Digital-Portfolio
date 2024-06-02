import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Button, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import StarsIcon from '@mui/icons-material/Stars';
import Pagination from '@mui/material/Pagination';
import SkillCard from '../Skill/SkillCard';

function AchievementSegment({ skillList }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [page, setPage] = useState(1);
    const [skillsPerPage, setSkillsPerPage] = useState(3);

    useEffect(() => {
        if (isSmallScreen)
            setSkillsPerPage(2);
        else
            setSkillsPerPage(3);

    }, [isSmallScreen]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * skillsPerPage;
    const endIndex = startIndex + skillsPerPage;
    const paginatedSkills = skillList.slice(startIndex, endIndex);

    return (
        <Box
            sx={{
                minHeight: '60vh',
                paddingTop: 4,
                paddingBottom: 4,
                color: 'black',
                display: 'flex',
                backgroundColor:"#f5f5f5",
                justifyContent: 'center',
            }}
        >
            <Container>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <StarsIcon color="primary" sx={{ fontSize: 50, mr: 2, mb: 2 }} />
                    <Typography variant="h3" component="h1" gutterBottom align="center">
                        My Achievements
                    </Typography>
                </Box>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Throughout the course of my life, I have picked up multiple skills.
                </Typography>
                <Divider />
                <Grid container spacing={4} sx={{ mt: 3 }}>
                    {paginatedSkills.map((skill) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={skill.id}>
                            <SkillCard
                                title={skill.title}
                                description={skill.description}
                                imageSrc={skill.imageSrc}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Pagination
                        count={Math.ceil(skillList.length / skillsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </Box>
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

export default AchievementSegment;
