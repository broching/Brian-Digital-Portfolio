import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Button, Divider, TextField, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import defaultImage from "../../Image/empty-default.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { CreateNewAchievement } from '../../Services/AchievementService';

function CreateAchievement() {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [attachmentFileCollection, setAttachmentFileCollection] = useState([]);
    const [attachment, setAttachment] = useState([]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: '',
            imageFile: null,
            attachmentFile: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            category: Yup.string().required('Category is required'),
            imageFile: Yup.mixed().required('Image File is required'),
            attachmentFile: Yup.array()
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('imageFile', values.imageFile);
            for (let i = 0; i < attachmentFileCollection.length; i++) {
                let file = attachmentFileCollection[i];
                formData.append('attachmentFiles', file);
            }
            try {
                CreateNewAchievement(formData, navigate)
            } catch (error) {
                console.log(error)
                toast.error('Failed to create Achievement');
            }
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('imageFile', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeAttachment = (file) => {
        setAttachmentFileCollection(prevList => prevList.filter(x => x.name !== file.fileName));
        setAttachment(prevList => prevList.filter(x => x.fileName !== file.fileName));
    }

    const handleAttachmentChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const newItem = {
            fileSrc: URL.createObjectURL(file),
            fileName: file.name,
        }
        setAttachmentFileCollection(prevList => [...prevList, file]);
        setAttachment(prevList => [...prevList, newItem]);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <ArrowBackIcon
                        fontSize="large"
                        onClick={() => navigate("/experience/listing")}
                        sx={{ cursor: 'pointer', mr: 2 }}
                    />
                    <Typography variant="h4">Add Your Achievement</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                required
                                multiline
                                rows={2}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                                required
                                sx={{ mt: 2 }}
                            >
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Education">Education</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
                                ) : (
                                    <img src={defaultImage} alt="Default Image" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 16 }} />
                                )}
                                {formik.values.imageFile && (
                                    <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                                        {formik.values.imageFile.name}
                                    </Typography>
                                )}
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                >
                                    Upload Image Cover
                                    <input
                                        type="file"
                                        name="imageFile"
                                        hidden
                                        onChange={handleImageChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </Button>
                                {formik.touched.imageFile && formik.errors.imageFile && (
                                    <Typography variant="body2" color="error">
                                        {formik.errors.imageFile}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Attachments
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {attachment.map((file, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                border: '1px solid #ddd',
                                                borderRadius: 1,
                                                p: 2,
                                                mb: 2,
                                                backgroundColor: '#f9f9f9',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', width: "90%" }}>
                                                <AttachmentIcon sx={{ mr: 2 }} />
                                                <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    <a href={file.fileSrc} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        {file.fileName}
                                                    </a>
                                                </Typography>
                                            </Box>
                                            <IconButton onClick={() => removeAttachment(file)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mt: 2 }}
                            >
                                Upload Attachment
                                <input
                                    type="file"
                                    name="attachmentCollection"
                                    hidden
                                    multiple
                                    onChange={handleAttachmentChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Create Achievement
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default CreateAchievement;
