// SkillCard.js
import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';

function SkillCard({ title, description, imageSrc }) {
    return (
        <Card sx={{ boxShadow: 3, minHeight:"200px" }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h4" component="div">
                        {title}
                    </Typography>
                    <Box sx={{ ml: 2 }}>
                        <img
                            src={imageSrc}
                            alt={title}
                            style={{ width: '90px', height: '90px', borderRadius: '7px' }}
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SkillCard;
