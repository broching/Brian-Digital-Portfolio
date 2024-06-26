import { Container, Grid, Typography, } from '@mui/material'
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomLeftArrow, CustomRightArrow } from '../Common/CarouselArrows';
import AchievementCard from './AchievementCard';

function AchievementSlideCarousel(props) {
    const { items } = props
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
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
            removeArrowOnDeviceType={["tablet", "mobile"]}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 2,
                    partialVisibilityGutter: 40
                },
                mobile: {
                    breakpoint: {
                        max: 672,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 672
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {items.map(item => (<AchievementCard item={item} key={item.id}/>))}
        </Carousel>
    )
}

export default AchievementSlideCarousel