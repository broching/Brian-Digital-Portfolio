import { Paper, Box, Typography, Divider, Button } from '@mui/material'
import React from 'react'
import defaultImage from "../../Image/empty-default.jpg"
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';

function ExperienceCard(props) {
    const { experience } = props;
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 3, minWidth: "250px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" gutterBottom>{experience.title}</Typography>
                    <Divider variant='fullWidth' sx={{ mb: 2, mr: 1 }} />
                    <Box sx={{display:"flex"}}>
                        {experience.category === 'Work' && (
                            <WorkIcon color="action" />
                        )}
                        {experience.category === 'Education' && (
                            <SchoolIcon color="action" />
                        )}
                        <Typography variant="body1" sx={{ marginLeft: 1 }}>
                            {experience.category}
                        </Typography>
                    </Box>
                </Box>
                <img src={experience.imageCoverSrc || defaultImage} alt={experience.title} style={{ maxWidth: '100%', maxHeight: 100, borderRadius: "7px" }} />
            </Box>
            <Typography variant="body2" color="#1976d2">{new Date(experience.dateStart).toLocaleDateString()} - {new Date(experience.dateEnd).toLocaleDateString()}</Typography>
            <Typography variant="h7" color="black"> {experience.parentName}</Typography>
            <Typography variant="body2" color="textSecondary">{experience.description}</Typography>
            <Button component={Link} to={`/experience/view/${experience.id}`} variant="contained" sx={{ mt: 2 }}>
                View
            </Button>
        </Paper>
    )
}

export default ExperienceCard