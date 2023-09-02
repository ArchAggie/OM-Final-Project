import React from "react"
import Slider from 'react-slick'
import './Carousel.css'

const CurrentProjects = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='carousel-container'>
            <h2>Current Projects</h2>
            <Slider  {...settings}>
                
                <div>
                    <h3>The Big Event</h3>
                    <img src='/images/TBE-LOGO-png-300x206.png' alt='Image 1' width='100%' />
                </div>
                <div>
                    <h3>Homer on Hands</h3>
                    <img src='/images/orange-heart.jpeg' alt='Image 2' width='100%' />
                </div>
                <div>
                    <h3>Bake Sale</h3>
                    <img src='/images/BakeSale479WDfull-web-e1561067141509.jpg' alt='Image 3' width='100%' />
                </div>
            </Slider>
        </div>
    )
}

export default CurrentProjects
