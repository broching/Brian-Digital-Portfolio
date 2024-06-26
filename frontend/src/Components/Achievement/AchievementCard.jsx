import { Paper, Box, Typography, Divider, Button } from '@mui/material'
import React from 'react'
import defaultImage from "../../Image/empty-default.jpg"
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import HailIcon from '@mui/icons-material/Hail';
import { Link } from 'react-router-dom';

function AchievementCard(props) {
    const { item } = props;
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 3, minWidth: "250px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" gutterBottom>{item.title}</Typography>
                    <Divider variant='fullWidth' sx={{ mb: 2, mr: 1 }} />
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }} >
                        {item.category === 'Work' && (
                            <WorkIcon color="action" />
                        )}
                        {item.category === 'Education' && (
                            <SchoolIcon color="action" />
                        )}
                        {item.category === 'Personal' && (
                            <HailIcon color="action" />
                        )}
                        <Typography variant="body1" sx={{ marginLeft: 1 }}>
                            {item.category}
                        </Typography>
                    </Box>
                </Box>
                <img src={item.imageSrc || defaultImage} alt={item.title} style={{ maxWidth: '100%', maxHeight: 100, borderRadius: "7px" }} />
            </Box>
            <Typography variant="body2" color="textSecondary">{item.description}</Typography>
            <Button component={Link} to={`/achievement/view/${item.id}`} variant="contained" sx={{ mt: 2 }}>
                View
            </Button>
        </Paper>
    )
}

export default AchievementCard