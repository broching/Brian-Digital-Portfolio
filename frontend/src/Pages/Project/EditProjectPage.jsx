import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Button, Divider, TextField, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageShowCarousel from '../../Components/Common/ImageShowCarousel';
import defaultImage from "../../Image/empty-default.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GetProjectById, UpdateProject } from '../../Services/ProjectService';
import MDEditor from '@uiw/react-md-editor';

const EditProjectPage = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFileCollection, setImageFileCollection] = useState([]);
    const [imageCollectionSrc, setImageCollectionSrc] = useState([]);
    const [imageCollectionName, setImageCollectionName] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetProjectById(id);
                formik.setFieldValue('title', res.data.title)
                formik.setFieldValue('accomplishment', res.data.accomplishment)
                formik.setFieldValue('instruction', res.data.instruction)
                formik.setFieldValue('description', res.data.description)
                formik.setFieldValue('category', res.data.category)
                formik.setFieldValue('webLink', res.data.webLink)
                formik.setFieldValue('instruction', res.data.instruction)
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
                setImageCollectionSrc(tempArray)


            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchData()
    }, [id]);
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            accomplishment: '',
            category: '',
            webLink: '',
            instruction: '',
            imageCoverFile: null,
            imageCollectionFile: []
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            accomplishment: Yup.string().required('Accomplishment is required'),
            webLink: Yup.string().required(),
            instruction: Yup.string().required(),
            category: Yup.string().required('Category is required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('accomplishment', values.accomplishment);
            formData.append('category', values.category);
            formData.append('webLink', values.webLink)
            formData.append('instruction', values.instruction)
            formData.append('imageCoverFile', values.imageCoverFile);
            formData.append('imageCover', values.imageCover)
            for (let i = 0; i < imageFileCollection.length; i++) {
                let image = imageFileCollection[i];
                formData.append('imageCollectionFile', image);
            }
            for (let i = 0; i < imageCollectionName.length; i++) {
                let name = imageCollectionName[i];
                formData.append('imageCollection', name);
            }
            try {
                UpdateProject(id, formData, navigate);
            } catch (error) {
                toast.error('Failed to update project');
            }
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('imageCoverFile', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const removeImageCollection = (image) => {
        setImageFileCollection(prevList => prevList.filter(x => x.name != image.imageAlt))
    }

    const handleAdditionalImagesChange = (e) => {
        const file = e.target.files[0];
        if (!file)
            return;
        const newItem = {
            imageSrc: URL.createObjectURL(file),
            imageAlt: file.name,
        }
        setImageFileCollection(prevList => [...prevList, file]);
        setImageCollectionSrc(prevList => [...prevList, newItem]);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <ArrowBackIcon
                        fontSize="large"
                        onClick={() => navigate("/project/listing")}
                        sx={{ cursor: 'pointer', mr: 2 }}
                    />
                    <Typography variant="h4">Update Your Project</Typography>
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
                                label="WebLink"
                                name="webLink"
                                value={formik.values.webLink}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.webLink && Boolean(formik.errors.webLink)}
                                helperText={formik.touched.webLink && formik.errors.webLink}
                                multiline
                                rows={1}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Instruction"
                                name="instruction"
                                value={formik.values.instruction}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.instruction && Boolean(formik.errors.instruction)}
                                helperText={formik.touched.instruction && formik.errors.instruction}
                                multiline
                                rows={1}
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
                                <MenuItem value="Personal">Personal</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="Md-Container">
                                <MDEditor
                                    value={formik.values.accomplishment}
                                    onChange={(content) => {
                                        formik.setFieldValue("accomplishment", content);
                                    }}
                                    textareaProps={{
                                        placeholder: 'Please enter accomplishments',
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Gallery
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageShowCarousel
                                items={imageCollectionSrc}
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
                            {formik.values.imageCollectionFile.length > 0 && (
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
                            Update Project
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default EditProjectPage;
