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
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';
import Validator from "../../../utils/validator";
import Swal from "sweetalert2";
import PopupEditInfoUser from "./PopupEditInfoUser";
import { get } from '../../../services/localStorage';
import Webviewer from '@pdftron/webviewer';
import { Crypt, RSA } from 'hybrid-crypto-js';
import { imgDownload } from '../../../images/base64/Download';
import { imgVerify } from "../../../images/base64/Verify"
import common from "../../../utils/common";
import nodeForge from "../../../utils/nodeforge";
import forge from 'node-forge';
const iconEye = <FontAwesomeIcon icon={faEye} />;
const iconEyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
var crypt = new Crypt({
  md: 'sha256', // Options: sha1, sha256, sha384, sha512, and md5
});
var privateKey = null;
var publicKey = null;
class CreateSignForFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentFile: null,
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
    var buffer = forge.util.createBuffer(JSON.parse(infoUser.privateKey), 'raw')
    privateKey = nodeForge.decryptAES(buffer, aesKeyPem);
    publicKey = infoUser.publicKey;
    console.log(publicKey, privateKey);

    // var rsa = new RSA();
    // rsa.generateKeyPairAsync().then(keyPair => {
    //   privateKey = keyPair.privateKey;
    //   publicKey = keyPair.publicKey;
    // });
  }

  concatTypedArrays = (a, b) => { // a, b TypedArray of same type
    var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }



  signTheFile2 = async (file) => {
    // Click handler. Reads the selected file, then signs it to
    // the random key pair's private key. Creates a Blob with the result,
    // and places a link to that Blob in the download-results section.
    var result = null;
    var sourceFile = file;
    var reader = new FileReader();
    reader.onload = await processTheFile;
    await reader.readAsArrayBuffer(sourceFile);
    // Asynchronous handler:
    async function processTheFile() {
      // Load handler for file reader. Needs to reference keyPair from
      // enclosing scope.
      function str2ab(str) {
        var encoder = new TextEncoder('utf-8');
        return encoder.encode(str);
      }

      function ab2str(buf) {
        var decoder = new TextDecoder('utf-8');
        return decoder.decode(buf);
      }

      var reader = this;              // Was invoked by the reader object
      var plaintext = reader.result;
      console.log(plaintext)
      //    Original plaintext
      // Create a signature with ISSUER's private RSA key
      var signature = crypt.signature(privateKey, ab2str(plaintext));
      var arrayBufferSign = str2ab(JSON.stringify(signature));
      var length = new Uint16Array([arrayBufferSign.byteLength]);
      var arrayBufferPub = str2ab(publicKey);
      var lengthPublicKey = new Uint16Array([arrayBufferPub.byteLength]);
      var blob = new Blob(
        [
          plaintext,   // Remainder is the original plaintext
          // Always a 2 byte unsigned integer
          arrayBufferPub,  // "length" bytes long
          lengthPublicKey, // Always a 2 byte unsigned integer
          arrayBufferSign,  // "length" bytes long
          length,
        ],
        { type: "application/pdf" }
      );
      console.log(blob);
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


    } // end of processTheFile
  }

  verifyTheFile = () => {
    var _this = this;
    // Click handler. Reads the selected file, then verify the digital
    // signature using the random key pair's public key. Shows an alert
    // saying whether the signature is valid or not. If the signature is
    // valid, it also creates a Blob with the original file
    // and places a link to that Blob in the download-results section.

    var sourceFile = document.getElementById("input-sign-file").files[0];

    var reader = new FileReader();
    reader.onload = processTheFile;
    reader.readAsArrayBuffer(sourceFile);


    async function processTheFile() {
      // Load handler for file reader. Needs to reference keyPair from
      // enclosing scope.
      var reader = this;              // Invoked by the reader object
      var data = reader.result;

      function ab2str(buf) {
        var decoder = new TextDecoder('utf-8');
        return decoder.decode(buf);
      }

      var successful = false;
      try {
        console.log(data);
        let isByteOdd = data.byteLength % 2 !== 0;
        if (isByteOdd) {
          data = _this.concatTypedArrays(new Uint8Array(1), new Uint8Array(data)).buffer
        }
        let dataLength = data.byteLength;
        console.log(dataLength)
        console.log(data);
        console.log(new Uint8Array(data, 1, 1))
        // First, separate out the relevant pieces from the file.
        var signatureLength = new Uint16Array(data, dataLength - 2)[0];   // First 16 bit integer
        var signatureArrBuffer = new Uint8Array(data, dataLength - 2 - signatureLength, signatureLength);
        var publicKeyLength = new Uint16Array(data, dataLength - 2 - signatureLength - 2, 2)[0];   // First 16 bit integer
        var publicKeyArrBuffer = new Uint8Array(data, dataLength - 2 - signatureLength - 2 - publicKeyLength, publicKeyLength);
        var plaintext = new Uint8Array(data, isByteOdd ? 1 : 0, isByteOdd ? dataLength - 2 - signatureLength - 2 - publicKeyLength - 1 : dataLength - 2 - signatureLength - 2 - publicKeyLength);
        console.log(plaintext)
        var signature = JSON.parse(ab2str(signatureArrBuffer));
        var message = ab2str(plaintext);
        let newPublicKey = ab2str(publicKeyArrBuffer);
        successful = crypt.verify(
          newPublicKey,
          signature,
          message,
        );
      } catch (e) {
        console.log(e)
        alert("File chưa được kí")
      }
      var blob = null;
      if (successful) {
        blob = new Blob([plaintext], { type: "application/octet-stream" });
      } else {
        blob = null;
      }

      if (blob === null) {
        alert("không hợp lệ");
      } else {
        alert("Chữ kí hợp lệ");
      }
    } // end of processTheFile
  } // end of decryptTheFile

  //useEffect
  async componentDidMount() {
    await this.onStart();
    Webviewer({
      path: 'lib', initialDoc: '',
      disabledElements: [
        'ribbons',
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
        'downloadButton'
      ],
    }, this.viewerDiv.current).then(instance => {
      const { docViewer, annotManager, CoreControls } = instance;
      let newArr = instance.annotationPopup.getItems().filter(item => item.dataElement === "annotationDeleteButton") || [];
      instance.annotationPopup.update(newArr);
      // instance.disableElements(['toolsHeader']);
      var input = document.getElementById("input-sign-file");
      input.addEventListener('change', () => {

        // Get the file from the input
        const file = input.files[0];
        instance.loadDocument(file, { filename: file.name });
      });

      instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          title: "Chứng thực",
          img: imgVerify,
          onClick: async () => {
            this.verifyTheFile();
          }
        });
      });
      instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          title: "download",
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
            this.signTheFile2(file)
          }
        });
      });
    })

  };


  render() {
    const { } = this.state;
    const { } = this.props;
    console.log("data", this.state.documentFile)
    return (
      <div className="create-sign-for-file">
        {/* Modal Create Sign For File */}
        <div className="modal fade" id="modalCreateFileForFile" tabIndex={-1} aria-labelledby="modalCreateFileForFileLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="modalCreateFileForFileLabel" style={{ marginLeft: "46%", fontWeight: "600" }}>KÝ VĂN BẢN</h4>
                <button onClick={() => {
                  this.setState({
                    documentFile: null
                  })
                }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3" style={{ overflow: "auto", height: "calc(100vh - 95px)" }}>
                    <form method="post" action="#" id="#">
                      <div className="form-group files">
                        <input
                          onChange={(e) => {
                            this.setState({
                              documentFile: e.target.value
                            })
                          }}
                          id="input-sign-file"
                          type="file" className="form-control" multiple="" style={{ marginTop: 4 }}
                          value={this.state?.documentFile ? this.state?.documentFile : ""}
                        />
                      </div>
                    </form>
                    <div style={{ color: "green", fontSize: "16px", marginTop: 8, textAlign: "center" }}>Tệp văn bản này đã được ký</div>
                    <h6 style={{ textAlign: "center", margin: "5px 0", fontWeight: "bold" }}>THÔNG TIN NGƯỜI ĐÃ KÝ VĂN BẢN</h6>
                    <div className="card mt-2" style={{ width: "100%", fontSize: "14px !important" }}>
                      <div style={{ backgroundColor: "#f0f0f0" }}>
                        <div id="avatar" style={{ margin: "8px auto", backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png)' }}></div>
                      </div>
                      {/* <div style={{ backgroundColor: "#f0f0f0" }}>
                                                <div id="avatar" style={{ margin: "8px auto", backgroundImage: `url(${AnhDaiDien})` }}></div>
                                            </div> */}
                      {/* <img style={{ padding: "10px 50px 0px" }} className="card-img-top" alt="..." src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"/> */}
                      <div className="card-body">
                        <h6 className="card-title" style={{ fontWeight: "bold" }}>Họ Và Tên</h6>
                        <p className="card-text">Nguyễn Văn Hoàng</p>
                        <h6 className="card-title" style={{ fontWeight: "bold" }}>Email</h6>
                        <p className="card-text">hoangitk172gmail.com</p>
                        <h6 className="card-title" style={{ fontWeight: "bold" }}>Số điện thoại</h6>
                        <p className="card-text">0963-203-425</p>
                      </div>
                    </div>
                    {/* <section id="sign-and-verify">
                                            <input type="file" id="source-file" />
                                            <button id="sign" onClick={this.signTheFile}>Sign File</button>
                                            <button id="verify" onClick={this.verifyTheFile}>Verify Signature</button>
                                        </section>

                                        <section id="results">
                                            Download results:
                                            <ul id="download-links">
                                            </ul>
                                        </section>
                                        <button onClick={this.onSign}>Sign sample</button> */}
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
