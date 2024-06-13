import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Box, Typography } from '@mui/material'

export default function ImageCarousel({ items }) {
    return (
        <Carousel
        sx={{width:"100%"}}
        >
            {
                items?.map((item, i) => 
                <Paper
                key={i}
                sx={{width:"100%"}}
                >
                    <Box
                        component="img"
                        sx={{
                            height:'500px',
                            display: 'block',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        src={item.src}
                        alt={item.alt}
                    />
                    <Typography
                    variant='h7'
                    >
                        {item.description}
                    </Typography>
                </Paper>
                )
            }
        </Carousel>
    )
}
