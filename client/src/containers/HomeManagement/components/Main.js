import React from "react";
import About from "./About";
import Contact from './Contact';
import Services from './Services';
import ReactJs from './../../../images/ReactJsImage.png';
import Bootstrap from './../../../images/BootstrapImage.png';
import nodeJs from './../../../images/nodeJsImage.png';
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
                                    <span className="wow fadeInLeft" data-wow-delay=".2s">Chào Mừng Bạn Đã Đến Với Chúng Tôi</span>
                                    <h1 className="wow fadeInUp" data-wow-delay=".4s">
                                        Bạn Nhất Định Sẽ Có Được Chữ Ký Điện Tử Bảo Mật Và Tinh Tế
          </h1>
                                    <p className="wow fadeInUp" data-wow-delay=".6s">
                                        Luôn Luôn Lắng Nghe, Luôn Luôn Thấu Hiểu. Bạn Có Thể Làm, Chúng Tôi Sẽ Giúp Bạn
          </p>
                                    <a onClick={(e) => { e.preventDefault() }} className="main-btn btn-hover wow fadeInUp" data-wow-delay=".6s">Trải Nghiệm Ngay</a>
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
                                    {/* <img src="assets/img/client-logo/lineicons.svg" alt="error" /> */}
                                    <img src={ReactJs} alt="error" width="350px" height="auto" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="single-logo text-center">
                                    {/* <img src="assets/img/client-logo/uideck.svg" alt="error" /> */}
                                    <img src="assets/img/client-logo/uideck.svg" alt="error" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="single-logo text-center">
                                    {/* <img src="assets/img/client-logo/pagebulb.svg" alt="error" /> */}
                                    <img src={nodeJs} alt="error" width="350px" height="auto" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="single-logo text-center">
                                    {/* <img src="assets/img/client-logo/graygrids.svg" alt="error" /> */}
                                    <img src={Bootstrap} alt="error" width="220px" height="auto" />
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