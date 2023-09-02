import React from "react"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Carousel.css'

const PhotoCompTwo = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='carousel'>
        <h2>Bleeding Orange!</h2>
            <Slider  {...settings}>
                <div>
                    <img src='/images/THDF-600-4-copy.jpg' alt='Image 5' width='100%' />
                </div>
                <div>
                    <img src='/images/Team Depot Approved Photo 21.jpeg' alt='Image 6' width='100%' />
                </div>
                <div>
                    <img src='/images/Home-Depot-Donation-Request.jpg' alt='Image 7' width='100%' />
                </div>
                <div>
                    <img src='/images/DSC_0201.jpg' alt='Image 8' width='100%' />
                </div>
            </Slider>
        </div>
    );
};

export default PhotoCompTwo
