import React from 'react';
import peter from '../../assets/images/peterProfile.jpg'
import peang from '../../assets/images/peangProfile.jpeg'
import sophie from '../../assets/images/sophieProfile.jpeg'
import yoseph from '../../assets/images/yosephProfile.jpeg'

import './AboutUs.css';



const AboutUs = () => {
    return (
        <div className="aboutus-paragraph">
            <h1 className="aboutus-title">About Us</h1>
            <p className="description">
                Parmazon Prime, your ultimate online marketplace, redefines the e-commerce experience with a delightful fusion of premium products, user-friendly design, and a touch of humor. Specializing in a diverse selection of quality cheeses, Parmazon Prime caters to enthusiasts seeking a superlative culinary adventure. From exploring an extensive cheese collection to providing a platform for cheese sellers, Parmazon Prime brings together a community that shares a passion for all things cheesy. Our founders, Sophie, Peang, Peter, and Yoseph, envisioned a platform where every purchase is a celebration of flavor and fun. Join us at Parmazon Prime and savor the cheesy goodness crafted by our creators!
            </p>

            <div className='aboutus-creators'>
                <div className='profiles'>
                    <img src={peter} alt='peter' />
                    Peter Dinh
                    <div className='profiles-links'>
                        <a href="https://github.com/314pdinh"><i class="fa-brands fa-square-github"></i></a>             <a href="https://www.linkedin.com/in/peter-dinh-5a22a01b3/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i></a>
                    </div>
                </div>
                <div className='profiles'>
                    <img src={peang} alt='peang' />
                    Peang Ngo
                    <div className='profiles-links'>
                        <a href="https://github.com/pingno"><i class="fa-brands fa-square-github"></i></a>             <a href="https://www.linkedin.com/in/peang-ngo-840860112/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i></a>
                    </div>
                </div>
                <div className='profiles'>
                    <img src={sophie} alt='sophie' />
                    Sophie Yang
                    <div className='profiles-links'>
                        <a href="https://github.com/sophie97yang"><i class="fa-brands fa-square-github"></i></a>             <a href="https://www.linkedin.com/in/sophie-yang-bb9758156/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i></a>
                    </div>
                </div>
                <div className='profiles'>
                    <img src={yoseph} alt='yoseph' />
                    Yoseph Latiff
                    <div className='profiles-links'>
                        <a href="https://github.com/yoslatif"><i class="fa-brands fa-square-github"></i></a>             <a href="https://www.linkedin.com/in/yoseph-latif/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i></a>
                    </div>
                </div>

            </div>
                <div>Thank you App Academy</div>
        </div>

    );
};

export default AboutUs;
