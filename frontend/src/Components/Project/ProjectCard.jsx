import { Paper, Box, Typography, Divider, Button } from '@mui/material'
import React from 'react'
import defaultImage from "../../Image/empty-default.jpg"
import { Link } from 'react-router-dom';

function ProjectCard(props) {
    const { item } = props;
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 3, minWidth: "250px" }}>
            <Box sx={{ textAlign: 'center', display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" gutterBottom>{item.title}</Typography>
                    <Divider variant='fullWidth' sx={{ mb: 2 }} />
                </Box>
                <img src={item.imageCoverSrc || defaultImage} alt={item.title} style={{ maxWidth: '100%', maxHeight: 60, borderRadius: "7px" }} />
            </Box>
            <Typography variant="body2" color="textSecondary">{item.description}</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "left", mt: 1 }}><strong>Accomplishments</strong></Typography>
            <Typography variant="body2" color="textSecondary"> {item.accomplishment}</Typography>
            <Button component={Link} to={`/project/view/${item.id}`} variant="contained" sx={{ mt: 2 }}>
                View
            </Button>
        </Paper>
    )
}

export default ProjectCard