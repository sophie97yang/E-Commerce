// import React from "react";

import "./Footer.css";

function Footer() {


  return (
    <footer>
      <div id="footer-left">

        <div>Our Githubs</div>

        <div id="github-links">

          <div className="githubs">
            <a href="https://github.com/sophie97yang">Sophie Yang</a>
          </div>
          <div className="githubs">
            <a href="https://github.com/pingno">Peang Ngo</a>
          </div>
          <div className="githubs">
            <a href="https://github.com/314pdinh">Peter Dinh</a>
          </div>
          <div className="githubs">
            <a href="https://github.com/yoslatif">Yoseph Latif</a>
          </div>

        </div>

      </div>

      <div id="footer-center">Copyright, Parmazon-Prime, PYPSenv</div>

      <div id="footer-right">

        <div>Our LinkedIns</div>

        <div id="linkedin-links">

          <div className="linkedins">
            <a href="https://www.linkedin.com/in/sophie-yang-bb9758156/">
              Sophie Yang
            </a>
          </div>
          <div className="linkedins">
            <a href="https://www.linkedin.com/in/peang-ngo-840860112/">
              Peang Ngo
            </a>
          </div>
          <div className="linkedins">
            <a href="https://www.linkedin.com/in/peter-dinh-5a22a01b3/">
              Peter Dinh
            </a>
          </div>
          <div className="linkedins">
            <a href="https://www.linkedin.com/in/yoseph-latif/">Yoseph Latif</a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
