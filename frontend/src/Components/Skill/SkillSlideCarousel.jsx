import { Container, Grid, Typography, } from '@mui/material'
import React from 'react'
import ExperienceCard from '../Experience/ExperienceCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SkillCard from './SkillCard';

function SkillSlideCarousel(props) {
    const { items } = props
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={4000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {items.map(item => (
                <SkillCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    imageSrc={item.imageSrc}
                />))}
        </Carousel>
    )
}

export default SkillSlideCarousel