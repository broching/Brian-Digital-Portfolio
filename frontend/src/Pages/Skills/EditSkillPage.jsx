import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Box, TextField, Button, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import emptyDefault from '../../Image/empty-default.jpg';
import { UpdateSkill, GetSkillById } from '../../Services/SkillService';
import { useNavigate, useParams } from 'react-router';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MDEditor from '@uiw/react-md-editor';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(25, 'Title must be at most 25 characters'),
    description: Yup.string().required('Description is required').max(2000, 'Description must be at most 2000 characters'),
    imageSrc: Yup.string(),
});

// Define default image URL
const defaultImageUrl = emptyDefault;

function EditSkillPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetSkillById(id);
                formik.setFieldValue('title', res.data.title)
                formik.setFieldValue('description', res.data.description)
                formik.setFieldValue('image', res.data.image)
                formik.setFieldValue('imageSrc', res.data.imageSrc)

                setLoading(false);
            } catch (error) {
                console.error('Error fetching skill:', error);
                setLoading(false);
            }
        };
        fetchData()
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: '',
            imageSrc: '',
            imageFile: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            handleSubmitForm(values);
        },
    });

    const handleSubmitForm = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('image', values.image);
        formData.append('imageFile', values.imageFile);
        UpdateSkill(id, formData, navigate);
    };

    // Function to handle image preview
    const handleImagePreview = (event) => {
        formik.setFieldValue('imageFile', event.currentTarget.files[event.currentTarget.files.length - 1]);
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <ArrowBackIcon
                    fontSize="large"
                    onClick={() => navigate("/skills/listing")}
                    sx={{ cursor: 'pointer', mr: 2 }}
                />
                <Typography variant="h4">Update Your Skill</Typography>
            </Box>
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Input Your latest Details
                        </Typography>
                        <CreateIcon /> {/* Pen icon */}
                    </Box>
                    <Box
                        onSubmit={formik.handleSubmit}
                        component="form"
                    >
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Box sx={{ width: { xs: '100%', md: '70%' }, marginRight: { md: '30px' } }}>
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                    margin="normal"
                                />
                                <MDEditor
                                    value={formik.values.description}
                                    onChange={(content) => {
                                        formik.setFieldValue("description", content);
                                    }}
                                    textareaProps={{
                                        placeholder: 'Please enter description',
                                    }}
                                />
                                {/* Image upload field */}
                                <input
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={handleImagePreview}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="image">
                                    <Button variant="contained" component="span" color="primary" sx={{ mt: 2 }}>
                                        Upload Image
                                    </Button>
                                </label>
                                {formik.errors.imageFile && (
                                    <Typography variant="body2" color="error" gutterBottom sx={{ ml: 1 }}>
                                        {formik.errors.imageFile}
                                    </Typography>
                                )}
                            </Box>
                            {/* Image preview column */}
                            <Box sx={{ width: { xs: '100%', md: '30%' } }}>
                                {formik.values.imageFile ? (
                                    <img src={URL.createObjectURL(formik.values.imageFile)} alt="Preview"
                                        style={{ width: '100%', marginTop: '10px' }} />
                                ) : (
                                    <>
                                        {formik.values.imageSrc ? (
                                            <img src={formik.values.imageSrc} alt="Retrieved picture" style={{ width: '100%' }} />
                                        ) : (
                                            <img src={defaultImageUrl} alt="Default Preview" style={{ width: '100%' }} />
                                        )}
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box>
                            <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                                Update Skill
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default EditSkillPage;
