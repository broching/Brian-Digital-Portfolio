import React from 'react';
import { Box } from '@mui/material';

function ImageCard({ imageSrc }) {
    return (
        <Box sx={{ margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 1, overflow: 'hidden' }}>
            <img
                src={imageSrc}
                alt="image gallery"
                style={{ width: '100%', height: 'auto', maxHeight:"500px" }}
            />
        </Box>
    );
}

export default ImageCard;
