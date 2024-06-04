import React from 'react';
import { Container, Box, Typography, Grid, Divider } from '@mui/material';
import ImageCarousel from './Common/ImageCarousel';
import shawGroupPhoto from '../Image/shawGroupPhoto.jpg';
import basketballTeam from '../Image/basketballTeam.jpg';
import bjjComp from '../Image/bjjComp.jpeg';
import InfoIcon from '@mui/icons-material/Info';
import FaceIcon from '@mui/icons-material/Face';

const images = [
    { src: bjjComp, alt: 'Image 1', description: 'Brazilian Jiu-jitsu Competition' },
    { src: basketballTeam, alt: 'Image 2', description: 'Basketball Competition Huddle' },
    { src: shawGroupPhoto, alt: 'Shaw Group Photo', description: 'Birthday Party During Shaw Internship' },
];

function AboutMeSegment() {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '40vh',
                paddingTop: 4,
                paddingBottom: 4,
                color: 'black',
                backgroundColor: '#FAFAFB',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ width: '90%' }}>
                <Grid
                    container
                    spacing={6}
                    alignItems="center"
                    direction={{ xs: 'column-reverse', md: 'row' }}
                >
                    <Grid item xs={12} md={6} lg={7} xl={7}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <ImageCarousel items={images} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5} xl={5}>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <FaceIcon
                            sx={{mt:1, mr:2, fontSize:"2.6rem"}}
                            />
                            <Typography variant="h3" component="h1" gutterBottom align="center">
                                About Me
                            </Typography>
                        </div>
                        <Divider sx={{  mb: 2 }} />
                        <Typography variant="body1" paragraph align="justify">
                            Hi, I'm Brian Yuk Ka Chyun, a passionate and dedicated Developer. With a love for Full Stack Development, I have honed my skills in many languages and frameworks like React.Js, Node.js and many more.
                        </Typography>
                        <Typography variant="body1" paragraph align="justify">
                            I believe in continuous learning and staying updated with the latest trends in the industry. My journey so far has been fueled by a relentless pursuit of knowledge and a desire to make a positive impact through my work.
                        </Typography>
                        <Typography variant="body1" paragraph align="justify">
                            When I'm not working, I enjoy playing Sports and spending time with friends and family. These activities help me maintain a healthy work-life balance and keep me motivated.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default AboutMeSegment;
