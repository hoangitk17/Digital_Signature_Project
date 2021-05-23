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
import InputFile from "../../../common/InputFile";
import CropImage from "../../../common/CropImage";
import "../styles.scss";
import md5 from "md5";
import common from "../../../utils/common";
import { get } from "../../../services/localStorage";
const infoUser = common.decodeToken(get("accessToken"));
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

class PopupEditInfoUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidePassword: true,
            hidePasswordSignUp: true,
            hidePasswordSignUpAgain: true,
            hidePasswordNew: true,
            messenger: "",
            event: null,
            /* infoSignUp: { */
            name: props.InfoAfterSignIn?.name,
            email: props.InfoAfterSignIn?.email,
            phoneNumber: props.InfoAfterSignIn?.phoneNumber,
            userName: props.InfoAfterSignIn?.userName,
            password: /* props.InfoAfterSignIn?.password */"",
            oldPassword: props.InfoAfterSignIn?.password, //Lưu vết lại mật khẩu để kiểm tra có nhập đúng mk cũ hay ko?
            cardId: props.InfoAfterSignIn?.cardId,
            dateOfBirth: props.InfoAfterSignIn?.dateOfBirth ? new Date(props.InfoAfterSignIn?.dateOfBirth) : new Date(4500),
            address: props.InfoAfterSignIn?.address,
            privateKey: props.InfoAfterSignIn?.privateKey,
            publicKey: props.InfoAfterSignIn?.publicKey,
            status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
            signImage: props.InfoAfterSignIn?.signImage,
            avatar: props.InfoAfterSignIn?.avatar,
            gender: true, //true la nam, false la nu
            newPassword: "",
            oldNewPassword: "",
            /* }, */
            errors: {},
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
                    }
                    return false
                },
                validWhen: true,
                message: "Số điện thoại phải bắt đầu với số 0 và đủ mười số"
            },
            /* {
                field: "password",
                method: "isEmpty",
                validWhen: false,
                message: "Mật khẩu cũ không được để trống"
            },
            {
                field: "newPassword",
                method: "isEmpty",
                validWhen: false,
                message: "Nhập mật khẩu mới không được để trống"
            },
            {
                field: "oldNewPassword",
                method: "isEmpty",
                validWhen: false,
                message: "Nhập lại mật khẩu mới không được để trống"
            }, */
            {
                field: "userName",
                method: "isEmpty",
                validWhen: false,
                message: "Tài khoản không được để trống"
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
                            return false
                        }
                        return true
                    }
                    return true
                },
                validWhen: true,
                message: "Tuổi phải từ 18 trở lên"
            }
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

    setHidePasswordNew = () => {
        this.setState({
            hidePasswordNew: !this.state.hidePasswordNew,
        });
    }

    onShowPopupSignUp = () => {
        document.querySelector('#close-modal-signin').click();
        document.querySelector('#modalSignUpTemp').click();
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.InfoAfterSignIn?.userName !== prevState.userName) {
            return {
                name: nextProps.InfoAfterSignIn?.name,
                email: nextProps.InfoAfterSignIn?.email,
                phoneNumber: nextProps.InfoAfterSignIn?.phoneNumber,
                userName: nextProps.InfoAfterSignIn?.userName,
                password: /* nextProps.InfoAfterSignIn?.password */"",
                cardId: nextProps.InfoAfterSignIn?.cardId,
                dateOfBirth: nextProps.InfoAfterSignIn?.dateOfBirth ? new Date(nextProps.InfoAfterSignIn?.dateOfBirth) : new Date(4500),
                address: nextProps.InfoAfterSignIn?.address,
                privateKey: nextProps.InfoAfterSignIn?.privateKey,
                publicKey: nextProps.InfoAfterSignIn?.publicKey,
                status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
                signImage: nextProps.InfoAfterSignIn?.signImage,
                avatar: nextProps.InfoAfterSignIn?.avatar,
                gender: nextProps.InfoAfterSignIn?.gender, //true la nam, false la nu
                newPassword: "",
                oldPassword: nextProps.InfoAfterSignIn?.password,
            };
        }
        return null;
    }

    setDataWhenClosePopup = () => {
        this.setState({
            name: this.props.InfoAfterSignIn.InfoAfterSignIn?.name,
            email: this.props.InfoAfterSignIn.InfoAfterSignIn?.email,
            phoneNumber: this.props.InfoAfterSignIn.InfoAfterSignIn?.phoneNumber,
            userName: this.props.InfoAfterSignIn.InfoAfterSignIn?.userName,
            password: /* this.props.InfoAfterSignIn.InfoAfterSignIn?.password */"",
            cardId: this.props.InfoAfterSignIn.InfoAfterSignIn?.cardId,
            dateOfBirth: this.props.InfoAfterSignIn.InfoAfterSignIn?.dateOfBirth ? new Date(this.props.InfoAfterSignIn.InfoAfterSignIn?.dateOfBirth) : new Date(4500),
            address: this.props.InfoAfterSignIn.InfoAfterSignIn?.address,
            privateKey: this.props.InfoAfterSignIn.InfoAfterSignIn?.privateKey,
            publicKey: this.props.InfoAfterSignIn.InfoAfterSignIn?.publicKey,
            status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
            signImage: this.props.InfoAfterSignIn.InfoAfterSignIn?.signImage,
            avatar: this.props.InfoAfterSignIn.InfoAfterSignIn?.avatar,
            gender: this.props.InfoAfterSignIn.InfoAfterSignIn?.gender, //true la nam, false la nu
            newPassword: "",
            oldPassword: this.props.InfoAfterSignIn.InfoAfterSignIn?.password,
            errors: {}
        })
    }

    updateInfoUser = async() => {
        const avatar = await this.cropImage3.uploadImage();
        const {
            password,
            newPassword,
            name,
            email,
            phoneNumber,
            userName,
            cardId,
            address,
            dateOfBirth,
            gender,
            oldNewPassword,
            oldPassword,
            errors
        } = this.state;
        if (
            Object.entries(this.validator.validate(this.state)).length === 0 &&
            this.validator.validate(this.state).constructor === Object
        ) {
            if (password) {
                //TH: có cập nhật lại mật khẩu
                if (md5(password) !== oldPassword) {
                    this.setState({
                        errors: {
                            ...this.validator.validate(this.state), password: "Mật khẩu cũ không đúng"
                        }
                    });
                } else {
                    if (oldNewPassword === newPassword && newPassword !== "") {
                        const data = {
                            password: md5(newPassword),
                            name,
                            email,
                            phoneNumber,
                            userName,
                            cardId,
                            address,
                            avatar,
                            dateOfBirth,
                            gender
                        }
                        this.setState({
                            errors: {}
                        });
                        Swal.fire({
                            title: "Thông báo",
                            text: "Bạn có muốn cập nhật thông tin tài khoản không?",
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonText: "Đồng ý",
                            cancelButtonText: "Hủy",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.props.actions.updateInfoUser({
                                    id: infoUser?.data?._id,
                                    data, closeModal: () => {
                                        this.setState({
                                            // name: "",
                                            // email: "",
                                            // phoneNumber: "",
                                            // userName: "",
                                            // cardId: "",
                                            // dateOfBirth: new Date(4500),
                                            // address: "",
                                            // privateKey: "",
                                            // publicKey: "",
                                            // status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
                                            // signImage: "",
                                            // avatar: "",
                                            // gender: true, //true la nam, false la nu
                                            password: "",
                                            newPassword: "",
                                            oldNewPassword: ""
                                        });
                                        document.querySelector('#closeModalUpdateInfoUser').click();
                                    }
                                });
                            }
                        })
                    } else {
                        if (newPassword === "") {
                            this.setState({
                                errors: {
                                    ...this.validator.validate(this.state), newPassword: "Mật khẩu mới không được để trống"
                                }
                            });
                            /* if (oldNewPassword) {
                                this.setState({
                                    errors: {
                                        ...this.validator.validate(this.state), oldNewPassword: "Nhập lại mật khẩu mới không được để trống"
                                    }
                                });
                            } */
                        } else {
                            if (oldNewPassword !== newPassword) {
                                this.setState({
                                    errors: {
                                        ...this.validator.validate(this.state), oldNewPassword: "Nhập lại mật khẩu mới không đúng"
                                    }
                                });
                            } else {
                                this.setState({
                                    errors: { ...this.validator.validate(this.state) }
                                });
                            }
                        }
                    }
                }
            } else {
                const data = {
                    password: oldPassword,
                    name,
                    email,
                    phoneNumber,
                    userName,
                    cardId,
                    address,
                    avatar,
                    dateOfBirth,
                    gender
                }
                //TH: Không cập nhật mật khẩu
                this.setState({
                    errors: {}
                });
                Swal.fire({
                    title: "Thông báo",
                    text: "Bạn có muốn cập nhật thông tin tài khoản không?",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Hủy",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.props.actions.updateInfoUser({
                            id: infoUser?.data?._id,
                            data, closeModal: () => {
                                this.setState({
                                    //     name: "",
                                    //     email: "",
                                    //     phoneNumber: "",
                                    //     userName: "",
                                    //     cardId: "",
                                    //     dateOfBirth: new Date(4500),
                                    //     address: "",
                                    //     privateKey: "",
                                    //     publicKey: "",
                                    //     status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
                                    //     signImage: "",
                                    //     avatar: "",
                                    //     gender: true, //true la nam, false la nu

                                    password: "",
                                    newPassword: "",
                                    oldNewPassword: "",
                                });
                                document.querySelector('#closeModalUpdateInfoUser').click();
                            }
                        });
                    }
                })
            }

        }
    }


    render() {
        const { infoSignUp, hidePassword, hidePasswordNew, hidePasswordSignUp, hidePasswordSignUpAgain, txtusername, txtpassword, errors, isLogin/* messenger */, dateOfBirth } = this.state;
        const { isError, errorMessage, InfoAfterSignIn, errorMessageSignUp } = this.props;
        var messengerSignUp = errorMessageSignUp ? errorMessageSignUp : null;
        return (
            <div className="popup-edit-info-user">
                {/* Modal Edit Info User */}
                <div className="modal fade" id="modalEditInfoUser" tabIndex={-1} aria-labelledby="modalEditInfoUser" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalEditInfoUser">Thông tin tài khoản</h5>
                                <button onClick={this.setDataWhenClosePopup} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-3" style={{ padding: "95px 42px" }}>
                                            {/* <InputFile
                                                onChange={event => this.setState({ event })}
                                            /> */}
                                            <CropImage
                                                ref={element => (this.cropImage3 = element)}
                                                src={this.state.avatar}
                                                name="image-avatar"
                                                textAdd="THÊM ẢNH"
                                                title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                                btnChoseFile="Chọn Ảnh"
                                                btnDone="Đồng ý"
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Tài Khoản</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8">
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
                                                            }} className="form-control mt-2 disabled" placeholder="Nhập tài khoản..." type="text" value={this.state.userName} disabled />
                                                        </div>
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Họ Và Tên</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8">
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
                                                        </div>
                                                        {errors.name ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.name}</b>
                                                            </div>
                                                        ) : null}
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>CCCD</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8">
                                                            <input onChange={(e) => {
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
                                                        </div>
                                                        {errors.cardId ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.cardId}</b>
                                                            </div>
                                                        ) : null}
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Số Điện Thoại</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8">
                                                            <input onChange={(e) => {
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
                                                        </div>
                                                        {errors.phoneNumber ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.phoneNumber}</b>
                                                            </div>
                                                        ) : null}
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Email</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8">
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
                                                        </div>
                                                        {errors.email ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.email}</b>
                                                            </div>
                                                        ) : null}
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Ngày Sinh</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8">
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
                                                            /></div>
                                                        </div>
                                                        {errors.dateOfBirth ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.dateOfBirth}</b>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Giới Tính</label>{/* <span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span> */}
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{ position: "relative" }}>
                                                            <div className="d-flex" style={{ marginTop: 14 }}>
                                                                <div className="form-check" onClick={() => { this.setState({ gender: true }) }}>
                                                                    <input /* onChange={() => { this.setState({ gender: true }) }} */
                                                                        className="form-check-input" type="radio" name="gender" id="nam" checked={this.state.gender ? true : false} />
                                                                    <label className="form-check-label" htmlFor="nam">Nam</label>
                                                                </div>
                                                                <div className="form-check" style={{ marginLeft: 100 }} onClick={() => { this.setState({ gender: false }) }}>
                                                                    <input /* onChange={() => { this.setState({ gender: false }) }} */
                                                                        className="form-check-input" type="radio" name="gender" id="nu" checked={this.state.gender ? false : true} />
                                                                    <label className="form-check-label" htmlFor="nu">Nữ</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span style={{ fontWeight: "600", textAlign: "center" }}>-------&nbsp;Đổi mật khẩu&nbsp;(nếu cần)&nbsp;---------------------------------</span>
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Mật Khẩu Cũ</label>
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{ position: "relative" }}>
                                                            <input onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    this.setState({
                                                                        password: e.target.value/* , errors: {
                                                                            ...errors, password: e.target.value === ""
                                                                                ? (this.validator.validate(this.state).password
                                                                                    ? this.validator.validate(this.state).password
                                                                                    : "Mật khẩu cũ không được để trống") : null
                                                                        } */
                                                                    })
                                                                } else {
                                                                    delete errors.password;
                                                                    this.setState({ password: e.target.value, errors: { ...errors, password: "" } })
                                                                }
                                                            }} className="form-control mt-2" placeholder="Nhập mật khẩu cũ..." type={hidePasswordSignUp ? "password" : "text"} value={this.state.password} />
                                                            <span
                                                                className="icon-showpass-edit eyeAction"
                                                                onClick={this.setHidePasswordSignUp}
                                                            >
                                                                {hidePasswordSignUp ? iconEyeSlash : iconEye}
                                                            </span>
                                                        </div>
                                                        {errors.password ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.password}</b>
                                                            </div>
                                                        ) : null}
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Mật Khẩu Mới</label>
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{ position: "relative" }}>
                                                            <input onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    this.setState({
                                                                        newPassword: e.target.value/* , errors: {
                                                                            ...errors, newPassword: e.target.value === ""
                                                                                ? (this.validator.validate(this.state).newPassword
                                                                                    ? this.validator.validate(this.state).newPassword
                                                                                    : "Mật khẩu mới không được để trống") : null
                                                                        } */
                                                                    })
                                                                } else {
                                                                    delete errors.newPassword;
                                                                    this.setState({ newPassword: e.target.value, errors: { ...errors, newPassword: "" } })
                                                                }
                                                            }} className="form-control mt-2" placeholder="Nhập mật khẩu mới..." type={hidePasswordSignUpAgain ? "password" : "text"} value={this.state.newPassword} />
                                                            <span
                                                                className="icon-showpass-edit eyeAction"
                                                                onClick={this.setHidePasswordSignUpAgain}
                                                            >
                                                                {hidePasswordSignUpAgain ? iconEyeSlash : iconEye}
                                                            </span>
                                                        </div>
                                                        {errors.newPassword ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.newPassword}</b>
                                                            </div>
                                                        ) : null}
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Nhập Lại MKM</label>
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{ position: "relative" }}>
                                                            <input onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    this.setState({
                                                                        oldNewPassword: e.target.value/* , errors: {
                                                                            ...errors, oldNewPassword: e.target.value === ""
                                                                                ? (this.validator.validate(this.state).oldNewPassword
                                                                                    ? this.validator.validate(this.state).oldNewPassword
                                                                                    : "Nhập lại mật khẩu mới không đúng") : null
                                                                        } */
                                                                    })
                                                                } else {
                                                                    delete errors.oldNewPassword;
                                                                    this.setState({ oldNewPassword: e.target.value, errors: { ...errors, oldNewPassword: "" } })
                                                                }
                                                            }} className="form-control mt-2" placeholder="Nhập lại mật khẩu mới..." type={hidePasswordNew ? "password" : "text"} value={this.state.oldNewPassword} />
                                                            <span
                                                                className="icon-showpass-edit eyeAction"
                                                                onClick={this.setHidePasswordNew}
                                                            >
                                                                {hidePasswordNew ? iconEyeSlash : iconEye}
                                                            </span>
                                                        </div>
                                                        {errors.oldNewPassword ? (
                                                            <div
                                                                className="message-err-signup mt-1 ms-1"
                                                            >
                                                                <b>{errors.oldNewPassword}</b>
                                                            </div>
                                                        ) : null}
                                                        <span style={{ fontWeight: "600", textAlign: "center" }}>---------------------------------------------------------------------------</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row col-md-12" style={{ marginBottom: 5 }}>
                                                <div className="margin-5 col-md-2 line-height-55">
                                                    <label>Địa chỉ</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                </div>
                                                <div className="margin-5 col-md-9" style={{ marginLeft: 4 }}>
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
                                                </div>
                                                {errors.address ? (
                                                    <div
                                                        className="message-err-signup mt-1 ms-1"
                                                    >
                                                        <b>{errors.address}</b>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.setDataWhenClosePopup} id="closeModalUpdateInfoUser" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <div className="form-group">
                                    <button onClick={this.updateInfoUser}
                                        type="submit" className="btn btn-primary btn-block float-right"> Chỉnh Sửa</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(PopupEditInfoUser);
