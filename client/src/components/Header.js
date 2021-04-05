import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Logo from "../images/logo1Final.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {
//     faPersonBooth
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
        }
    }

    setStartDate = (date) => {
        this.setState({
            date
        })
    }


    render() {
        console.log("date", this.state.date)
        return (
            <header className="header">
                <div className="navbar-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <nav className="navbar navbar-expand-lg">
                                    <a className="navbar-brand" href="/">
                                        <img src={Logo} alt="Logo" width="120px" height="auto" />
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
                                            <li className="nav-item dropdown management-account">
                                                <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {/* <img src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png" class="img-fluid profile-icon" alt="error" /> */}
                                                    Đăng ký / Đăng nhập
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalSignUp">Đăng ký tài khoản</a></li>
                                                    <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalLogin">Đăng nhập</a></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Đăng nhập bằng GOOGLE</a></li>
                                                    <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Đăng nhập bằng FACEBOOK</a></li>
                                                    <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Đăng nhập bằng ZALO</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Login */}
                <div className="modal fade" id="modalLogin" tabIndex={-1} aria-labelledby="modalLoginLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalLoginLabel">Đăng Nhập</h5>
                                <a href="#" className="float-right btn btn-outline-primary" style={{ marginLeft: 260 }}>Đăng Ký</a>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Tài Khoản</label>
                                        <input className="form-control mt-3" placeholder="Nhập tài khoản..." type="text" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Mật Khẩu</label>
                                        <a className="float-right" href="#" style={{ marginLeft: 300 }}>Quên mật khẩu?</a>
                                        <input className="form-control mt-3" placeholder="Nhập mật khẩu..." type="password" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <div className="checkbox">
                                            <label> <input type="checkbox" /> Lưu mật khẩu </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block float-right"> Đăng Nhập</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Modal Sign Up */}
                <div className="modal fade" id="modalSignUp" tabIndex={-1} aria-labelledby="modalSignUpLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalSignUpLabel">Đăng Ký</h5>
                                {/* <a href className="float-right btn btn-outline-primary" style={{ marginLeft: 260 }}>Đăng Nhập</a> */}
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Họ Và Tên</label>
                                        <input className="form-control mt-2" placeholder="Nhập họ và tên..." type="text" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Email</label>
                                        <input className="form-control mt-2" placeholder="Nhập email..." type="email" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Số Căn Cước Công Dân</label>
                                        <input className="form-control mt-2" placeholder="Nhập số căn cước công dân..." type="number" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Số Điện Thoại</label>
                                        <input className="form-control mt-2" placeholder="Nhập số điện thoại..." type="number" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Giới Tính</label>
                                        <div className="d-flex mt-2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" id="nam" defaultChecked/>
                                                <label className="form-check-label" htmlFor="nam">Nam</label>
                                            </div>
                                            <div className="form-check" style={{ marginLeft: 100 }}>
                                                <input className="form-check-input" type="radio" name="gender" id="nu" />
                                                <label className="form-check-label" htmlFor="nu">Nữ</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Ngày Sinh</label>
                                        <div className="mt-2"><DatePicker className="date-picker" selected={this.state.date} onChange={date => this.setStartDate(date)} /></div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Tài Khoản</label>
                                        <input className="form-control mt-2" placeholder="Nhập tài khoản..." type="text" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Mật Khẩu</label>
                                        <input className="form-control mt-2" placeholder="Nhập mật khẩu..." type="password" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Nhập Lại Mật Khẩu</label>
                                        <input className="form-control mt-2" placeholder="Nhập lại mật khẩu..." type="password" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block float-right"> Đăng Ký</button>
                                </div>
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
