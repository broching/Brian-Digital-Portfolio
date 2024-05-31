import React from 'react';
import { Typography, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

function Hero(props) {
    const { profile } = props;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <Grid
                container
                style={{
                    width: '85%',
                    height: '65vh',
                }}
                spacing={0}
                alignItems="center"
            >
                <Grid
                    item
                    xs={12}
                    md={8}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography
                        variant='h5'
                        style={{
                            color: 'purple'
                        }}
                    >
                        Hello, I am
                    </Typography>
                    <Typography
                        variant='h2'
                        style={{ fontWeight: "600", marginTop: "10px" }}
                    >
                        Brian Yuk
                    </Typography>
                    <Typography
                        variant='h4'
                        style={{ fontWeight: "400", marginTop: "10px" }}
                    >
                        Full Stack Developer
                    </Typography>
                    <Typography
                        variant='h4'
                        style={{ fontWeight: "400", marginTop: "40px" }}
                    >
                        "Coding like poetry should be short and concise."
                    </Typography>
                    <div style={{ marginTop: "50px" }}>
                        <IconButton href="https://www.instagram.com/broching_/" target="_blank" rel="noopener">
                            <InstagramIcon style={{ color: "#383838", fontSize: "70px" }} />
                        </IconButton>
                        <IconButton href="https://www.linkedin.com/in/brian-yuk-061b802a2/" target="_blank" rel="noopener">
                            <LinkedInIcon style={{ color: "#383838", fontSize: "70px" }} />
                        </IconButton>
                        <IconButton href="mailto:brianyuk@gmail.com">
                            <MailIcon style={{ color: "#383838", fontSize: "70px" }} />
                        </IconButton>
                    </div>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={profile}
                        alt="profileImage"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: "500px",
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Hero;
