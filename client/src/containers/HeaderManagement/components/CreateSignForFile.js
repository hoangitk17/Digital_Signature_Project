import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { name } from "../reducers";
import * as action from "../actions";
import Logo from "../../../images/BannerFinal.png";
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
                                        <div style={{color: "green", fontSize: "16px", marginTop: 8 }}>==&gt;&nbsp;Tệp văn bản này đã được ký</div>
                                        <h5 style={{textAlign: "center", margin: "5px 0"}}>THÔNG TIN NGƯỜI ĐÃ KÝ VĂN BẢN</h5>
                                        <div className="card mt-2" style={{width: "100%", fontSize: "14px !important"}}>
                                            <img style={{ padding: "10px 50px 0px" }} src="data:image/png;base64,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" className="card-img-top" alt="..."/>
                                            {/* <img style={{ padding: "20px 50px 10px" }} className="card-img-top" alt="..." src="https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"/> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">Họ Và Tên</h5>
                                                    <p className="card-text">Nguyễn Văn Hoàng</p>
                                                    <h5 className="card-title">Email</h5>
                                                    <p className="card-text">hoangitk172gmail.com</p>
                                                    <h5 className="card-title">Số điện thoại</h5>
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
