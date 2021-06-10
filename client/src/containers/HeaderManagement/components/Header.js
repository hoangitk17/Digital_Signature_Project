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
import Validator from "../../../utils/validator";
import Swal from "sweetalert2";
import PopupEditInfoUser from "./PopupEditInfoUser";
import CreateSignForFile from "./CreateSignForFile";
import UpdateSignImage from "./UpdateSignImage";
import { get, remove } from '../../../services/localStorage';
import md5 from 'md5';
import Loading from "../../../common/Loading";
import common from "../../../utils/common";
import CropImage from "../../../common/CropImage";
import axios from "axios";
import { createLog } from "../../../api/log";
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
            txtusername: "",
            txtpassword: "",
            hidePassword: true,
            hidePasswordSignUp: true,
            hidePasswordSignUpAgain: true,
            savelogin: false,
            isLogin: props?.isLogin ? props?.isLogin : false,
            messenger: "",
            InfoAfterSignIn: this.props.InfoAfterSignIn ? this.props.InfoAfterSignIn : {},
            /* infoSignUp: { */
            name: "",
            email: "",
            phoneNumber: "",
            userName: "",
            password: "",
            cardId: "",
            dateOfBirth: new Date(4500),
            address: "",
            privateKey: "",
            publicKey: "",
            status: 1, //1 la khoa tai khoan, 2 la tai khoan dang hoat dong, 3 khoa tai khoan, 4 la tai khoan dang bi sai thong tin
            signImage: "",
            avatar: "",
            gender: true, //true la nam, false la nu
            oldPassword: "",
            /* }, */
            errors: {},
            errorImageCardId: "",
            errorImageAvatar: "",
            errorImageSign: "",
            isLoading: props.isLoading ? props.isLoading : true ,
            isCheckClosePopup: false
        };
        const rules = [
            {
                field: "name",
                method: "isEmpty",
                validWhen: false,
                message: "Họ và tên không được để trống"
            },
            {
                field: "email",
                method: "isEmpty",
                validWhen: false,
                message: "Email không được để trống"
            },
            {
                field: "email",
                method: "isEmail",
                validWhen: true,
                message: "Email không hợp lệ"
            },
            {
                field: "phoneNumber",
                method: "isEmpty",
                validWhen: false,
                message: "Số điện thoại không được để trống"
            },
            {
                field: "phoneNumber",
                method: (phoneNumber) => {
                    if (phoneNumber.toString().length === 10 && phoneNumber.toString().indexOf("0") === 0) {
                        return true
                    } else if(phoneNumber.toString().length < 10 && phoneNumber.toString().indexOf("0") !== 0)
                    {
                        this.setState({
                            phoneNumber: "0" + phoneNumber
                        })
                    }
                    return false
                },
                validWhen: true,
                message: "Số điện thoại phải bắt đầu với số 0 và đủ mười số"
            },
            {
                field: "oldPassword",
                method: "isEmpty",
                validWhen: false,
                message: "Nhập lại mật khẩu không được để trống"
            },
            {
                field: "userName",
                method: "isEmpty",
                validWhen: false,
                message: "Tài khoản không được để trống"
            },
            {
                field: "password",
                method: "isEmpty",
                validWhen: false,
                message: "Mật khẩu không được để trống"
            },
            {
                field: "cardId",
                method: "isEmpty",
                validWhen: false,
                message: "Số căn cước công dân không được để trống"
            },
            {
                field: "cardId",
                method: (cardId) => {
                    if (cardId.toString().length === 9 || cardId.toString().length === 12) {
                        return true;
                    }
                    return false;
                },
                validWhen: true,
                message: "Số căn cước công dân không hợp lệ"
            },
            {
                field: "address",
                method: "isEmpty",
                validWhen: false,
                message: "Địa chỉ không được để trống"
            },
            {
                field: "dateOfBirth",
                method: (dateOfBirth) => {
                    if (dateOfBirth) {
                        var today = new Date();
                        var age = today.getFullYear() - dateOfBirth.getFullYear();
                        var m = today.getMonth() - dateOfBirth.getMonth();
                        if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
                            age--;
                        }
                        if (age < 18) {
                            return false;
                        }
                        return true;
                    }
                    return true;
                },
                validWhen: true,
                message: "Tuổi phải từ 18 trở lên"
            },
        ];
        this.validator = new Validator(rules);
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

    onCloseModalSignIn = () => {
        this.setState({
            txtusername: "",
            txtpassword: "",
        });
        this.props.actions.updateMessageErrorInit();
        document.querySelector('#close-modal-signin').click();
    }

    OnSaveLogSignIn = async () => {
        const infoUser = common.decodeToken(get("accessToken"));
        const dataLog = {
            userId: `${infoUser?.data?._id}`,
            action: "Đăng nhập ứng dụng",
            time: `${new Date()}`
        }
        const resLog = await createLog({ data: dataLog });
        if (!resLog?.data?.data) {
            Swal.fire(
                'Thông báo',
                'Log đăng nhập ứng dụng thất bại!',
                'error'
            )
        }
    }

    onSubmit = () => {
        var { txtpassword, txtusername, savelogin } = this.state;
        const data = { userName: txtusername, password: md5(txtpassword), savelogin };
        this.props.actions.signIn({
            data, onSuccess: this.OnSaveLogSignIn, closeModal: this.onCloseModalSignIn
        });
    }

    onShowPopupSignUp = () => {
        document.querySelector('#close-modal-signin').click();
        document.querySelector('#modalSignUpTemp').click();
    }

    logOut = () => {
        this.props.actions.signInFail();
        remove("accessToken");
        remove("refreshToken");
        Swal.fire(
            'Thông báo',
            'Đăng xuất thành công!',
            'success'
        );
        /* this.setState({
            messenger: ""
        }) */
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.InfoAfterSignIn) !== JSON.stringify(prevState.InfoAfterSignIn) ||
            nextProps.isLogin !== prevState.isLogin
            || nextProps.isLoading !== prevState.isLoading) {
            return {
                InfoAfterSignIn: nextProps.InfoAfterSignIn,
                isLogin: nextProps.isLogin,
                isLoading: nextProps.isLoading
            };
        }
        return null;
    }

    onCloseModalSignUp = async() => {
        await this.setState({
            name: "",
            email: "",
            phoneNumber: "",
            userName: "",
            password: "",
            cardId: "",
            dateOfBirth: new Date(4500),
            address: "",
            privateKey: "",
            publicKey: "",
            status: 1, //1 la dang cho xet duyet tai khoan, 2 la tai khoan dang hoat dong, 3 la khoa tai khoan
            signImage: "",
            avatar: "",
            gender: true, //true la nam, false la nu
            oldPassword: "",
            errors: {},
            isCheckClosePopup: true,
          errorImageCardId: "",
          errorImageAvatar: "",
          errorImageSign: "",
          errorMessageSignUp: ""
        });
        await document.querySelector('#modalSignUpTemp').click();
    }

    uploadImageCardId = async(avatar) => {
        let avatarTemp = "";
        const formData = new FormData();
        formData.append("image", avatar);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.put(`http://localhost:5000/user/get-link-image-from-file`, formData, config).then(res => {
            let filePath = res.data.signImage;
            if (filePath) {
                avatarTemp = filePath;
            }
        }).catch(err => {
            Swal.fire(
                'Thông báo',
                'Cập nhật thất bại!',
                'error'
            )
        })
        return avatarTemp;
    }

    signUp = async() => {
        let {
            password,
            oldPassword,
            name,
            email,
            phoneNumber,
            userName,
            cardId,
            address,
            privateKey,
            publicKey,
            signImage,
            avatar,
            dateOfBirth,
            status,
            gender,
            errors
        } = this.state;
        const avatar1 = await this.cropImage1.uploadImage();
        const avatar2 = await this.cropImage2.uploadImage();
        const imageAvatar = await this.cropImageAvatar.uploadImage();
        const imageSign = await this.cropImageSign.uploadImage();
        if (
            Object.entries(this.validator.validate(this.state)).length === 0 &&
            this.validator.validate(this.state).constructor === Object &&
            password === oldPassword && avatar1 && avatar2 && imageAvatar && imageSign && avatar1 !== '' && avatar2 !== ''
            && imageAvatar !== '' && imageSign !== ''
        ) {
            this.setState({
                errors: {}
            });
            Swal.fire({
                title: "Thông báo",
                text: "Bạn có muốn đăng ký tài khoản không?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
            }).then(async(result) => {
                if (result.isConfirmed) {
                    let cardIdFront = await this.uploadImageCardId(avatar1);
                    let cardIdBack = await this.uploadImageCardId(avatar2);
                    let imageAvatarTemp = await this.uploadImageCardId(imageAvatar);
                    let imageSignTemp = await this.uploadImageCardId(imageSign);
                    if (cardIdFront.slice(0, 27) === "http://localhost:5000/user/") {
                        cardIdFront = cardIdFront.slice(27);
                    }
                    if (cardIdBack.slice(0, 27) === "http://localhost:5000/user/") {
                        cardIdBack = cardIdBack.slice(27);
                    }
                    if (imageAvatarTemp.slice(0, 27) === "http://localhost:5000/user/") {
                        imageAvatarTemp = imageAvatarTemp.slice(27);
                    }
                    if (imageSignTemp.slice(0, 27) === "http://localhost:5000/user/") {
                        imageSignTemp = imageSignTemp.slice(27);
                    }
                    const data = {
                        password: md5(password),
                        name,
                        email,
                        phoneNumber,
                        userName,
                        cardId,
                        address,
                        privateKey,
                        publicKey,
                        signImage: imageSignTemp,
                        avatar: imageAvatarTemp,
                        dateOfBirth,
                        statusId: 1,
                        roleId: 1,
                        gender,
                        imageIdCardFront: cardIdFront,
                        imageIdCardBack: cardIdBack
                    }
                    console.log("data sign up", data)
                    this.props.actions.signUp({
                        data, closeModal: this.onCloseModalSignUp
                    });
                }
            })
        } else {
            if(avatar1 === '' || avatar2 === '')
            {
                this.setState({
                    errorImageCardId: "Hình ảnh căn cước công dân không được để trống"
                });
            } else {
                this.setState({ errorImageCardId: "" });
            }
            if (imageAvatar === '') {
                this.setState({
                    errorImageAvatar: "Ảnh đại diện không được để trống"
                });
            } else {
                this.setState({ errorImageAvatar: "" });
            }
            if (imageSign === '') {
                this.setState({
                    errorImageSign: "Hình ảnh chữ ký không được để trống"
                });
            } else {
                this.setState({ errorImageSign: "" });
            }
            if (password !== oldPassword) {
                this.setState({
                    errors: {
                        ...this.validator.validate(this.state), oldPassword: "Nhập lại mật khẩu không đúng"
                    }
                });
            } else {
                this.setState({
                    errors: { ...this.validator.validate(this.state) }
                });
            }
        }
    }

    componentDidMount = () => {
        const infoUser = common.decodeToken(get("accessToken"));
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
        if (infoUser?.data?._id)
        {
            this.props.actions.getUserById({ id: infoUser?.data?._id });
        }
    }

    setDataImageWhenClosePopup = () => {
        this.setState({
            isCheckClosePopup: false // true cho image la ""
        })
    }

    setDataInfoUser = () => {
        this.setState({
            InfoAfterSignIn: this.props.InfoAfterSignIn
        })
    }

    showAlertPrevent = (check) => {
        if(check === true)
        {
            Swal.fire(
                'Thông báo',
                'Thông tin cá nhân của bạn chưa chính xác. Bạn hãy cập nhật lại thông tin cá nhân chính xác để có thể sử dụng chức năng cập nhật hình ảnh chữ ký!',
                'warning'
            )
        }else {
            Swal.fire(
                'Thông báo',
                'Thông tin cá nhân của bạn chưa chính xác. Bạn hãy cập nhật lại thông tin cá nhân chính xác để có thể sử dụng chức năng ký văn bản!',
                'warning'
            )
        }
    }

    render() {
        const { InfoAfterSignIn,
            hidePassword,
            hidePasswordSignUp,
            hidePasswordSignUpAgain, txtusername, txtpassword, errors /*, isLogin messenger */, dateOfBirth,
            isCheckClosePopup,
            errorImageCardId, errorImageAvatar, errorImageSign } = this.state;
        const { isError, errorMessage, errorMessageSignUp } = this.props;
        var messenger = !isError ? "" : errorMessage;
        var messengerSignUp = errorMessageSignUp ? errorMessageSignUp : null;
        console.log("messengerSignUp", messengerSignUp)
        const invalidChars = [
            "-",
            "+",
            "e",
        ];
        /* if (isError) {
            this.setState({
                messenger: errorMessage
            })
        } */
        return (
            <header className="header">
                <Loading show={this.state.isLoading} />
                <div className="navbar-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <nav className="navbar navbar-expand-lg">
                                    <a className="navbar-brand scroll-top-header" href="#">
                                        <img src={Logo} alt="Logo" width="110px" height="auto" />
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
                                            {get("isLogin") !== true ?
                                                <li className="nav-item dropdown management-account">
                                                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {/* <img src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png" class="img-fluid profile-icon" alt="error" /> */}
                                                        Đăng ký / Đăng nhập
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalSignUp" id="modalSignUpTemp" onClick={this.setDataImageWhenClosePopup}>Đăng ký tài khoản</a></li>
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
                                                        {InfoAfterSignIn?.name ? "Xin Chào " + InfoAfterSignIn?.name : "Xin Chào " + (get("name-user") ? get("name-user") : "")}
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalEditInfoUser" onClick={this.setDataInfoUser}>Thông tin tài khoản</a></li>
                                                        <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalUpdateSign" onClick={this.setDataImageWhenClosePopup}>Hình ảnh chữ ký số</a></li>
                                                        {/*InfoAfterSignIn?.statusId === 4 ? <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} onClick={() => this.showAlertPrevent(true)}>Cập nhật hình ảnh chữ ký</a></li> : <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalUpdateSign" onClick={this.setDataImageWhenClosePopup}>Cập nhật hình ảnh chữ ký</a></li>*/}
                                                        {InfoAfterSignIn?.statusId === 4 ? <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} onClick={this.showAlertPrevent}>Ký văn bản</a></li> : <li><a className="dropdown-item" href="#" style={{ fontSize: 16 }} data-bs-toggle="modal" data-bs-target="#modalCreateFileForFile">Ký văn bản</a></li>}
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><a className="dropdown-item" href="#" onClick={this.logOut} style={{ fontSize: 16 }}>Đăng xuất</a></li>
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
                                <button onClick={this.onCloseModalSignIn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Tài Khoản</label>
                                        <input
                                            onChange={(e) => this.setState({ txtusername: e.target.value })}
                                            className="form-control mt-3" placeholder="Nhập tài khoản..." type="text"
                                            value={this.state.txtusername}
                                        />
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Mật Khẩu</label>
                                        <a className="float-right" href="#" style={{ marginLeft: 300 }}>Quên mật khẩu?</a>
                                        <input
                                            onChange={(e) => this.setState({ txtpassword: e.target.value })}
                                            className="form-control mt-3" placeholder="Nhập mật khẩu..." type={hidePassword ? "password" : "text"}
                                            value={this.state.txtpassword}
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
                                            <label> <input type="checkbox" style={{ transform: "translateY(15%)", cursor: "pointer" }} /> <span className="mt-1">Lưu mật khẩu</span> </label>
                                        </div>
                                    </div>
                                </form>
                                <div className="message-err mt-3">
                                    {
                                        messenger && messenger !== "" ? <b>{messenger}</b> : ""
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.onCloseModalSignIn} type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="close-modal-signin">Hủy</button>
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
                                <button onClick={this.onCloseModalSignUp} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body" style={{ paddingBottom: 0 }}>
                                <form>
                                    <div className="form-group">
                                        <label>Họ Và Tên</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    name: e.target.value, errors: {
                                                        ...errors, name: e.target.value === ""
                                                            ? (this.validator.validate(this.state).name
                                                                ? this.validator.validate(this.state).name
                                                                : "Họ và tên không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.name;
                                                this.setState({ name: e.target.value, errors: { ...errors, name: "" } })
                                            }
                                        }}
                                            className="form-control mt-2" placeholder="Nhập họ và tên..." type="text" value={this.state.name}
                                        />
                                        {errors.name ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.name}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Email</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    email: e.target.value, errors: {
                                                        ...errors, email: e.target.value === ""
                                                            ? (this.validator.validate(this.state).email
                                                                ? this.validator.validate(this.state).email
                                                                : "Email không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.email;
                                                this.setState({ email: e.target.value, errors: { ...errors, email: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập email..." type="email" value={this.state.email} />
                                        {errors.email ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.email}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Số Căn Cước Công Dân/Chứng Minh Nhân Dân</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input
                                         onKeyPress={e => invalidChars.includes(e.key) ? e.preventDefault() : null}
                                         onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    cardId: e.target.value, errors: {
                                                        ...errors, cardId: e.target.value === ""
                                                            ? (this.validator.validate(this.state).cardId
                                                                ? this.validator.validate(this.state).cardId
                                                                : "Số căn cước công dân không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.cardId;
                                                this.setState({ cardId: e.target.value, errors: { ...errors, cardId: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập số căn cước công dân..." type="number" value={this.state.cardId} />
                                        {errors.cardId ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.cardId}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Địa chỉ thường trú</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    address: e.target.value, errors: {
                                                        ...errors, address: e.target.value === ""
                                                            ? (this.validator.validate(this.state).address
                                                                ? this.validator.validate(this.state).address
                                                                : "Địa chỉ không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.address;
                                                this.setState({ address: e.target.value, errors: { ...errors, address: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập địa chỉ..." type="text" value={this.state.address} />
                                        {errors.address ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.address}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Số Điện Thoại</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input
                                         onKeyPress={e => invalidChars.includes(e.key) ? e.preventDefault() : null}
                                         onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    phoneNumber: e.target.value, errors: {
                                                        ...errors, phoneNumber: e.target.value === ""
                                                            ? (this.validator.validate(this.state).phoneNumber
                                                                ? this.validator.validate(this.state).phoneNumber
                                                                : "Số điện thoại không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.phoneNumber;
                                                this.setState({ phoneNumber: e.target.value, errors: { ...errors, phoneNumber: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập số điện thoại..." type="number" value={this.state.phoneNumber} />
                                        {errors.phoneNumber ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.phoneNumber}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Giới Tính</label>{/* <span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span> */}
                                        <div className="d-flex mt-2">
                                            <div className="form-check" onClick={() => { this.setState({ gender: true }) }}>
                                                <input className="form-check-input" type="radio" name="gender" id="nam" defaultChecked />
                                                <label className="form-check-label" htmlFor="nam">Nam</label>
                                            </div>
                                            <div className="form-check" style={{ marginLeft: 100 }} onClick={() => { this.setState({ gender: false }) }}>
                                                <input className="form-check-input" type="radio" name="gender" id="nu" />
                                                <label className="form-check-label" htmlFor="nu">Nữ</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Ngày Sinh</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <div className="mt-2"><DatePicker
                                            className="date-picker"
                                            selected={dateOfBirth}
                                            onChange={(dateOfBirth) => {
                                                if (!dateOfBirth) {
                                                    this.setState({
                                                        dateOfBirth: dateOfBirth, errors: {
                                                            ...errors, dateOfBirth: !dateOfBirth
                                                                ? (this.validator.validate(this.state).dateOfBirth
                                                                    ? this.validator.validate(this.state).dateOfBirth
                                                                    : "Ngày sinh không hợp lệ") : null
                                                        }
                                                    })
                                                } else {
                                                    delete errors.dateOfBirth;
                                                    this.setState({ dateOfBirth: dateOfBirth, errors: { ...errors, dateOfBirth: "" } })
                                                }
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            locale="languageDate"
                                        />
                                            {errors.dateOfBirth ? (
                                                <div
                                                    className="message-err-signup mt-1"
                                                >
                                                    <b>{errors.dateOfBirth}</b>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Tài Khoản</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    userName: e.target.value, errors: {
                                                        ...errors, userName: e.target.value === ""
                                                            ? (this.validator.validate(this.state).userName
                                                                ? this.validator.validate(this.state).userName
                                                                : "Tài khoản không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.userName;
                                                this.setState({ userName: e.target.value, errors: { ...errors, userName: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập tài khoản..." type="text" value={this.state.userName} />
                                        {errors.userName ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.userName}</b>
                                            </div>
                                        ) : (<div className="message-err-signup mt-1">
                                            {
                                                messengerSignUp && messengerSignUp !== "" ? messengerSignUp : null
                                            }
                                        </div>)}
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Mật Khẩu</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    password: e.target.value, errors: {
                                                        ...errors, password: e.target.value === ""
                                                            ? (this.validator.validate(this.state).password
                                                                ? this.validator.validate(this.state).password
                                                                : "Mật khẩu không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.password;
                                                this.setState({ password: e.target.value, errors: { ...errors, password: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập mật khẩu..." type={hidePasswordSignUp ? "password" : "text"} value={this.state.password} />
                                        <span
                                            className="icon-showpass-singup eyeAction"
                                            onClick={this.setHidePasswordSignUp}
                                        >
                                            {hidePasswordSignUp ? iconEyeSlash : iconEye}
                                        </span>
                                        {errors.password ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.password}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Nhập Lại Mật Khẩu</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                    oldPassword: e.target.value, errors: {
                                                        ...errors, oldPassword: e.target.value === ""
                                                            ? (this.validator.validate(this.state).oldPassword
                                                                ? this.validator.validate(this.state).oldPassword
                                                                : "Nhập lại mật khẩu không đúng") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.oldPassword;
                                                this.setState({ oldPassword: e.target.value, errors: { ...errors, oldPassword: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập lại mật khẩu..." type={hidePasswordSignUpAgain ? "password" : "text"} value={this.state.oldPassword} />
                                        <span
                                            className="icon-showpass-singup eyeAction"
                                            onClick={this.setHidePasswordSignUpAgain}
                                        >
                                            {hidePasswordSignUpAgain ? iconEyeSlash : iconEye}
                                        </span>
                                        {errors.oldPassword ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.oldPassword}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Hình ảnh đại diện</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <div className="row">
                                            <div className="col-md-12" style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                                                <CropImage
                                                    ref={element => (this.cropImageAvatar = element)}
                                                    src={""}
                                                    name="image-avatar"
                                                    textAdd="THÊM ẢNH"
                                                    title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                                    btnChoseFile="Chọn Ảnh"
                                                    btnDone="Đồng ý"
                                                    isCheckClosePopup={isCheckClosePopup}
                                                />
                                            </div>
                                        </div>
                                        {errorImageAvatar ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errorImageAvatar}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Hình ảnh chữ ký</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <div className="row">
                                            <div className="col-md-12" style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                                                <CropImage
                                                    ref={element => (this.cropImageSign = element)}
                                                    src={""}
                                                    name="image-sign"
                                                    textAdd="THÊM ẢNH"
                                                    title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                                    btnChoseFile="Chọn Ảnh"
                                                    btnDone="Đồng ý"
                                                    isCheckClosePopup={isCheckClosePopup}
                                                />
                                            </div>
                                        </div>
                                        {errorImageSign ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errorImageSign}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3" style={{ position: "relative" }}>
                                        <label>Hình ảnh Căn Cước Công Dân/Chứng Minh Nhân Dân</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <div className="row">
                                            <div className="col-md-6" style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                                                <CropImage
                                                    ref={element => (this.cropImage1 = element)}
                                                    src={""}
                                                    name="image-card-id-front"
                                                    textAdd="MẶT TRƯỚC"
                                                    title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                                    btnChoseFile="Chọn Ảnh"
                                                    btnDone="Đồng ý"
                                                    isCheckClosePopup={isCheckClosePopup}
                                                />
                                            </div>
                                            <div className="col-md-6" style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                                                <CropImage
                                                    ref={element => (this.cropImage2 = element)}
                                                    src={""}
                                                    name="image-card-id-back"
                                                    textAdd="MẶT SAU"
                                                    title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                                    btnChoseFile="Chọn Ảnh"
                                                    btnDone="Đồng ý"
                                                    isCheckClosePopup={isCheckClosePopup}
                                                />
                                            </div>
                                        </div>
                                        {errorImageCardId ? (
                                            <div
                                                className="message-err-signup mt-1 mb-2"
                                            >
                                                <b>{errorImageCardId}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.onCloseModalSignUp} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <div className="form-group">
                                    <button onClick={this.signUp}
                                        type="submit" className="btn btn-primary btn-block float-right"> Đăng Ký</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                { get("isLogin") === true ?
                <><UpdateSignImage
                show={() => this.setState({ isCheckClosePopup: true })} isCheckClosePopup={this.state.isCheckClosePopup}/>
                <CreateSignForFile {...this.props} />
                <PopupEditInfoUser InfoAfterSignIn={InfoAfterSignIn} setDataInfoUser={this.setDataInfoUser}/>
                </> : null}

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
