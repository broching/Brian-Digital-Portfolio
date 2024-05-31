import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Card, CardContent, Avatar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { object, string } from 'yup';
import { useAuth } from '../Context/useAuth';

function AddUser() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const { RegisterUser } = useAuth();

    const userSchema = object({
        firstName: string().required("First Name is required"),
        lastName: string().required("Last Name is required"),
        email: string().email("Invalid email").required("Email is required"),
        password: string()
            .required("Password is required")
            .min(12, "Password must be at least 12 characters long")
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
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
                RegisterUser(formData.firstName, formData.lastName, formData.email, formData.password);
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
                                Register
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
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="first-name"
                                autoFocus
                                value={formData.firstName}
                                onChange={onFormChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="last-name"
                                value={formData.lastName}
                                onChange={onFormChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                                Register
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default AddUser;
