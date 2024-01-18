import React from "react";
import InstagramIcon from "../assets/instagramLogo.png";
import TwitterIcon from "../assets/twitterLogo.png";
import FacebookIcon from "../assets/facebookLogo.png";
import LinkedInIcon from "../assets/linkedInLogo.png";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <img src ={InstagramIcon} />
        <img src ={TwitterIcon} />
        <img src ={FacebookIcon} />
        <img src ={LinkedInIcon} />
      </div>
      <p> &copy; 2024 handsonlearning.com</p>
    </div>
  );
}

export default Footer;