import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Button, Divider, TextField, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageShowCarousel from '../../Components/Common/ImageShowCarousel';
import defaultImage from "../../Image/empty-default.jpg";
import { UpdateExperience, GetExperienceById } from '../../Services/ExperienceService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditExperiencePage = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFileCollection, setImageFileCollection] = useState([]);
    const [imageCollection, setImageCollection] = useState([]);
    const [imageCollectionName, setImageCollectionName] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetExperienceById(id);
                formik.setFieldValue('title', res.data.title)
                formik.setFieldValue('accomplishment', res.data.accomplishment)
                formik.setFieldValue('description', res.data.description)
                formik.setFieldValue('parentName', res.data.parentName)
                formik.setFieldValue('category', res.data.category)
                formik.setFieldValue('dateStart', formatDate(res.data.dateStart))
                formik.setFieldValue('dateEnd', formatDate(res.data.dateEnd))
                formik.setFieldValue('imageCover', res.data.imageCover)
                formik.setFieldValue('imageCoverSrc', res.data.imageCoverSrc)
                formik.setFieldValue('imageCollection', res.data.imageCollection)
                setImagePreview(res.data.imageCoverSrc);
                setImageCollectionName(res.data.imageCollection);
                let tempArray = [];
                for (let index = 0; index < res.data.imageCollectionSrc.length; index++) {
                    const src = res.data.imageCollectionSrc[index];
                    const name = res.data.imageCollection[index]
                    const insert = {
                        imageSrc: src,
                        imageAlt: "Image Gallery",
                        imageName: name
                    }
                    tempArray.push(insert);
                }
                setImageCollection(tempArray)


                setLoading(false);
            } catch (error) {
                console.error('Error fetching skill:', error);
                setLoading(false);
            }
        };
        fetchData()
    }, [id]);

    const formatDate = (date) => {
        const d = new Date(date);
        const month = `0${d.getMonth() + 1}`.slice(-2);
        const day = `0${d.getDate()}`.slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            accomplishment: '',
            parentName: '',
            category: '',
            dateStart: '',
            dateEnd: '',
            imageFile: null,
            imageFileCollection: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            accomplishment: Yup.string().required('Accomplishment is required'),
            parentName: Yup.string().required('Parent Name is required'),
            category: Yup.string().required('Category is required'),
            dateStart: Yup.date().required('Start Date is required'),
            dateEnd: Yup.date().required('End Date is required'),
            imageFileCollection: Yup.array()
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('accomplishment', values.accomplishment);
            formData.append('parentName', values.parentName);
            formData.append('category', values.category);
            formData.append('dateStart', values.dateStart);
            formData.append('dateEnd', values.dateEnd);
            formData.append('imageFile', values.imageFile);
            formData.append('imageCover', values.imageCover)
            for (let i = 0; i < imageFileCollection.length; i++) {
                let image = imageFileCollection[i];
                formData.append('imageFileCollection', image);
            }
            for (let i = 0; i < imageCollectionName.length; i++) {
                let name = imageCollectionName[i];
                formData.append('imageCollection', name);
            }
            try {
                UpdateExperience(id, formData, navigate);
            } catch (error) {
                toast.error('Failed to create experience');
            }
        }
    });

    const removeImageCollection = (name) => {
        setImageCollectionName(imageCollectionName.filter(x => x != name.imageName));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('imageFile', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAdditionalImagesChange = (e) => {
        const file = e.target.files[0];
        if (!file)
            return;
        const newItem = {
            imageSrc: URL.createObjectURL(file),
            iamgeAlt: file.name,
        }
        setImageFileCollection(prevList => [...prevList, file]);
        setImageCollection(prevList => [...prevList, newItem]);
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
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <ArrowBackIcon
                        fontSize="large"
                        onClick={() => navigate("/experience/listing")}
                        sx={{ cursor: 'pointer', mr: 2 }}
                    />
                    <Typography variant="h4">Update Your Experience</Typography>
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
                                label="Parent Name"
                                name="parentName"
                                value={formik.values.parentName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.parentName && Boolean(formik.errors.parentName)}
                                helperText={formik.touched.parentName && formik.errors.parentName}
                                required
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Start Date"
                                name="dateStart"
                                type="date"
                                value={formik.values.dateStart}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.dateStart && Boolean(formik.errors.dateStart)}
                                helperText={formik.touched.dateStart && formik.errors.dateStart}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="End Date"
                                name="dateEnd"
                                type="date"
                                value={formik.values.dateEnd}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.dateEnd && Boolean(formik.errors.dateEnd)}
                                helperText={formik.touched.dateEnd && formik.errors.dateEnd}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                sx={{ mt: 2 }}
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
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Accomplishment"
                                name="accomplishment"
                                value={formik.values.accomplishment}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.accomplishment && Boolean(formik.errors.accomplishment)}
                                helperText={formik.touched.accomplishment && formik.errors.accomplishment}
                                required
                                multiline
                                rows={4}
                                sx={{ mt: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Gallery
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageShowCarousel
                                items={imageCollection}
                                removeImageCollection={removeImageCollection}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mt: 2 }}
                            >
                                Upload Image Collection
                                <input
                                    type="file"
                                    name="imageFileCollection"
                                    hidden
                                    multiple
                                    onChange={handleAdditionalImagesChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Button>
                            {formik.values.imageFileCollection.length > 0 && (
                                <Box sx={{ mt: 1 }}>
                                    {Array.from(formik.values.imageFileCollection).map((file, index) => (
                                        <Typography key={index} variant="body2">
                                            {file.name}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                            {formik.touched.imageFileCollection && formik.errors.imageFileCollection && (
                                <Typography variant="body2" color="error">
                                    {formik.errors.imageFileCollection}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Update Experience
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default EditExperiencePage;
