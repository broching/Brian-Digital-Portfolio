import React from 'react';
import { Typography, Link, Container, IconButton, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#383838",
                color: "#fff",
                padding: "20px 0",
                mt: "auto",
            }}
        >
            <Container maxWidth="md" sx={{ textAlign: "center" }}>
                <Typography variant="body1" color="inherit">
                    © {new Date().getFullYear()} Brian Yuk Ka Chyun
                </Typography>
                <Typography variant="body2" color="inherit">
                    Built with React.js and .NET CORE
                </Typography>
                <Box>
                    <IconButton href="https://www.instagram.com/broching_/" target="_blank" rel="noopener">
                        <InstagramIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com/in/brian-yuk-061b802a2/" target="_blank" rel="noopener">
                        <LinkedInIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton href="mailto:brianyuk@gmail.com">
                        <MailIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton href="tel:+88519761" aria-label="Phone">
                        <PhoneIcon style={{ color: "#fff" }} />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
