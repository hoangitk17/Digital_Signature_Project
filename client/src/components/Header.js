import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Logo from "../images/logo2Final.png";
// import {
//     faPersonBooth
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <header className="header">
                <div className="navbar-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <nav className="navbar navbar-expand-lg">
                                    <a className="navbar-brand" href="/">
                                        <img src={Logo} alt="Logo" width="100px" height="auto" style={{ padding: "14px 0"}}/>
                                    </a>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="toggler-icon" />
                                        <span className="toggler-icon" />
                                        <span className="toggler-icon" />
                                    </button>
                                    <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                        <ul id="nav" className="navbar-nav ms-auto">
                                            <li className="nav-item">
                                                <a className="page-scroll active" href="#home">Trang Chủ</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" href="#about">Về Chúng Tôi</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" href="#service">Dịch Vụ</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" href="#contact">Liên Hệ</a>
                                            </li>
                                            {/* <li className="nav-item border-left">
                                                <a className="page-scroll" href="#">Đăng Ký</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" href="#">Đăng Nhập</a>
                                            </li> */}
                                            <li class="nav-item dropdown">
                                                <a class="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Quản Lý Tài Khoản
                                                </a>
                                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><a class="dropdown-item" href="#">Tạo tài khoản</a></li>
                                                    <li><a class="dropdown-item" href="#">Đăng nhập</a></li>
                                                    <li><hr class="dropdown-divider"/></li>
                                                    <li><a class="dropdown-item" href="#">Đăng nhập bằng GOOGLE</a></li>
                                                    <li><a class="dropdown-item" href="#">Đăng nhập bằng FACEBOOK</a></li>
                                                    <li><a class="dropdown-item" href="#">Đăng nhập bằng ZALO</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
