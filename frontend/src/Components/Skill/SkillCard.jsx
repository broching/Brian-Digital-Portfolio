// SkillCard.js
import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

function SkillCard({ title, description, imageSrc }) {
    return (
        <Card sx={{ boxShadow: 3, minHeight: "200px", margin: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div">
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
                <div className="Md-Container">
                    <MDEditor.Markdown source={description} style={{ whiteSpace: 'pre-wrap' }} />
                </div>
            </CardContent>
        </Card>
    );
}

export default SkillCard;
