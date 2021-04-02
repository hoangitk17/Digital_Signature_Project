import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <>
        <footer className="footer">
          <div className="container">
            <div className="widget-wrapper">
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="footer-widget">
                    <div className="logo mb-35">
                      <a href="index.html"> <img src="assets/img/logo/logo.svg" alt="error" /> </a>
                    </div>
                    <p className="desc mb-35">We are expert designer team, There have a lot of designer and developer If you have any project you can hire Create a website.</p>
                    <ul className="socials">
                      <li>
                        <a onClick={(e) => {e.preventDefault()}}> <i className="lni lni-facebook-filled" /> </a>
                      </li>
                      <li>
                        <a onClick={(e) => {e.preventDefault()}}> <i className="lni lni-twitter-filled" /> </a>
                      </li>
                      <li>
                        <a onClick={(e) => {e.preventDefault()}}> <i className="lni lni-instagram-filled" /> </a>
                      </li>
                      <li>
                        <a onClick={(e) => {e.preventDefault()}}> <i className="lni lni-linkedin-original" /> </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-2 offset-xl-1 col-md-5 offset-md-1 col-sm-6">
                  <div className="footer-widget">
                    <h3>Link</h3>
                    <ul className="links">
                      <li> <a onClick={(e) => {e.preventDefault()}}>Home</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>About</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Services</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Portfolio</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Pricing</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Team</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Contact</a> </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-sm-6">
                  <div className="footer-widget">
                    <h3>Services</h3>
                    <ul className="links">
                      <li> <a onClick={(e) => {e.preventDefault()}}>Graphic design</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Web design</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Visual design</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Product design</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>UI/UX design</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Web development</a> </li>
                      <li> <a onClick={(e) => {e.preventDefault()}}>Startup business</a> </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="footer-widget">
                    <h3>Contact</h3>
                    <ul>
                      <li>+003894372632</li>
                      <li>helldesigner@gmail.ccom</li>
                      <li>United state of America</li>
                    </ul>
                    <div className="contact_map" style={{ width: '100%', height: 150, marginTop: 25 }}>
                      <div className="gmap_canvas">
                        <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=Mission%20District%2C%20San%20Francisco%2C%20CA%2C%20USA&t=&z=13&ie=UTF8&iwloc=&output=embed" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="copy-right">
              <p>Design and Developed by <a href="https://uideck.com" rel="nofollow" target="_blank"> UIdeck </a></p>
            </div>
          </div>
        </footer>
        <a href="#" className="scroll-top btn-hover">
          <i className="lni lni-chevron-up"></i>
        </a>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  const actions = {

  };
  return { actions: bindActionCreators(actions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
