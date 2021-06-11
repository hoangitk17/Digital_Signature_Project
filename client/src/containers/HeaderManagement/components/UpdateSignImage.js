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
import "../styles.scss";
import CropImage from "../../../common/CropImage";
import common from "../../../utils/common";
import { get } from "../../../services/localStorage";
import axios from "axios";
import { createLog } from "../../../api/log";
import { serverURL } from "../../../services/api";
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

class UpdateSignImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            srcImageSign: this.props?.InfoAfterSignIn ? this.props?.InfoAfterSignIn.signImage : "",
            InfoAfterSignIn: this.props?.InfoAfterSignIn ? this.props?.InfoAfterSignIn : {},
        };

    }

    UpdateSignImage = async () => {
        const infoUser = common.decodeToken(get("accessToken"));
        const { srcImageSign } = this.state;
        const avatar = await this.cropImage.uploadImage();
        if (avatar === srcImageSign) {
            Swal.fire(
                'Thông báo',
                'Bạn chưa chọn hình ảnh chữ ký mới để cập nhật.',
                'error'
            )
        } else {
            const formData = new FormData();
            formData.append("image", avatar);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            /* await this.props.actions.updateInfoUser({ id: infoUser.data._id, data: {signImage: formData},
            closeModal: () => {
                document.querySelector('#closeModalUpdateSignImage').click();
            } }); */
            await axios.put(`${serverURL}user/image-sign/${infoUser.data._id}`, formData, config).then(async res => {
                let filePath = res.data.signImage
                if (filePath) {
                    const dataLog = {
                        userId: `${infoUser?.data?._id}`,
                        action: "Cập nhật hình ảnh chữ ký",
                        time: `${new Date()}`
                    }
                    const resLog = await createLog({ data: dataLog });
                    if (!resLog?.data?.data) {
                        Swal.fire(
                            'Thông báo',
                            'Log cập nhật hình ảnh chữ ký thất bại!',
                            'error'
                        )
                    }
                    this.props.actions.getUserById({ id: infoUser.data._id });
                    // NOTE: Vì tôi viết trên windows nên split theo dấu "\", nếu bạn chạy app trên Mac or linux mà gặp lỗi chỗ này thì xem xét đổi thành "/". nếu đổi sang "/" thì chỉ dùng 1 dấu "/" chứ ko phải hai dấu như "\\".
                    filePath = filePath.split('\\')[1];
                    Swal.fire(
                        'Thông báo',
                        'Cập nhật thành công!',
                        'success'
                    ).then(result => {
                        if (result.isConfirmed) {
                            document.querySelector('#closeModalUpdateSignImage').click();
                        } else {
                            document.querySelector('#closeModalUpdateSignImage').click();
                        }
                    })
                }
                this.setState({
                    srcImageSign: filePath
                })
            }).catch(err => {
                Swal.fire(
                    'Thông báo',
                    'Cập nhật thất bại!',
                    'error'
                )
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.InfoAfterSignIn?.signImage !== prevState.srcImageSign || nextProps.InfoAfterSignIn !== prevState.InfoAfterSignIn) {
            return {
                srcImageSign: nextProps.InfoAfterSignIn?.signImage,
                InfoAfterSignIn: nextProps.InfoAfterSignIn
            };
        }
        return null;
    }

    render() {
        const { srcImageSign, InfoAfterSignIn } = this.state;
        const { show, isCheckClosePopup } = this.props;
        const disabled = InfoAfterSignIn?.statusId === 4 ? false : true;
        console.log("sign image", serverURL)
        return (
            <div className="popup-edit-info-user">
                {/* Modal Update Image Sign */}
                <div className="modal fade" id="modalUpdateSign" tabIndex={-1} aria-labelledby="modalUpdateSign" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalUpdateSign">Hình ảnh chữ ký số</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={show} />
                            </div>
                            <div className="modal-body">
                                <div className="row" style={{position: "relative"}}>
                                    <div className="col-md-12" style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
                                        {/* <InputFile
                                                onChange={event => this.setState({ event })}
                                            /> */}
                                        {<CropImage
                                            ref={element => (this.cropImage = element)}
                                            src={!srcImageSign ? "" : srcImageSign}
                                            name="image-sign"
                                            textAdd="THÊM ẢNH"
                                            title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                            btnChoseFile="Chọn Ảnh"
                                            btnDone="Đồng ý"
                                            isCheckClosePopup={isCheckClosePopup}
                                            disabled={disabled}
                                        />}
                                    </div>
                                    {disabled === true ? <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "transparent" }}></div> : null}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="closeModalUpdateSignImage" type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={show}>Đóng</button>
                                {disabled === true ? null : <div className="form-group">
                                    <button onClick={() => { this.UpdateSignImage() }}
                                        type="submit" className="btn btn-primary btn-block float-right">Cập Nhật</button>
                                </div>}
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSignImage);
