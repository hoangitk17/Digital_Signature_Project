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
const infoUser = common.decodeToken(get("accessToken"));
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

class UpdateSignImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            srcImageSign: this.props?.InfoAfterSignIn ? this.props?.InfoAfterSignIn.signImage : "",
            InfoAfterSignIn: this.props?.InfoAfterSignIn ? this.props?.InfoAfterSignIn : {}
        };

    }

    UpdateSignImage = async() => {
        const { srcImageSign } = this.state;
        const avatar = await this.cropImage.uploadImage();
        console.log("avatar", avatar, avatar === srcImageSign, JSON.stringify(avatar) === JSON.stringify(srcImageSign))
        console.log("123", infoUser.data._id, avatar);
        await this.props.actions.updateInfoUser({ id: infoUser.data._id, data: {signImage: avatar},
        closeModal: () => {
            document.querySelector('#closeModalUpdateSignImage').click();
        } });
        /* if (avatar === srcImageSign)
        {
            Swal.fire(
                'Thông báo',
                'Bạn chưa chọn hình ảnh chữ ký mới để cập nhật.',
                'error'
            )
        }else {
            console.log("123", infoUser.data._id, avatar);
            this.props.actions.updateInfoUser({ id: infoUser.data._id, signImage: avatar});
        } */
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.InfoAfterSignIn?.signImage !== prevState.srcImageSign || nextProps.InfoAfterSignIn !== prevState.InfoAfterSignIn) {
            console.log("1")
            return {
                srcImageSign: nextProps.InfoAfterSignIn?.signImage,
                InfoAfterSignIn: nextProps.InfoAfterSignIn
            };
        }
        return null;
    }

  componentDidMount() {
      if(infoUser?.data?._id)
        this.props.actions.getUserById({ id: infoUser?.data?._id});
    }



    render() {
        const { srcImageSign, InfoAfterSignIn } = this.state;
        const {  } = this.props;
        return (
            <div className="popup-edit-info-user">
                {/* Modal Update Image Sign */}
                <div className="modal fade" id="modalUpdateSign" tabIndex={-1} aria-labelledby="modalUpdateSign" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalUpdateSign">Cập nhật hình ảnh chữ ký</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                    <div className="row">
                                    <div className="col-md-12" style={{ padding: "50px", display: "flex", justifyContent: "center"}}>
                                            {/* <InputFile
                                                onChange={event => this.setState({ event })}
                                            /> */}
                                            <CropImage
                                                ref={element => (this.cropImage = element)}
                                                src={srcImageSign}
                                                name="image-sign"
                                                textAdd="THÊM ẢNH"
                                                title="CHỈNH SỬA KÍCH THƯỚC ẢNH"
                                                btnChoseFile="Chọn Ảnh"
                                                btnDone="Đồng Ý"
                                            />
                                        </div>
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button id="closeModalUpdateSignImage" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <div className="form-group">
                                    <button onClick={() => {this.UpdateSignImage()}}
                                        type="submit" className="btn btn-primary btn-block float-right">Cập Nhật</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSignImage);
