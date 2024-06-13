import { Paper, Box, Typography, Divider, Button } from '@mui/material'
import React from 'react'
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import defaultImage from "../../Image/empty-default.jpg"
import { Link } from 'react-router-dom';

function ProjectCard(props) {
    const { item } = props;
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 3, minWidth: "250px" }}>
            <Box sx={{ textAlign: 'center', display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" gutterBottom>{item.title}</Typography>
                    <Divider variant='fullWidth' sx={{ mb: 1 }} />
                </Box>
                <img src={item.imageCoverSrc || defaultImage} alt={item.title} style={{ maxWidth: '100%', maxHeight: 60, borderRadius: "7px" }} />
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }} >
                {item.category === 'Work' ? <WorkIcon color="action" /> : <SchoolIcon color="action" />}
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {item.category}
                </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">{item.description}</Typography>
            <Button component={Link} to={`/project/view/${item.id}`} variant="contained" sx={{ mt: 2 }}>
                View
            </Button>
        </Paper>
    )
}

export default ProjectCard