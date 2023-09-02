import React from "react"
import Slider from 'react-slick'
import './Carousel.css'

const FAQ = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='carousel'>
        <h2>FAQ</h2>
            <Slider  {...settings}>
                <div>
                    <h3 id='faq-text'>Question:  How do I sign up to volunteer at Home Depot?</h3>
                    <h4 id='faq-text'>Answer:  You can sign up to volunteer with The Home Depot through the "Volunteer" button located at the top of this page.</h4>
                </div>
                <div>
                    <h3 id='faq-text'>Question:  What types of volunteer opportunities are available with The Home Depot?</h3>
                    <h4 id='faq-text'>Answer:  The Home Depot has many different volunteering teams of varying specializations that allow associates such as yourself to give back to their communities in a large variety of ways, including everything from picking up trash to construction projects (depending on availability).</h4>
                </div>
                <div>
                    <h3 id='faq-text'>Question:  What are the requirements for volunteering with The Home Depot?</h3>
                    <h4 id='faq-text'>Answer:  All that is required from you is valid personal and contact information given in the sign up form, a valid ID on the day, and at the location of your chosen project. Beyond that, just a willingness to give back to your community.</h4>
                </div>
                <div>
                    <h3 id='faq-text'>Question:  Can I volunteer as part of a group or team?</h3>
                    <h4 id='faq-text'>Answer:  Upon our communication with your after you sign up, you can request to be placed with other associates from your department within the store, but all volunteering teams are formed from within each respective store. However, there is a possiblity of being paired up with others from a different store.</h4>
                </div>
                <div>
                    <h3 id='faq-text'>Question:  What kind of training or orientation will I receive as a The Home Depot volunteer?</h3>
                    <h4 id='faq-text'>Answer:  The Home Depot will only place you on volunteering teams for which you already have the experience required to complete the projects given. All safety SOPs that are required within the store will be required while on site for the project.</h4>
                </div>
                <div>
                    <h3 id='faq-text'>Question:  Is there an age requirement to volunteer with The Home Depot?</h3>
                    <h4 id='faq-text'>Answer:  All age requirements to be employed by The Home Depot are the same as volunteering with The Home Depot.</h4>
                </div>
            </Slider>
        </div>
    )
}

export default FAQ
