import React from "react";
import { NavLink } from 'react-router-dom';

import "./Footer.css";
import logo from '../Navigation/parmazon-logo.png';

function Footer() {

  return (
    <footer>
      <div id="footer-left">
        <div>Our Githubs</div>
        <div id="github-links">
          <div class="githubs">
            <a href="https://github.com/sophie97yang"><i class="fa-brands fa-square-github"></i> Sophie Yang</a>
          </div>
          <div class="githubs">
            <a href="https://github.com/pingno"><i class="fa-brands fa-square-github"></i> Peang Ngo</a>
          </div>
          <div class="githubs">
            <a href="https://github.com/314pdinh"><i class="fa-brands fa-square-github"></i> Peter Dinh</a>
          </div>
          <div class="githubs">
            <a href="https://github.com/yoslatif"><i class="fa-brands fa-square-github"></i> Yoseph Latif</a>
          </div>
        </div>
      </div>

      <div id="footer-center">
        <NavLink exact to="/"><img className='footer-logo' src={logo} alt='logo' /></NavLink>
        <p>&copy; {new Date().getFullYear()} ParmazonPrime, Inc. All Rights Reserved. Terms, Privacy & Accessibility
        </p>

      </div>


      <div id="footer-right">
        <div>Our LinkedIns</div>
        <div id="linkedin-links">
          <div class="linkedins">
            <a href="https://www.linkedin.com/in/sophie-yang-bb9758156/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i> Sophie Yang</a>
          </div>
          <div class="linkedins">
            <a href="https://www.linkedin.com/in/peang-ngo-840860112/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i> Peang Ngo</a>
          </div>
          <div class="linkedins">
            <a href="https://www.linkedin.com/in/peter-dinh-5a22a01b3/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i> Peter Dinh</a>
          </div>
          <div class="linkedins">
            <a href="https://www.linkedin.com/in/yoseph-latif/"><i class="fa-brands fa-linkedin" style={{ color: "#0047c2" }}></i> Yoseph Latif</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
