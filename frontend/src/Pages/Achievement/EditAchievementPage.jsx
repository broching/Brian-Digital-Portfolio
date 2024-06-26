import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Button, Divider, TextField, MenuItem, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import defaultImage from "../../Image/empty-default.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { CreateNewAchievement, GetAchievementById, UpdateAchievement } from '../../Services/AchievementService';

function EditAchievementPage() {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [attachmentFileCollection, setAttachmentFileCollection] = useState([]);
    const [attachment, setAttachment] = useState([]);
    const [attachmentName , setAttachmentName] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetAchievementById(id);
                formik.setFieldValue('title', res.data.title)
                formik.setFieldValue('description', res.data.description)
                formik.setFieldValue('category', res.data.category)
                formik.setFieldValue('image', res.data.image)
                formik.setFieldValue('imageSrc', res.data.imageSrc)
                setImagePreview(res.data.imageSrc);
                setAttachmentName(res.data.attachments);
                setAttachment(res.data.attachments);
                let tempArray = [];
                for (let index = 0; index < res.data.attachmentSrc.length; index++) {
                    const src = res.data.attachmentSrc[index];
                    const name = res.data.attachments[index]
                    const insert = {
                        fileSrc: src,
                        fileName: name,
                    }
                    tempArray.push(insert);
                }
                setAttachment(tempArray)


            } catch (error) {
                console.error('Error fetching Items:', error);
            }
        };
        fetchData()
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: '',
            image: '',
            attachment: [],
            imageFile: null,
            attachmentFile: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            category: Yup.string().required('Category is required'),
            attachmentFile: Yup.array()
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('image', values.image)
            formData.append('imageFile', values.imageFile);
            attachmentName.forEach(item => {
                formData.append('attachments', item)
            });
            for (let i = 0; i < attachmentFileCollection.length; i++) {
                let file = attachmentFileCollection[i];
                formData.append('attachmentFiles', file);
            }
            try {
                UpdateAchievement(id, formData, navigate)
            } catch (error) {
                console.log(error)
                toast.error('Failed to Update Achievement');
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
        setAttachmentName(attachmentName.filter(x => x != file.fileName));
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
                        onClick={() => navigate("/achievement/listing")}
                        sx={{ cursor: 'pointer', mr: 2 }}
                    />
                    <Typography variant="h4">Update Your Achievement</Typography>
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
                            Update Achievement
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default EditAchievementPage;
