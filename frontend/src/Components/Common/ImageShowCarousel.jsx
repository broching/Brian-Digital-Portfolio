import React, { useEffect, useState } from 'react';
import { Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import defaultImage from "../../Image/empty-default.jpg";
import Carousel from 'react-material-ui-carousel';

export default function ImageShowCarousel(props) {
    const { items, removeImageCollection } = props;
    const [images, setImages] = useState([]);

    useEffect(() => {
        // If no items are provided, show default images
        if (items.length === 0) {
            setImages([
                {
                    imageSrc: defaultImage,
                    imageAlt: "Default Image",
                },
                {
                    imageSrc: defaultImage,
                    imageAlt: "Default Image",
                }
            ]);
        } else {
            setImages(items);
        }
    }, [items]);

    const handleRemoveImage = (index, image) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        removeImageCollection(image);
    };

    const renderImages = () => {
        const renderedImages = [];
        for (let i = 0; i < images.length; i += 2) {
            renderedImages.push(
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    {images.slice(i, i + 2).map((image, index) => (
                        <Paper key={index} sx={{ position: 'relative', width: "48%" }}>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleRemoveImage(i + index, image)}
                                sx={{
                                    position: 'absolute',
                                    top: '-5%',
                                    left: '50%',
                                    transform: 'translate(-50%, 50%)',
                                    zIndex: 1, // Make sure the button is above other elements
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                    },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Box
                                component="img"
                                sx={{
                                    maxHeight: '300px',
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={image.imageSrc}
                                alt={image.imageAlt}
                            />
                        </Paper>
                    ))}
                </Box>
            );
        }
        return renderedImages;
    };

    return (
        <Carousel
            sx={{ width: "100%" }}
        >
            {renderImages()}
        </Carousel>
    );
}
