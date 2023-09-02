import React, { useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import './footer.css'



const Footer = () => {

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="align-all-items">
          <div className="footer-items">
            <div className="footer-nav-items">
              <ul className="nav-list-top">
                  <a href="https://corporate.homedepot.com/page/about-us" className="about-us-link">   About us   </a>
                  <a href="https://ir.homedepot.com/" className="invest-relations-link">   Investor Relations   </a>
                  <a href="https://www.homedepot.ca/en/home.html" className="thd-canada-link">   THD Canada  </a>
                  <a href="https://www.homedepot.com.mx/" className="thd-mexico-link">   THD Mexico   </a>
              </ul>
              <ul className="nav-list-bottom">
                  <a href="https://careers.homedepot.com/" className="careers-link">   Careers   </a>
                  <a href="https://www.homedepot.com/c/suppliers_and_providers" className="supplier-link">   Suppliers   </a>
                  <a href="https://www.homedepot.com/privacy/privacy-and-security-statement" className="privacy-security-statement">   Privacy & Security Statement   </a>
              </ul>
            </div>
          </div>
          <div className="footer-items">
            <div className="social-nav-items">
              <div className="twitter"> 
              <a target="_blank" href="https://twitter.com/homedepot" rel="noopener">
                <TwitterIcon sx={{ fontSize: 60 }} />
                <p>  Twitter  </p>
              </a>
              </div>
              <div className="facebook">
                <a target="_blank" href="https://www.facebook.com/homedepot" rel="noopener">
                  <FacebookIcon sx={{ fontSize: 60 }} />
                  <p>  FaceBook  </p>
                </a>
                </div>
                <div className="linkedIn">
                  <a target="_blank" href="https://www.linkedin.com/company/the-home-depot/mycompany/verification/" rel="noopener">
                    <LinkedInIcon sx={{ fontSize: 60 }} />
                    <p>  LinkedIn  </p>
                  </a>
                </div>
                <div className="youtube">
                  <a target="_blank" href="https://www.youtube.com/user/homedepot" rel="noopener">  
                  <YouTubeIcon sx={{ fontSize: 60 }} />
                  <p>  YouTube  </p>  
                  </a>
                </div>
                <div className="instagram">
                  <a target="_blank" href="https://www.instagram.com/homedepot/" rel="noopener">
                    <InstagramIcon sx={{ fontSize: 60 }} />
                    <p>  Instagram  </p>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;