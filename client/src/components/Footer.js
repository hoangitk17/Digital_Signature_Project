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
                                            {/* <a href="index.html"> <img src="assets/img/logo/logo.svg" alt="error" /> </a> */}
                                        </div>
                                        <p className="desc mb-35">
                                            Chúng tôi là đội ngũ lập trình viên chuyên nghiệp, Có rất nhiều lập trình viên trong và ngoài nước hợp tác với chúng tôi. Nếu bạn có bất kỳ nhu cầu tạo chữ ký số nào, bạn có thể liên hệ với chúng tôi.</p>
                                        <ul className="socials">
                                            <li>
                                                <a onClick={(e) => { e.preventDefault() }}> <i className="lni lni-facebook-filled" /> </a>
                                            </li>
                                            <li>
                                                <a onClick={(e) => { e.preventDefault() }}> <i className="lni lni-twitter-filled" /> </a>
                                            </li>
                                            <li>
                                                <a onClick={(e) => { e.preventDefault() }}> <i className="lni lni-instagram-filled" /> </a>
                                            </li>
                                            <li>
                                                <a onClick={(e) => { e.preventDefault() }}> <i className="lni lni-linkedin-original" /> </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-2 offset-xl-1 col-md-5 offset-md-1 col-sm-6">
                                    <div className="footer-widget">
                                        <h3>Liên Kết</h3>
                                        <ul className="links">
                                            <li> <a onClick={(e) => { e.preventDefault() }}>Trang Chủ</a> </li>
                                            <li> <a onClick={(e) => { e.preventDefault() }}>về Chúng Tôi</a> </li>
                                            <li> <a onClick={(e) => { e.preventDefault() }}>Những Dịch Vụ</a> </li>
                                            <li> <a onClick={(e) => { e.preventDefault() }}>Liên Hệ</a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 col-sm-6">
                                    <div className="footer-widget">
                                        <h3>Dịch Vụ</h3>
                                        <ul className="links">
                                            <li> <a onClick={(e) => { e.preventDefault() }}>Tạo Chữ Ký Điện Tử Cho CN</a> </li>
                                            <li> <a onClick={(e) => { e.preventDefault() }}>Tạo Chữ Ký Điện Tử Cho DN</a> </li>
                                            <li> <a onClick={(e) => { e.preventDefault() }}>Tạo Chữ Ký Điện Tử Cho CP</a> </li>
                                            <li> <a onClick={(e) => { e.preventDefault() }}>Cung Cấp Giải Pháp Chữ Ký Số</a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="footer-widget">
                                        <h3>Liên Hệ</h3>
                                        <ul>
                                            <li>+0389853806(Mr. Hùng) +0963203425(Mr. Hoàng)</li>
                                            <li>hungitk17@gmail.com hoangitk17@gmail.com</li>
                                            <li>273 An Dương Vương, Q5, Tp HCM</li>
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
                            <p>Thiết Kế Và Phát Triển by H2H Team <a href="https://sgu.edu.vn/" rel="nofollow" target="_blank"> SGUers </a></p>
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
