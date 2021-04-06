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
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

class UpdateSignImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,

        };

    }


    render() {
        const { } = this.state;
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
                                    <div className="col-md-12" style={{ padding: "70px 100px 80px"}}>
                                            <InputFile
                                                onChange={event => this.setState({ event })}
                                            />
                                        </div>
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <div className="form-group">
                                    <button onClick={() => {}}
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
