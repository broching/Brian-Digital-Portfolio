import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Card, CardContent, Avatar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { object, string } from 'yup';
import { useAuth } from '../Context/useAuth';
import { toast } from 'react-toastify';


function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const { LoginUser } = useAuth();

    const userSchema = object({
        email: string().email().required(),
        password: string().required(),
    });

    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        userSchema.validate(formData)
            .then(() => {
                // Form data is valid, you can submit it or perform further actions

                LoginUser(formData.email, formData.password)

                setErrorMessage(null);
            })
            .catch((error) => {
                // Form data is invalid, handle validation errors
                setErrorMessage(error.errors[error.errors.length - 1])
            });
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8,
                }}
            >
                <Card sx={{ width: '100%', boxShadow: 3, padding: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                                <AccountCircleIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                        </Box>
                        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
                            {errorMessage && (
                                <Alert
                                    severity="error"
                                    onClose={() => { setErrorMessage(null) }}
                                >
                                    {errorMessage}
                                </Alert>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={onFormChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={onFormChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default LoginPage;
