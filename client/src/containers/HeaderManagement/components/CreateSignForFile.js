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

    onStart = () => {
        var rsa = new RSA();
        rsa.generateKeyPairAsync().then(keyPair => {
            privateKey = keyPair.privateKey;
            publicKey = keyPair.publicKey;
        });
    }

    onSign = () => {
        // Select default message digest
        var message = 'Hello world!';
        // Create a signature with ISSUER's private RSA key
        var signature = crypt.signature(privateKey, message);
        // // Encrypt message with RECEIVERS public RSA key and attach the signature
        // var encrypted = crypt.encrypt(publicKey, message, signature);
        // // Decrypt message with own (RECEIVER) private key
        // var decrypted = crypt.decrypt(privateKey, encrypted);
        // Verify message with ISSUER's public key
        var verified = crypt.verify(
            publicKey,
            signature,
            message,
        );

    }

    signTheFile = () => {
        // Click handler. Reads the selected file, then signs it to
        // the random key pair's private key. Creates a Blob with the result,
        // and places a link to that Blob in the download-results section.
        var sourceFile = document.getElementById("source-file").files[0];
        var reader = new FileReader();
        reader.onload = processTheFile;
        reader.readAsArrayBuffer(sourceFile);
        // Asynchronous handler:
        function processTheFile() {
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
            //    Original plaintext

            // Create a signature with ISSUER's private RSA key
            var signature = crypt.signature(privateKey, ab2str(plaintext));
            var arrayBufferSign = str2ab(JSON.stringify(signature));
            var length = new Uint16Array([arrayBufferSign.byteLength]);
            console.log(publicKey);
            var arrayBufferPub = str2ab(publicKey);
            var lengthPublicKey = new Uint16Array([arrayBufferPub.byteLength]);
            var blob = new Blob(
                [
                    length,     // Always a 2 byte unsigned integer
                    arrayBufferSign,  // "length" bytes long
                    lengthPublicKey, // Always a 2 byte unsigned integer
                    arrayBufferPub,  // "length" bytes long
                    plaintext   // Remainder is the original plaintext
                ],
                { type: "application/pdf" }
            );

            var url = URL.createObjectURL(blob);
            document.getElementById("download-links").insertAdjacentHTML(
                'beforeEnd',
                '<li><a href="' + url + '" download="a.pdf">Signed file</a></li>');




        } // end of processTheFile
    }

    verifyTheFile = () => {
        // Click handler. Reads the selected file, then verify the digital
        // signature using the random key pair's public key. Shows an alert
        // saying whether the signature is valid or not. If the signature is
        // valid, it also creates a Blob with the original file
        // and places a link to that Blob in the download-results section.

        var sourceFile = document.getElementById("source-file").files[0];

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
                // First, separate out the relevant pieces from the file.
                var signatureLength = new Uint16Array(data, 0, 2)[0];   // First 16 bit integer
                var signatureArrBuffer = new Uint8Array(data, 2, signatureLength);
                var publicKeyLength = new Uint16Array(data, signatureLength + 2, 2)[0];   // First 16 bit integer
                var publicKeyArrBuffer = new Uint8Array(data, signatureLength + 4, publicKeyLength);
                var plaintext = new Uint8Array(data, signatureLength + 4 + publicKeyLength);
                var signature = JSON.parse(ab2str(signatureArrBuffer));
                var message = ab2str(plaintext);
                let newPublicKey = ab2str(publicKeyArrBuffer);
                console.log(newPublicKey);
                successful = crypt.verify(
                    newPublicKey,
                    signature,
                    message,
                );
            } catch (e) {
                alert("File chưa được kí")
            }
            var blob = null;
            if (successful) {
                blob = new Blob([plaintext], { type: "application/octet-stream" });
            } else {
                blob = null;
            }

            if (blob === null) {
                alert("Invalid signature!");
            } else {
                alert("Signature is valid.");
                var url = URL.createObjectURL(blob);
                document.getElementById("download-links").insertAdjacentHTML(
                    'beforeEnd',
                    '<li><a href="' + url + '">Verified file</a></li>');
            }
        } // end of processTheFile
    } // end of decryptTheFile

    //useEffect
    async componentDidMount() {
        await this.onStart();
        Webviewer({
            path: 'lib', initialDoc: ''
        }, this.viewerDiv.current).then(instance => {
            instance.disableElements(['toolbarGroup-Shapes']);
            instance.disableElements(['toolbarGroup-Edit']);
            instance.disableElements(['toolbarGroup-Annotate']);
            instance.disableElements(['rubberStampToolGroupButton', 'calloutToolGroupButton', 'stampToolGroupButton', 'searchButton', 'toggleNotesButton']);
            instance.enableTools(['SignatureCreateTool, fileAttachmentToolGroupButton'])

            /*
            // instance.disableElements(['toolsHeader']);
            var input = document.getElementById("source-file");
            input.addEventListener('change', () => {

                 // Get the file from the input
                const file = input.files[0];
                instance.loadDocument(file, { filename: file.name });
           });*/


            const { docViewer } = instance;
            docViewer.on('documentLoaded', () => {
                // perform document operations
            });
            docViewer.on('finishedRendering', () => {
                // perform document operations
                var input2 = document.querySelector('#app > div.App > div.HeaderToolsContainer > div > div > div.tool-group-buttons-container > div > div:nth-child(2) > button')
                input2.addEventListener('change', () => {

                    /* // Get the file from the input
                    const file = input.files[0];
                    instance.loadDocument(file, { filename: file.name }); */
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
                                <h4 className="modal-title" id="modalCreateFileForFileLabel" style={{marginLeft: "46%", fontWeight: "600"}}>KÝ VĂN BẢN</h4>
                                <button onClick={() => {
                                    this.setState({
                                        documentFile: null
                                    })
                                }}type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3" style={{overflow: "auto", height: "calc(100vh - 95px)"}}>
                                        <form method="post" action="#" id="#">
                                            <div className="form-group files">
                                                <input
                                                onChange={(e)=>{
                                                    this.setState({
                                                        documentFile: e.target.value
                                                    })
                                                }}
                                                type="file" className="form-control" multiple="" style={{marginTop: 4}}
                                                value={this.state?.documentFile ? this.state?.documentFile : "" }
                                                />
                                            </div>
                                        </form>
                                        <div style={{color: "green", fontSize: "16px", marginTop: 8, textAlign: "center" }}>Tệp văn bản này đã được ký</div>
                                        <h6 style={{textAlign: "center", margin: "5px 0", fontWeight: "bold"}}>THÔNG TIN NGƯỜI ĐÃ KÝ VĂN BẢN</h6>
                                        <div className="card mt-2" style={{width: "100%", fontSize: "14px !important"}}>
                                            <div style={{backgroundColor: "#f0f0f0"}}>
                                                <div id="avatar" style={{ margin: "8px auto", backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png)' }}></div>
                                            </div>
                                            {/* <div style={{ backgroundColor: "#f0f0f0" }}>
                                                <div id="avatar" style={{ margin: "8px auto", backgroundImage: `url(${AnhDaiDien})` }}></div>
                                            </div> */}
                                            {/* <img style={{ padding: "10px 50px 0px" }} className="card-img-top" alt="..." src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"/> */}
                                                <div className="card-body">
                                                    <h6 className="card-title" style={{fontWeight: "bold"}}>Họ Và Tên</h6>
                                                    <p className="card-text">Nguyễn Văn Hoàng</p>
                                                    <h6 className="card-title" style={{fontWeight: "bold"}}>Email</h6>
                                                    <p className="card-text">hoangitk172gmail.com</p>
                                                    <h6 className="card-title" style={{fontWeight: "bold"}}>Số điện thoại</h6>
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
