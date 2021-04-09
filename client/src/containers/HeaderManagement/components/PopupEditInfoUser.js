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
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

class PopupEditInfoUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidePassword: true,
            hidePasswordSignUp: true,
            hidePasswordSignUpAgain: true,
            messenger: "",
            event: null,
            /* infoSignUp: { */
            name: props.InfoAfterSignIn?.name,
            email: props.InfoAfterSignIn?.email,
            phoneNumber: props.InfoAfterSignIn?.phoneNumber,
            userName: props.InfoAfterSignIn?.userName,
            password: props.InfoAfterSignIn?.password,
            cardId: props.InfoAfterSignIn?.cardId,
            dateOfBirth: props.InfoAfterSignIn?.dateOfBirth ? new Date(props.InfoAfterSignIn?.dateOfBirth) : new Date(4500) ,
            address: props.InfoAfterSignIn?.address,
            privateKey: props.InfoAfterSignIn?.privateKey,
            publicKey: props.InfoAfterSignIn?.publicKey,
            status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
            signImage: props.InfoAfterSignIn?.signImage,
            avatar: props.InfoAfterSignIn?.avatar,
            gender: true, //true la nam, false la nu
            oldPassword: props.InfoAfterSignIn?.oldPassword,
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
                    if (phoneNumber.toString().length === 10 && phoneNumber.toString().indexOf("0") === 0)
                    {
                        return true
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
                    if (cardId.toString().length === 9 || cardId.toString().length === 12)
                    {
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
                    var today = new Date();
                    var age = today.getFullYear() - dateOfBirth.getFullYear();
                    var m = today.getMonth() - dateOfBirth.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
                        age--;
                    }
                    console.log("age", age)
                    if(age < 18){
                        return false
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

    onShowPopupSignUp = () => {
        document.querySelector('#close-modal-signin').click();
        document.querySelector('#modalSignUpTemp').click();
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.InfoAfterSignIn.userName !== prevState.userName) {
            return {
                name: nextProps.InfoAfterSignIn?.name,
                email: nextProps.InfoAfterSignIn?.email,
                phoneNumber: nextProps.InfoAfterSignIn?.phoneNumber,
                userName: nextProps.InfoAfterSignIn?.userName,
                password: nextProps.InfoAfterSignIn?.password,
                cardId: nextProps.InfoAfterSignIn?.cardId,
                dateOfBirth: nextProps.InfoAfterSignIn?.dateOfBirth ? new Date(nextProps.InfoAfterSignIn?.dateOfBirth) : new Date(4500),
                address: nextProps.InfoAfterSignIn?.address,
                privateKey: nextProps.InfoAfterSignIn?.privateKey,
                publicKey: nextProps.InfoAfterSignIn?.publicKey,
                status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
                signImage: nextProps.InfoAfterSignIn?.signImage,
                avatar: nextProps.InfoAfterSignIn?.avatar,
                gender: true, //true la nam, false la nu
                oldPassword: nextProps.InfoAfterSignIn?.oldPassword,
            };
        }
        return null;
    }

    updateInfoUser = () => {
        const {
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
        const data = {
            password,
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
            gender
        }
        console.log("Data sign Up", data, this.state.errors, this.validator.validate(this.state))
        if (
            Object.entries(this.validator.validate(this.state)).length === 0 &&
            this.validator.validate(this.state).constructor === Object &&
            password === oldPassword
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
            }).then((result) => {
                if (result.isConfirmed) {
                    this.props.actions.signUp({
                        data, closeModal: () => {
                            this.setState({
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
                                status: 1, //0 la khoa tai khoan, 1 la tai khoan dang hoat dong
                                signImage: "",
                                avatar: "",
                                gender: true, //true la nam, false la nu
                                oldPassword: "",
                            });
                            document.querySelector('#modalSignUpTemp').click();
                        }});
                }
            })
        } else {
            if (password !== oldPassword) {
                console.log('old', password, oldPassword)
                this.setState({
                    errors: { ...this.validator.validate(this.state), oldPassword: "Nhập lại mật khẩu không đúng"
                    }
                });
            } else {
                this.setState({
                    errors: { ...this.validator.validate(this.state)}
                });
            }
        }
    }


    render() {
        const { infoSignUp, hidePassword, hidePasswordSignUp, hidePasswordSignUpAgain, txtusername, txtpassword, errors, isLogin/* messenger */, dateOfBirth } = this.state;
        const { isError, errorMessage, InfoAfterSignIn, errorMessageSignUp } = this.props;
        var messengerSignUp = errorMessageSignUp ? errorMessageSignUp : null;
        console.log("event", this.state.event, InfoAfterSignIn, this.state.userName, this.state.dateOfBirth)
        return (
            <div className="popup-edit-info-user">
                {/* Modal Edit Info User */}
                <div className="modal fade" id="modalEditInfoUser" tabIndex={-1} aria-labelledby="modalEditInfoUser" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalEditInfoUser">Thông tin tài khoản</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-3" style={{ padding: "0 40px", margin: "auto"}}>
                                            {/* <InputFile
                                                onChange={event => this.setState({ event })}
                                            /> */}
                                            <CropImage
                                                ref={element => (this.cropImage = element)}
                                                src={this.state.avatar}
                                                name="image-sign"
                                                textAdd="THÊM ẢNH"
                                                title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                                btnChoseFile="Chọn Ảnh"
                                                btnDone="Đồng Ý"
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
                                                            }} className="form-control mt-2 disabled" placeholder="Nhập tài khoản..." type="text" value={this.state.userName} disabled/>
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
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Ngày Sinh</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8">
                                                            <div className="mt-2"><DatePicker
                                                                className="date-picker"
                                                                selected={dateOfBirth}
                                                                onChange={(dateOfBirth) => {
                                                                    if (!dateOfBirth) {
                                                                        console.log("Date", dateOfBirth)
                                                                        this.setState({
                                                                            dateOfBirth: dateOfBirth, errors: {
                                                                                ...errors, dateOfBirth: !dateOfBirth
                                                                                    ? (this.validator.validate(this.state).dateOfBirth
                                                                                        ? this.validator.validate(this.state).dateOfBirth
                                                                                        : "Ngày sinh không hợp lệ") : null
                                                                            }
                                                                        })
                                                                    } else {
                                                                        console.log("Date", dateOfBirth)
                                                                        delete errors.dateOfBirth;
                                                                        this.setState({ dateOfBirth: dateOfBirth, errors: { ...errors, dateOfBirth: "" } })
                                                                    }
                                                                }}
                                                                dateFormat="dd/MM/yyyy"
                                                                locale="languageDate"
                                                            /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
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
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Giới Tính</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{position: "relative"}}>
                                                            <div className="d-flex" style={{marginTop: 14}}>
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
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Mật Khẩu Cũ</label>
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{position: "relative"}}>
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
                                                            }} className="form-control mt-2" placeholder="Nhập mật khẩu cũ..." type={hidePasswordSignUp ? "password" : "text"} value={this.state.password} />
                                                            <span
                                                                className="icon-showpass-edit eyeAction"
                                                                onClick={this.setHidePasswordSignUp}
                                                            >
                                                                {hidePasswordSignUp ? iconEyeSlash : iconEye}
                                                            </span>
                                                        </div>
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Mật Khẩu Mới</label>
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{position: "relative"}}>
                                                            <input onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    this.setState({
                                                                        oldPassword: e.target.value, errors: {
                                                                            ...errors, oldPassword: e.target.value === ""
                                                                                ? (this.validator.validate(this.state).oldPassword
                                                                                    ? this.validator.validate(this.state).oldPassword
                                                                                    : "Nhập mật khẩu mới không được để trống") : null
                                                                        }
                                                                    })
                                                                } else {
                                                                    delete errors.oldPassword;
                                                                    this.setState({ oldPassword: e.target.value, errors: { ...errors, oldPassword: "" } })
                                                                }
                                                            }} className="form-control mt-2" placeholder="Nhập mật khẩu mới..." type={hidePasswordSignUpAgain ? "password" : "text"} value={this.state.oldPassword} />
                                                            <span
                                                                className="icon-showpass-edit eyeAction"
                                                                onClick={this.setHidePasswordSignUpAgain}
                                                            >
                                                                {hidePasswordSignUpAgain ? iconEyeSlash : iconEye}
                                                            </span>
                                                        </div>
                                                        <div className="margin-5 col-md-4 line-height-55">
                                                            <label>Nhập Lại MKM</label>
                                                        </div>
                                                        <div className="margin-5 col-md-8" style={{ position: "relative" }}>
                                                            <input onChange={(e) => {
                                                                if (e.target.value === "") {
                                                                    this.setState({
                                                                        oldNewPassword: e.target.value, errors: {
                                                                            ...errors, oldNewPassword: e.target.value === ""
                                                                                ? (this.validator.validate(this.state).oldNewPassword
                                                                                    ? this.validator.validate(this.state).oldNewPassword
                                                                                    : "Nhập lại mật khẩu mới không đúng") : null
                                                                        }
                                                                    })
                                                                } else {
                                                                    delete errors.oldNewPassword;
                                                                    this.setState({ oldNewPassword: e.target.value, errors: { ...errors, oldNewPassword: "" } })
                                                                }
                                                            }} className="form-control mt-2" placeholder="Nhập lại mật khẩu mới..." type={hidePasswordSignUpAgain ? "password" : "text"} value={this.state.oldNewPassword} />
                                                            <span
                                                                className="icon-showpass-edit eyeAction"
                                                                onClick={this.setHidePasswordSignUpAgain}
                                                            >
                                                                {hidePasswordSignUpAgain ? iconEyeSlash : iconEye}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row col-md-12" style={{marginBottom: 5}}>
                                                <div className="margin-5 col-md-2 line-height-55">
                                                    <label>Địa chỉ</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                                </div>
                                                <div className="margin-5 col-md-9" style={{marginLeft: 4}}>
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
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Họ Và Tên</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                     name: e.target.value , errors: {
                                                        ...errors, name: e.target.value === ""
                                                            ? (this.validator.validate(this.state).name
                                                                ? this.validator.validate(this.state).name
                                                                : "Họ và tên không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.name;
                                                this.setState({  name: e.target.value , errors: { ...errors, name: "" } })
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
                                                this.setState({  email: e.target.value, errors: { ...errors, email: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập email..." type="email" value={this.state.email}/>
                                        {errors.email ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.email}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Số Căn Cước Công Dân</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                     cardId: e.target.value , errors: {
                                                        ...errors, cardId: e.target.value === ""
                                                            ? (this.validator.validate(this.state).cardId
                                                                ? this.validator.validate(this.state).cardId
                                                                : "Số căn cước công dân không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.cardId;
                                                this.setState({  cardId: e.target.value , errors: { ...errors, cardId: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập số căn cước công dân..." type="number" value={this.state.cardId}/>
                                        {errors.cardId ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.cardId}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Địa chỉ</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <input onChange={(e) => {
                                            if (e.target.value === "") {
                                                this.setState({
                                                     address: e.target.value , errors: {
                                                        ...errors, address: e.target.value === ""
                                                            ? (this.validator.validate(this.state).address
                                                                ? this.validator.validate(this.state).address
                                                                : "Địa chỉ không được để trống") : null
                                                    }
                                                })
                                            } else {
                                                delete errors.address;
                                                this.setState({  address: e.target.value , errors: { ...errors, address: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập địa chỉ..." type="text" value={this.state.address}/>
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
                                                this.setState({  phoneNumber: e.target.value, errors: { ...errors, phoneNumber: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập số điện thoại..." type="number" value={this.state.phoneNumber}/>
                                        {errors.phoneNumber ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.phoneNumber}</b>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label>Giới Tính</label><span style={{ color: "red", fontSize: "14px" }}>&nbsp;*</span>
                                        <div className="d-flex mt-2">
                                            <div className="form-check" onClick={() => { this.setState({  gender: true }) }}>
                                                <input className="form-check-input" type="radio" name="gender" id="nam" defaultChecked/>
                                                <label className="form-check-label" htmlFor="nam">Nam</label>
                                            </div>
                                            <div className="form-check" style={{ marginLeft: 100 }} onClick={() => { this.setState({  gender: false }) }}>
                                                <input className="form-check-input" type="radio" name="gender" id="nu"/>
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
                                                    console.log("Date", dateOfBirth)
                                                    this.setState({
                                                        dateOfBirth: dateOfBirth, errors: {
                                                            ...errors, dateOfBirth: !dateOfBirth
                                                                ? (this.validator.validate(this.state).dateOfBirth
                                                                    ? this.validator.validate(this.state).dateOfBirth
                                                                    : "Ngày sinh không hợp lệ") : null
                                                        }
                                                    })
                                                } else {
                                                    console.log("Date", dateOfBirth)
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
                                                this.setState({  userName: e.target.value, errors: { ...errors, userName: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập tài khoản..." type="text" value={this.state.userName}/>
                                        {errors.userName ? (
                                            <div
                                                className="message-err-signup mt-1"
                                            >
                                                <b>{errors.userName}</b>
                                            </div>
                                        ) : null}
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
                                                this.setState({  password: e.target.value, errors: { ...errors, password: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập mật khẩu..." type={hidePasswordSignUp ? "password" : "text"} value={this.state.password}/>
                                        <span
                                            className="icon-showpass-edit eyeAction"
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
                                                this.setState({  oldPassword: e.target.value, errors: { ...errors, oldPassword: "" } })
                                            }
                                        }} className="form-control mt-2" placeholder="Nhập lại mật khẩu..." type={hidePasswordSignUpAgain ? "password" : "text"} value={this.state.oldPassword}/>
                                        <span
                                            className="icon-showpass-edit eyeAction"
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
                                </form>
                                <div className="message-err mt-3">
                                    {
                                        messengerSignUp && messengerSignUp !== "" ? <><hr/><b>{messengerSignUp}</b></> : ""
                                    }
                                </div>
                            </div> */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
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
