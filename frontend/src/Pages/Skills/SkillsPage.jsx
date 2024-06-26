import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, CircularProgress, Divider, Pagination, IconButton } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { GetAllSkill } from '../../Services/SkillService';
import SkillCard from '../../Components/Skill/SkillCard';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

function SkillsPage() {
    const [loader, setLoader] = useState(true);
    const [skills, setSkills] = useState([]);
    const [page, setPage] = useState(1);
    const skillsPerPage = 6;

    useEffect(() => {
        GetAllSkill()
            .then((res) => {
                setSkills(res.data);
                setLoader(false);
            });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * skillsPerPage;
    const endIndex = startIndex + skillsPerPage;
    const paginatedSkills = skills.slice(startIndex, endIndex);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                paddingTop: 4,
                paddingBottom: 4,
                backgroundColor: '#f5f5f5', // Light background for better contrast
            }}
        >
            <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex' }}>
                    <IconButton component={Link} to="/" sx={{ marginRight: 2 }}>
                        <ArrowBack sx={{ fontSize: "3rem" }} />
                    </IconButton>
                    <Typography variant="h3" component="h1" gutterBottom>
                        My Skills
                    </Typography>
                </Box>
                <Typography variant="h5" align='left'>
                    Check out the skills I have developed through my career
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, textAlign: "left", mt: 3 }}>
                    Throughout my professional journey, I have acquired a diverse set of skills that have helped me to
                    achieve various milestones. From technical expertise in software development to creative prowess in
                    design and innovative solutions, each skill has played a crucial role in my growth. I am constantly learning and
                    improving to keep up with the ever-evolving industry standards. Below is a showcase of some of the
                    key skills I have honed over the years.
                </Typography>
                <Divider sx={{ mb: 4 }} />
                {loader ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {paginatedSkills.map((skill, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <SkillCard
                                        title={skill.title}
                                        description={skill.description}
                                        imageSrc={skill.imageSrc}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                            <Pagination
                                count={Math.ceil(skills.length / skillsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
}

export default SkillsPage;
