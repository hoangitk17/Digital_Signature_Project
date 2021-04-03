import React from "react";
export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };

  }


  render() {

    return (
      <>
        <section id="contact" className="cta-section img-bg pt-110 pb-60">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-7">
                <div className="section-title mb-50">
                                <h1 className="mb-20 wow fadeInUp" data-wow-delay=".2s">Bạn có ý tưởng nào trong đầu không? Chúng tôi sẽ giúp bạn thực hiện nó</h1>
                  <p className="wow fadeInUp" data-wow-delay=".4s">Hãy bắt đầu với chúng tôi nào.</p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5">
                <div className="cta-btn text-lg-end mb-50">
                                <a onClick={(e) => { e.preventDefault() }} className="main-btn btn-hover text-uppercase">HÃY BẮT ĐẦU TẠO CHỮ KÝ SỐ CỦA BẠN</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </>
    )
  }
}