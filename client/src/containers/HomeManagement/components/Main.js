import React from "react";
import About from "./About";
import Contact from './Contact';
import Services from './Services';
export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };

  }


  render() {

    return (
      <>
        <section id="home" className="hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="hero-content">
                  <span className="wow fadeInLeft" data-wow-delay=".2s">Welcome To Bliss</span>
                  <h1 className="wow fadeInUp" data-wow-delay=".4s">
                    You are using free lite version of Bliss.
          </h1>
                  <p className="wow fadeInUp" data-wow-delay=".6s">
                    Please, purchase full version of the template to get all sections, elements and permission to remove footer credits.
          </p>
                  <a onClick={(e) => {e.preventDefault()}} className="main-btn btn-hover wow fadeInUp" data-wow-delay=".6s">Buy Now</a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-img wow fadeInUp" data-wow-delay=".5s">
                  <img src="assets/img/hero/hero-img.svg" alt="error" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="client-logo-section pt-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="single-logo text-center">
                  <img src="assets/img/client-logo/lineicons.svg" alt="error" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-logo text-center">
                  <img src="assets/img/client-logo/uideck.svg" alt="error" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-logo text-center">
                  <img src="assets/img/client-logo/pagebulb.svg" alt="error" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-logo text-center">
                  <img src="assets/img/client-logo/graygrids.svg" alt="error" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <About />
        <Services />
        <Contact />
      </>
    )
  }
}