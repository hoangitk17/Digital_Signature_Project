import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { name } from "../reducers";
import * as action from "../actions";
import Logo from "../../../images/logo1Final.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
// import {
//     faPersonBooth
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            txtusername: "",
            txtpassword: "",
            hidePassword: true,
            hidePasswordSignUp: true,
            hidePasswordSignUpAgain: true,
            savelogin: false,
            messenger: "",
            infoSignUp: {
                name: "",
                email: "",
                phoneNumber: "",
                userName: "",
                password: "",
                cardId: "",
                dateOfBirth: null,
                address: "",
                privateKey: "",
                publicKey: "",
                status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
                signImage: "",
                avatar: "",
                gender: true, //true la nam, false la nu
                oldPassword: "",
            }
        }
    }

    setHidePassword = () => {
        this.setState({
            hidePassword: !this.state.hidePassword,
        });
    }

    setHidePasswordSignUp = () => {
        this.setState({
            hidePasswordSignUp: !this.state.hidePasswordSignUp,
        });
    }

    setHidePasswordSignUpAgain = () => {
        this.setState({
            hidePasswordSignUpAgain: !this.state.hidePasswordSignUpAgain,
        });
    }

    setStartDate = (date) => {
        this.setState({
            date
        })
    }

    onSubmit = () => {
        var { txtpassword, txtusername, savelogin } = this.state;
        console.log("run login", txtpassword, txtusername, this.props)
        const data = { userName: txtusername, password: txtpassword, savelogin };
        this.props.actions.signIn({
            data, closeModal: () => {
                document.querySelector('#close-modal-signin').click();
                }});
    }

    onShowPopupSignUp = () => {
        document.querySelector('#close-modal-signin').click();
        document.querySelector('#modalSignUpTemp').click();
    }

    logOut = () => {
        this.setState({
            messenger: ""
        })
    }

    signUp = () => {

    }


    render() {
        const { infoSignUp, hidePassword, hidePasswordSignUp, hidePasswordSignUpAgain, txtusername, txtpassword, date, /* messenger */  } = this.state;
        console.log("data", txtusername, txtpassword, this.props.InfoAfterSignIn)
        const { isError, errorMessage, isLogin, InfoAfterSignIn } = this.props;
        var messenger = !isError ? "" : errorMessage;
        /* if (isError) {
            this.setState({
                messenger: errorMessage
            })
        } */
        console.log("mess", messenger, isError, infoSignUp)
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
                                            {isLogin !== true ?
                                                <li className="nav-item dropdown management-account">
                                                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {/* <img src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png" class="img-fluid profile-icon" alt="error" /> */}
                                                        Đăng ký / Đăng nhập
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalSignUp" id="modalSignUpTemp">Đăng ký tài khoản</a></li>
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalLogin">Đăng nhập</a></li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Đăng nhập bằng GOOGLE</a></li>
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Đăng nhập bằng FACEBOOK</a></li>
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Đăng nhập bằng ZALO</a></li>
                                                    </ul>
                                                </li> :
                                                <li className="nav-item dropdown management-account">
                                                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {/* <img src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png" class="img-fluid profile-icon" alt="error" style={{ transform: "translateY(-3px)"}}/> */}
                                                        {InfoAfterSignIn?.name ? "Xin Chào " + InfoAfterSignIn?.name : "Quản Lý Tài Khoản"}
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Thông tin tài khoản</a></li>
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }}>Đổi mật khẩu</a></li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><a className="dropdown-item" href="/" onClick={this.logOut} style={{ fontSize: 16 }}>Đăng xuất</a></li>
                                                    </ul>
                                                </li>
                                            }
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
                                <a href="#" className="float-right btn btn-outline-primary" style={{ marginLeft: 260 }} onClick={this.onShowPopupSignUp}>Đăng Ký</a>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Tài Khoản</label>
                                        <input
                                            onChange={(e) => this.setState({ txtusername: e.target.value })}
                                            className="form-control mt-3" placeholder="Nhập tài khoản..." type="text"
                                        />
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Mật Khẩu</label>
                                        <a className="float-right" href="#" style={{ marginLeft: 300 }}>Quên mật khẩu?</a>
                                        <input
                                            onChange={(e) => this.setState({ txtpassword: e.target.value })}
                                            className="form-control mt-3" placeholder="Nhập mật khẩu..." type={hidePassword ? "password" : "text"}
                                        />
                                        <span
                                            className="icon-showpass eyeAction"
                                            onClick={this.setHidePassword}
                                        >
                                            {hidePassword ? iconEyeSlash : iconEye}
                                        </span>
                                    </div>
                                    <div className="form-group mt-3">
                                        <div className="checkbox">
                                            <label> <input type="checkbox" style={{ transform: "translateY(15%)", cursor: "pointer"}}/> <span className="mt-1">Lưu mật khẩu</span> </label>
                                        </div>
                                    </div>
                                </form>
                                <div className="message-err mt-3">
                                    {
                                        messenger && messenger !== "" ? <b>{messenger}!</b> : ""
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="close-modal-signin">Hủy</button>
                                <div className="form-group">
                                     <button onClick={this.onSubmit} type="submit" className="btn btn-primary btn-block float-right"> Đăng Nhập</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Modal Sign Up */}
                <div className="modal fade" id="modalSignUp" tabIndex={-1} aria-labelledby="modalSignUpLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
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
                                        <input onChange={(e) => {this.setState({
                                            infoSignUp: {...infoSignUp, name: e.target.value}
                                        })}} className="form-control mt-2" placeholder="Nhập họ và tên..." type="text" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Email</label>
                                        <input onChange={(e) => {this.setState({
                                            infoSignUp: {...infoSignUp, email: e.target.value}
                                        })}} className="form-control mt-2" placeholder="Nhập email..." type="email" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Số Căn Cước Công Dân</label>
                                        <input onChange={(e) => {this.setState({
                                            infoSignUp: {...infoSignUp, cardId: e.target.value}
                                        })}} className="form-control mt-2" placeholder="Nhập số căn cước công dân..." type="number" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Địa chỉ</label>
                                        <input onChange={(e) => {
                                            this.setState({
                                                infoSignUp: { ...infoSignUp, address: e.target.value }
                                            })
                                        }} className="form-control mt-2" placeholder="Nhập địa chỉ..." type="text" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Số Điện Thoại</label>
                                        <input onChange={(e) => {this.setState({
                                            infoSignUp: {...infoSignUp, phoneNumber: e.target.value}
                                        })}} className="form-control mt-2" placeholder="Nhập số điện thoại..." type="number" />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Giới Tính</label>
                                        <div className="d-flex mt-2">
                                            <div className="form-check" onClick={() => {this.setState({ infoSignUp: {...infoSignUp, gender: true }})}}>
                                                <input className="form-check-input" type="radio" name="gender" id="nam" defaultChecked />
                                                <label className="form-check-label" htmlFor="nam">Nam</label>
                                            </div>
                                            <div className="form-check" style={{ marginLeft: 100 }} onClick={() => { this.setState({ infoSignUp: { ...infoSignUp, gender: false }})}}>
                                                <input className="form-check-input" type="radio" name="gender" id="nu" />
                                                <label className="form-check-label" htmlFor="nu">Nữ</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Ngày Sinh</label>
                                        <div className="mt-2"><DatePicker className="date-picker" selected={infoSignUp.dateOfBirth} onChange={dateOfBirth => this.setState({ infoSignUp: { ...infoSignUp, dateOfBirth }})}/></div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Tài Khoản</label>
                                        <input onChange={(e) => {
                                            this.setState({
                                                infoSignUp: {...infoSignUp, userName: e.target.value}
                                            })
                                        }} className="form-control mt-2" placeholder="Nhập tài khoản..." type="text" />
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Mật Khẩu</label>
                                        <input onChange={(e) => {
                                            this.setState({
                                                infoSignUp: {...infoSignUp, password: e.target.value}
                                            })
                                        }} className="form-control mt-2" placeholder="Nhập mật khẩu..." type={hidePasswordSignUp ? "password" : "text"} />
                                        <span
                                            className="icon-showpass-singup eyeAction"
                                            onClick={this.setHidePasswordSignUp}
                                        >
                                            {hidePasswordSignUp ? iconEyeSlash : iconEye}
                                        </span>
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Nhập Lại Mật Khẩu</label>
                                        <input onChange={(e) => {
                                            this.setState({
                                                infoSignUp: {...infoSignUp, oldPassword: e.target.value}
                                            })
                                        }} className="form-control mt-2" placeholder="Nhập lại mật khẩu..." type={hidePasswordSignUpAgain ? "password" : "text"} />
                                        <span
                                            className="icon-showpass-singup eyeAction"
                                            onClick={this.setHidePasswordSignUpAgain}
                                        >
                                            {hidePasswordSignUpAgain ? iconEyeSlash : iconEye}
                                        </span>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <div className="form-group">
                                    <button onClick={this.signUp}
                                    type="submit" className="btn btn-primary btn-block float-right"> Đăng Ký</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

        )
    }
}
const mapStateToProps = state => {
    return {
        ...state[name],
    }
}

const mapDispatchToProps = dispatch => {
    const actions = {
        ...action,
    }
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
