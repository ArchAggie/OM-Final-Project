import React from "react"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Carousel.css'

const PhotoCompOne = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='carousel'>
        <h2>Volunteers at Work!</h2>
            <Slider  {...settings}>
                <div>
                    <img src='/images/Team Depot Approved Photo 1.jpeg' alt='Image 1' width='100%' />
                </div>
                <div>
                    <img src='/images/Team Depot Approved Photo 6.jpeg' alt='Image 2' width='100%' />
                </div>
                <div>
                    <img src='/images/Team Depot Approved Photo 14.JPG' alt='Image 3' width='100%' />
                </div>
                <div>
                    <img src='/images/Team Depot Approved Photo 5.JPG' alt='Image 4' width='100%' />

                </div>
            </Slider>
        </div>
    );
};

export default PhotoCompOne
