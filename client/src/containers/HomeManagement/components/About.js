import React from "react";
export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };

  }


  render() {

    return (
      <>
        <section id="about" className="about-section pt-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-img mb-50">
                  <img src="assets/img/about/about-img.svg" alt="about" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content mb-50">
                  <div className="section-title mb-50">
                    <h1 className="mb-25">Read more about our Digital Agency</h1>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores.</p>
                  </div>
                  <div className="accordion pb-15" id="accordionExample">
                    <div className="single-faq">
                      <button className="w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Which Service We Provide?
              </button>
                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="faq-content">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                </div>
                      </div>
                    </div>
                    <div className="single-faq">
                      <button className="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        What I need to start design?
              </button>
                      <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="faq-content">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                </div>
                      </div>
                    </div>
                    <div className="single-faq">
                      <button className="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        What  is our design process?
              </button>
                      <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="faq-content">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                </div>
                      </div>
                    </div>
                  </div>
                  <a onClick={(e) => {e.preventDefault()}} className="main-btn btn-hover">View More</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    )
  }
}