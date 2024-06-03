import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';
import Divider from '@mui/material/Divider';
import SideBarAdmin from './SideBarAdmin';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StarIcon from '@mui/icons-material/Star';

const pages = ['Skills', 'Pricing', 'Blog'];
function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const { IsLoggedIn, Logout } = useAuth();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: "#383838" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {IsLoggedIn() && (
                        <>
                            <SideBarAdmin
                                items={[
                                    {
                                        name: "Skill",
                                        icon: <CategoryIcon />,
                                        children: [
                                            {
                                                name: "Create Skill",
                                                link: "skills/create",
                                                icon: <StarIcon />,
                                            },
                                            {
                                                name: "List Skills",
                                                link: "skills/listing",
                                                icon: <ListAltIcon />,
                                            },
                                        ]
                                    },
                                    {
                                        name: "Experience",
                                        icon: <CategoryIcon />,
                                        children: [
                                            {
                                                name: "Create Experience",
                                                link: "experience/create",
                                                icon: <StarIcon />,
                                            },
                                            {
                                                name: "List Experiences",
                                                link: "experience/listing",
                                                icon: <ListAltIcon />,
                                            },
                                        ]
                                    },
                                    {
                                        name: "Achievement",
                                        icon: <AssignmentIcon />,
                                        children: [
                                            {
                                                name: "Create Achievement",
                                                link: "achievement/create",
                                                icon: <StarIcon />,
                                            },
                                            {
                                                name: "List Achievement",
                                                link: "achievment/list",
                                                icon: <ListAltIcon />,
                                            },
                                        ]
                                    },
                                ]}
                            />

                        </>
                    )}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YUK
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    component={Link}
                                    to={`/${page.toLowerCase()}`}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                            {!IsLoggedIn() && (
                                <div>
                                    <Divider />
                                    <MenuItem
                                        component={Link}
                                        to="/login"
                                        onClick={handleCloseNavMenu}
                                    >
                                        <LoginIcon sx={{ mr: 1 }} />
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>
                                </div>
                            )}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YUK
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                to={`/${page.toLowerCase()}`}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {IsLoggedIn() ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem component={Link} to="/profile" onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => { Logout(); handleCloseUserMenu(); }}>
                                    <Typography textAlign="center" sx={{ color: 'red' }}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                component={Link}
                                to="/login"
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: { xs: 'none', md: 'flex' },
                                    borderRadius: '20px',
                                    padding: '12px 24px', // Increased padding for wider button
                                    fontWeight: 'bold',
                                    bgcolor: 'primary.main',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}
                                startIcon={<LoginIcon />}
                            >
                                Login
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );

}

export default NavBar;
