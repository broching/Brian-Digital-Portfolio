import { Paper, Box, Typography, Divider, Button } from '@mui/material'
import React from 'react'
import defaultImage from "../../Image/empty-default.jpg"

function ExperienceCard(props) {
    const { experience } = props;
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 3, minWidth:"250px" }}>
            <Box sx={{ textAlign: 'center' }}>
                <img src={experience.imageCoverSrc || defaultImage} alt={experience.title} style={{ maxWidth: '100%', maxHeight: 120, borderRadius: "7px" }} />
            </Box>
            <Typography variant="h6" gutterBottom>{experience.title}</Typography>
            <Divider variant='fullWidth' sx={{ mb: 2, width: "25%" }} />
            <Typography variant="body2" color="#1976d2">{new Date(experience.dateStart).toLocaleDateString()} - {new Date(experience.dateEnd).toLocaleDateString()}</Typography>
            <Typography variant="h7" color="black"> {experience.parentName}</Typography>
            <Typography variant="body2" color="textSecondary">{experience.description}</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left", mt: 1 }}><strong>Accomplishments</strong></Typography>
            <Typography variant="body2" color="textSecondary"> {experience.accomplishment}</Typography>
            <Button LinkComponent="/test" variant="contained" sx={{ mt: 2 }}>
                View
            </Button>
        </Paper>
    )
}

export default ExperienceCard