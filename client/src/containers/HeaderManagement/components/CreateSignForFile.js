import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { name } from "../reducers";
import * as action from "../actions";
import AnhDaiDien from "../../../images/Anh_Dai_Dien.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';
import Validator from "../../../utils/validator";
import Swal from "sweetalert2";
import PopupEditInfoUser from "./PopupEditInfoUser";
import { get } from '../../../services/localStorage';
import Webviewer from '@pdftron/webviewer';
import { Crypt, RSA } from 'hybrid-crypto-js';
import { imgDownload } from '../../../images/base64/Download';
import { imgVerify } from "../../../images/base64/Verify";
import { imgCheck } from "../../../images/base64/Check"
import common from "../../../utils/common";
import nodeForge from "../../../utils/nodeforge";
import forge from 'node-forge';
import { createLog } from "../../../api/log";
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
var crypt = new Crypt({
  md: 'sha256', // Options: sha1, sha256, sha384, sha512, and md5
});
var privateKey = null;
var publicKey = null;
const sinatureTools = ['toolbarGroup-Insert', 'signatureToolGroupButton', 'toolsOverlay', 'contextMenuPopup', 'annotationPopup'];
class CreateSignForFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentFile: null,
      oldDocumentFile: null,
      instance: null,
    };
    this.viewerDiv = React.createRef();
  }

  str2ab = (str) => {
    var encoder = new TextEncoder('utf-8');
    return encoder.encode(str);
  }

  ab2str = (buf) => {
    var decoder = new TextDecoder('utf-8');
    return decoder.decode(buf);
  }


  onStart = async () => {
    const accessToken = get("accessToken");
    const infoUser = await common.decodeToken(accessToken).data;
    const aesKeyPem = get("aesKeyPem");
    var buffer = forge.util.createBuffer(JSON.parse(infoUser?.privateKey), 'raw')
    privateKey = nodeForge.decryptAES(buffer, aesKeyPem);
    publicKey = infoUser.publicKey;

  }

  concatTypedArrays = (a, b) => { // a, b TypedArray of same type
    var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }



  signTheFile = async (file) => {
    const _this = this;
    var sourceFile = file;
    var reader = new FileReader();
    reader.onload = await processTheFile;
    await reader.readAsArrayBuffer(sourceFile);
    // Asynchronous handler:
    async function processTheFile() {
      // Hàm chuyển từ mảng array buffer sang chuỗi
      function str2ab(str) {
        var encoder = new TextEncoder('utf-8');
        return encoder.encode(str);
      }
      // Hàm chuyển từ chuỗi sang array buffer
      function ab2str(buf) {
        var decoder = new TextDecoder('utf-8');
        return decoder.decode(buf);
      }

      var reader = this;
      var plaintext = reader.result;
      // Tạo chữ kí với public key
      var signature = crypt.signature(privateKey, ab2str(plaintext));
      // Chuyển chữ kí từ chuỗi về mảng array buffer(byte)
      var arrayBufferSign = str2ab(JSON.stringify(signature));
      // Tính ra số byte của mảng chữ ký này
      var length = new Uint16Array([arrayBufferSign.byteLength]);
      // Chuyển public key từ dạng chuỗi về mảng array buffer(byte)
      var arrayBufferPub = str2ab(publicKey);
      // Tính ra số byte của public key
      var lengthPublicKey = new Uint16Array([arrayBufferPub.byteLength]);
      // Gắn chữ kí vào file plaintext
      var blob = new Blob(
        [
          plaintext,   // The original plaintext
          arrayBufferPub,
          lengthPublicKey, // Always a 2 byte unsigned integer
          arrayBufferSign,
          length, // Always a 2 byte unsigned integer
        ],
        { type: "application/pdf" }
      );
      const saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (blob, fileName) {
          let url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        };
      }());
      saveData(blob, "signed_file");
      _this.state.instance.disableElements(sinatureTools)
    } // end of processTheFile
  }

  verifyTheFile = () => {
    var _this = this;
    let isError = false;
    var sourceFile = document.getElementById("input-sign-file").files[0];
    if (!sourceFile) {
      return;
    }
    var reader = new FileReader();
    reader.onload = processTheFile;
    reader.readAsArrayBuffer(sourceFile);
    async function processTheFile() {
      var reader = this;              // Invoked by the reader object
      var data = reader.result;
      function ab2str(buf) {
        var decoder = new TextDecoder('utf-8');
        return decoder.decode(buf);
      }
      var successful = false;
      let newPublicKey = null;
      try {
        let isByteOdd = data.byteLength % 2 !== 0;
        if (isByteOdd) {
          data = _this.concatTypedArrays(new Uint8Array(1), new Uint8Array(data)).buffer
        }
        let dataLength = data.byteLength;
        // Đọc số byte của chữ kí
        var signatureLength = new Uint16Array(data, dataLength - 2)[0];   // First 16 bit integer
        // Lấy ra mảng byte của chữ kí
        var signatureArrBuffer = new Uint8Array(data, dataLength - 2 - signatureLength, signatureLength);
        // Đọc số byte của public key
        var publicKeyLength = new Uint16Array(data, dataLength - 2 - signatureLength - 2, 2)[0];   // First 16 bit integer
        // Lấy ra mảng byte public key
        var publicKeyArrBuffer = new Uint8Array(data, dataLength - 2 - signatureLength - 2 - publicKeyLength, publicKeyLength);
        // Lấy ra mảng byte plaintext
        var plaintext = new Uint8Array(data, isByteOdd ? 1 : 0, isByteOdd ? dataLength - 2 - signatureLength - 2 - publicKeyLength - 1 : dataLength - 2 - signatureLength - 2 - publicKeyLength);
        // chuyển chữ kí, dữ liệu ban đầu và public key về dạng chuỗi
        var signature = JSON.parse(ab2str(signatureArrBuffer));
        var message = ab2str(plaintext);
        newPublicKey = ab2str(publicKeyArrBuffer);
        // Kiểm tra chữ kí dựa vào public key và plaintext
        successful = crypt.verify(
          newPublicKey,
          signature,
          message,
        );
      } catch (e) {
        isError = true;
        await _this.props.actions.getUserInfoByPublicKey({})
      }
      var blob = null;
      let isEdited = false;
      if (successful) {
        blob = new Blob([plaintext], { type: "application/octet-stream" });
      } else {
        blob = null;
        isEdited = true;
      }

      if (blob === null) {
        await _this.props.actions.getUserInfoByPublicKey({})
        if (isEdited && isError === false) {
          await Swal.fire(
            'Thông báo',
            'Tệp văn bản đã bị chỉnh sửa',
            'error'
          )
        }
        _this.state.instance.enableElements(sinatureTools)
      } else {
        await _this.props.actions.getUserInfoByPublicKey({ data: { publicKey: newPublicKey } })
        _this.state.instance.disableElements(sinatureTools)
        const { annotManager } = _this.state.instance;
        annotManager.setReadOnly(true);
      }
    } // end of processTheFile
  } // end of decryptTheFile

  //useEffect
  async componentDidMount() {
    let _this = this;
    await this.onStart();
    Webviewer({
      path: 'lib', initialDoc: '',
      disabledElements: [
        // 'ribbons',
        'toggleNotesButton',
        'searchButton',
        // 'menuButton',
        'rubberStampToolGroupButton',
        'stampToolGroupButton',
        'fileAttachmentToolGroupButton',
        'calloutToolGroupButton',
        'undo',
        'redo',
        'eraserToolButton',
        'downloadButton',
        'selectToolButton',
        'underlineToolGroupButton',
        'strikeoutToolGroupButton',
        'squigglyToolGroupButton',
        'stickyToolGroupButton',
        'freeTextToolGroupButton',
        'shapeToolGroupButton',
        'freeHandToolGroupButton',
        'highlightToolGroupButton',
        'toolbarGroup-Shapes',
        'toolbarGroup-Edit',
        'textPopup',
        'copyTextButton',
        'textHighlightToolButton',
        'textUnderlineToolButton',
        'textSquigglyToolButton',
        'textStrikeoutToolButton',
        'viewControlsButton',
        'leftPanelButton'
      ],
    }, this.viewerDiv.current).then(async instance => {
      await _this.setState({
        instance,
      })
      const { docViewer, annotManager, CoreControls } = instance;
      //instance.enableElements(['readerPageTransitionButton']);
      const signatureTool = docViewer.getTool('AnnotationCreateSignature');

      let newArr = instance.annotationPopup.getItems().filter(item => item.dataElement === "annotationDeleteButton") || [];
      instance.annotationPopup.update(newArr);
      // instance.disableElements(['toolsHeader']);
      var input = document.getElementById("input-sign-file");
      input?.addEventListener('change', () => {

        // Get the file from the input
        const file = input.files[0];
        if (file) {
          instance.loadDocument(file, { filename: file.name });
          _this.verifyTheFile();
          instance.disableElements(['SignDownload']);
          instance.enableElements(['ConfirmSign','AuthenticateSign']);
          annotManager.setReadOnly(false);
        }
      });

      docViewer.on('documentLoaded', () => {
        _this.getBase64Image(_this.props.InfoAfterSignIn?.signImage, (base64) => {
          signatureTool.importSignatures([base64]);
        })
      });

      instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          title: "Chứng thực",
          toolName: 'AuthenticateSign',
          dataElement: 'AuthenticateSign',
          img: imgVerify,
          onClick: async () => {
            this.verifyTheFile();
          }
        });
        header.push({
          type: 'actionButton',
          toolName: 'ConfirmSign',
          dataElement: 'ConfirmSign',
          title: "Xác nhận và kí văn bản",
          img: imgCheck,
          onClick: async () => {
            this.confirmSignature();
          }
        });
      });
      instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          toolName: 'CustomTool',
          dataElement: 'SignDownload',
          title: "Tải xuống",
          img: imgDownload,
          onClick: async () => {
            const doc = docViewer.getDocument();
            const xfdfString = await annotManager.exportAnnotations();
            const saveOptions = CoreControls.SaveOptions;
            const options = {
              xfdfString,
              flags: saveOptions.LINEARIZED,
              downloadType: 'pdf'
            };
            const data = await doc.getFileData(options);
            const arr = new Uint8Array(data);
            const file = new Blob([arr], { type: 'application/pdf' });
            this.signTheFile(file);
            /* const infoUser = common.decodeToken(get("accessToken"));
            const dataLog = {
                userId: `${infoUser?.data?._id}`,
                action: "Ký văn bản",
                time: `${new Date()}`
            }
            const resLog = createLog({ data: dataLog });
            if (!resLog?.data?.data) {
                Swal.fire(
                    'Thông báo',
                    'Log ký văn bản thất bại!',
                    'error'
                )
            } */
          }
        });
      });
      instance.disableElements(['SignDownload']);
     
    })

  };

  confirmSignature = () => {
    if (this.state.documentFile) {
      let disableElements = ['toolbarGroup-Insert', 'signatureToolGroupButton', 'toolsOverlay', 'contextMenuPopup', 'annotationPopup', 'undoButton', 'redoButton', 'annotationDeleteButton', 'ConfirmSign','AuthenticateSign'];
      Swal.fire(
        'Thông báo',
        'Kí văn bản thành công',
        'info'
      )
      // Không cho dịch chuyển văn bản sau khi kí
      const { annotManager } = this.state.instance;
      annotManager.setReadOnly(true);

      this.state.instance.disableElements(disableElements)
      this.state.instance.enableElements(['SignDownload'])
    } else {

    }
  }

  getBase64Image = (imgUrl, callback) => {

    var img = new Image();

    // onload fires when the image is fully loadded, and has width and height

    img.onload = function () {

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png")
      // dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

      callback(dataURL); // the base64 string

    };

    // set attributes and src 
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgUrl;

  }

  render() {
    const { documentFile } = this.state;
    const { userInfoSigned } = this.props;
    return (
      <div className="create-sign-for-file">
        {/* Modal Create Sign For File */}
        <div className="modal fade" id="modalCreateFileForFile" tabIndex={-1} aria-labelledby="modalCreateFileForFileLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="modalCreateFileForFileLabel" style={{ marginLeft: "46%", fontWeight: "600" }}>KÝ VĂN BẢN</h4>
                <button onClick={() => {
                  // this.setState({
                  //   documentFile: null
                  // })
                }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3" style={{ overflow: "auto", height: "calc(100vh - 95px)" }}>
                    <form method="post" action="#" id="#">
                      <div className="form-group files">
                        <input
                          title={this.state?.documentFile}
                          onChange={(e) => {
                            if (e?.target?.value?.length > 0) {
                              this.setState({
                                documentFile: e.target.value
                              })
                            }
                          }}
                          id="input-sign-file"
                          type="file" className="form-control" multiple="" style={{ marginTop: 4 }}
                          value={this.state?.documentFile ? this.state.documentFile : ""}
                        />
                      </div>
                    </form>
                    {
                      JSON.stringify(userInfoSigned) !== JSON.stringify({}) ? (
                        <><div style={{ color: "green", fontSize: "16px", marginTop: 8, textAlign: "center" }}>Tệp văn bản này đã được ký</div>
                          <h6 style={{ textAlign: "center", margin: "5px 0", fontWeight: "bold" }}>THÔNG TIN NGƯỜI ĐÃ KÝ VĂN BẢN</h6>
                          <div className="card mt-2" style={{ width: "100%", fontSize: "14px !important" }}>
                            <div style={{ backgroundColor: "#f0f0f0" }}>
                              <div id="avatar" style={{ margin: "8px auto", backgroundImage: `url(${userInfoSigned.avatar}),url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png)` }}></div>
                            </div>
                            <div className="card-body">
                              <h6 className="card-title" style={{ fontWeight: "bold" }}>Tài khoản</h6>
                              <p className="card-text">{userInfoSigned.userName || ""}</p>
                              <h6 className="card-title" style={{ fontWeight: "bold" }}>Họ và tên</h6>
                              <p className="card-text">{userInfoSigned.name || ""}</p>
                              <h6 className="card-title" style={{ fontWeight: "bold" }}>Email</h6>
                              <p className="card-text">{userInfoSigned.email || ""}</p>
                              <h6 className="card-title" style={{ fontWeight: "bold" }}>Số điện thoại</h6>
                              <p className="card-text">{userInfoSigned.phoneNumber || ""}</p>
                            </div>
                          </div></>
                      ) : null
                    }
                  </div>
                  <div className="col-md-9 webviewer" ref={this.viewerDiv}>

                  </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateSignForFile);
