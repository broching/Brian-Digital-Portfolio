import React from 'react';
import { Typography, Link, Container, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "#383838",
                color: "#fff",
                padding: "20px 0",
                textAlign: "center",
                position: "fixed",
                bottom: 0,
                width: "100%",
                zIndex: 1000,
            }}
        >
            <Container maxWidth="md">
                <Typography variant="body1" color="inherit">
                    © {new Date().getFullYear()} Brian Yuk Ka Chyun
                </Typography>
                <Typography variant="body2" color="inherit">
                    Built with React.js and .NET CORE
                </Typography>
                <div>
                    <IconButton href="https://www.instagram.com/broching_/" target="_blank" rel="noopener">
                        <InstagramIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/brian-yuk-061b802a2/" target="_blank" rel="noopener">
                        <LinkedInIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton href="mailto:brianyuk@gmail.com">
                        <MailIcon style={{ color: "#fff" }} />
                    </IconButton>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
