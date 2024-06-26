import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Grid, IconButton, CircularProgress, Divider } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import defaultImage from "../../Image/empty-default.jpg";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import HailIcon from '@mui/icons-material/Hail';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { GetAchievementById } from '../../Services/AchievementService';

const ViewAchievement = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await GetAchievementById(id);
                setItem(response.data);
            } catch (error) {
                console.error('Failed to fetch Item', error);
            }
        };
        fetchItem();
    }, [id]);

    if (!item) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: 4, mb: 5 }}>
            <Box display="flex" sx={{ mt: 1, mb: 4 }}>
                <IconButton component={Link} to="/" sx={{ marginRight: 2 }}>
                    <ArrowBack sx={{ fontSize: "3rem" }} />
                </IconButton>
                <Typography variant='h3'>
                    View Achievement
                </Typography>
            </Box>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Grid container spacing={2} direction={{ xs: 'column-reverse', md: 'row' }}>
                    <Grid item xs={12} sm={8} md={8}>
                        <Typography variant="h4" align="center" gutterBottom textAlign={"left"}>
                            <b>{item.title}</b>
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 1 }} >
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
                        <Typography variant="body1" sx={{ marginTop: 1 }} textAlign={"left"}>
                            {item.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                            <img src={item.imageSrc || defaultImage} alt={item.title} style={{ maxWidth: '100%', maxHeight: 300 }} />
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 2, mt: 1 }} />
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h4' gutterBottom>
                            Attachments
                        </Typography>
                        {item.attachments && item.attachments.length > 0 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {item.attachments.map((attachment, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 2,
                                            backgroundColor: '#f9f9f9',
                                            borderRadius: 1,
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        <AttachmentIcon sx={{ marginRight: 2 }} />
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                flexGrow: 1,
                                            }}
                                        >
                                            <a
                                                href={item.attachmentSrc[index]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                {attachment}
                                            </a>
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body1" color="textSecondary">
                                No attachments available.
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ViewAchievement;
