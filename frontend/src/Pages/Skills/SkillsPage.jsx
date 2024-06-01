import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { GetAllSkill } from '../../Services/SkillService';
import SkillCard from '../../Components/Skill/SkillCard';

function SkillsPage() {
    const [loader, setLoader] = useState(true);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        GetAllSkill()
            .then((res) => {
                setSkills(res.data);
                setLoader(false);
            });
    }, []);

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <StarsIcon color="primary" sx={{ fontSize: 50, mr: 2 }} />
                <Typography variant="h3" component="h1" align="center" gutterBottom>
                    My Skills
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {skills.map((skill, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <SkillCard 
                            title={skill.title}
                            description={skill.description}
                            imageSrc={skill.imageSrc}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default SkillsPage;
