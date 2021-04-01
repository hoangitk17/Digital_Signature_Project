import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Dialog from "./Dialog";
import Button from "./Button";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import PropTypes from "prop-types";
import Api from "../../services/api";
const END_POINT = "/upload";

export default class CropImage extends Component {
  state = {
    blob: '',
    source: '',
    image: '',
    show: false,
    loading: true,
    fileName: ''
  };

  /**
   * Upload image after that return data image new
   */
  uploadImage = async () => {
    const { blob, fileName } = this.state;
    const { src } = this.props;

    if (blob) {
      try {
        let form = new FormData();
        form.append("files", blob, fileName);
        const res = await Api.post(`${END_POINT}`, form);
        let dataPath = res.data.data[0].path;
        return dataPath;
      } catch (error) {
        return src
      }
    }
    return src
  }

  /**
   * get blob for use ref
   */
  getblob = () => {
    const { blob } = this.state;
    return blob
  }

  /**
   * Save blob into state
   */
  saveBlob = async () => {
    const blob = await this.cropImage();
    this.setState({
      blob
    });
  }

  /**
   * Save crop
   */
  saveCropImage = async (e) => {
    await this.saveBlob();
    const { save } = this.props;
    const { image, blob, fileName } = this.state;
    save({ image, blob, fileName });
    this.close();
  }

  /**
   * Reset input
   */
  resetInputFile = () => {
    this.input.value = '';
  }

  /**
   * Reset
   */
  reset = () => {
    this.input.value = '';
    this.setState({
      blob: '',
      source: '',
      image: '',
      show: false
    })
  }

  /**
   * Close modal crop
   */
  close = () => {
    const { close } = this.props;
    this.resetInputFile();
    this.setState({
      show: false
    }, close);
  }

  /**
   * onChange crop
   */
  onChange = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        this.setState({
          source: event.target.result,
          show: true,
          fileName: file.name
        });
      }
      reader.readAsDataURL(file);
    }
  }

  /**
   * Get crop image
   */
  onCropperInit = (cropper) => {
    this.cropper = cropper;
  }

  /**
   * Handler crop image
   */
  cropImage = () => {
    const optionCrop = {
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
      fillColor: '#fff',
      width: 600,
      height: 600
    }

    const image = this.cropper.getCroppedCanvas().toDataURL();

    this.setState({ image });
    return new Promise(resolve => {
      this.cropper.getCroppedCanvas(optionCrop).toBlob(
        blob => {
          resolve(blob);
        },
        'image/jpeg',
        1.0
      );
    })
  }

  /**
   * Get ratio width height.
   */
  getInfoRatio = () => {
    const { ratio } = this.props;
    const height = 400;

    return {
      width: height * ratio,
      height: height,
      ratio
    }
  }

  /**
   * Handle button zoom.
   */
  zoom = (value) => {
    this.crop.cropper.zoom(value)
  }

  /**
   * Render component
   */
  render() {
    const {
      src,
      title,
      children,
      btnDone,
      textAdd,
      innerClass,
      btnChoseFile,
      name
    } = this.props;

    const { source, image, show, loading } = this.state;

    const classBlob = image || src ? ' blob' : '';

    const showLoading = loading && (image || src);

    this.input = null;
    return (
      <label
        className={`emenu-crop-image ${showLoading ? 'loading' : ''} ${classBlob} ${innerClass || ''}`}
        htmlFor={`crop-for-${name}`}
      >
        <input
          ref={input => this.input = input}
          type="file"
          hidden
          onChange={this.onChange}
          accept="image/x-png, image/gif, image/jpeg"
          name={name}
          id={`crop-for-${name}`}
        />
        <RenderImage
          onLoad={() => {
            this.setState({
              loading: false
            })
          }}
          image={image}
          src={src}
          textAdd={textAdd}>
          {children}
        </RenderImage>
        { showLoading && <Loading /> }
        <Dialog
          innerClass="emenu-dialog-crop"
          show={show}
          close={this.close}
          title={title}
        >
          <div className="e-dialog-content">
            <div className="e-dialog-body">
              <Cropper
                src={source}
                dragMode='move'
                style={{
                  height: 400,
                  width: 400
                }}
                cropBoxMovable={false}
                cropBoxResizable={false}
                viewMode={0}
                minCropBoxWidth={480}
                autoCropArea={1}
                aspectRatio={this.getInfoRatio().ratio}
                guides={true}
                onInitialized={this.onCropperInit}
                ref={e => { this.crop = e }}
              />
            </div>
            <div className="button-zooms">
              <button
                className="zoom"
                onClick={() => this.zoom(-0.1)}>
                <ZoomOut />
              </button>
              <button
                className="zoom"
                onClick={() => this.zoom(0.1)}>
                <ZoomIn />
              </button>

            </div>
            <div className="e-flex content-end e-p-top-15">
              <label htmlFor={`crop-for-${name}`}>
                <Button type="s3" className="e-m-right-10">{btnChoseFile}</Button>
              </label>
              <Button onClick={this.saveCropImage}>{btnDone}</Button>
            </div>
          </div>
        </Dialog>
      </label>
    );
  }
}

/**
 * Component add image.
 */
const ThumbDefault = ({ textAdd }) => (
  <>
    <FontAwesomeIcon
      icon={faImage}
      color="#db6533"
      size="2x" />
    <div>{textAdd}</div>
  </>
)

/**
 * Render image.
 */
const RenderImage = ({ image, src, children, textAdd, onLoad }) => {
  if (image) {
    return <img onLoad={onLoad} src={image} alt="crop-before" />
  } else if (src) {
    return <img onLoad={onLoad} src={src} alt="crop-after" />
  } else {
    return children ? children : <ThumbDefault textAdd={textAdd} />
  }
}

/**
 * Icon zomin.
 */
const ZoomIn = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
    </svg>
  );
}

/**
 * Icon zoomout.
 */
const ZoomOut = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
    </svg>
  );
}

CropImage.defaultProps = {
  close: () => { },
  save: () => { },
  btnChoseFile: 'Chose image',
  btnDone: 'Ok',
  title: 'Edit image',
  textAdd: 'Add images',
  ratio: 1
};

CropImage.propTypes = {
  name: PropTypes.string.isRequired
};

/**
 * Image loading.
 */
const Loading = () => (
  <div className="e-logo-loading">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 200 199.999">
      <g id="logo-loadding" transform="translate(-1092 -1521.001)">
        <path id="Path_593" data-name="Path 593" d="M-315.154,203.968a99.518,99.518,0,0,1-18.771-5.827,100,100,0,0,1-16.986-9.22,100.7,100.7,0,0,1-14.8-12.211,100.7,100.7,0,0,1-12.211-14.8,100,100,0,0,1-9.22-16.986,99.56,99.56,0,0,1-5.827-18.771A100.732,100.732,0,0,1-395,106a100.734,100.734,0,0,1,2.032-20.154,99.561,99.561,0,0,1,5.827-18.771,100,100,0,0,1,9.22-16.987,100.733,100.733,0,0,1,12.211-14.8,100.7,100.7,0,0,1,14.8-12.211,100.039,100.039,0,0,1,16.986-9.22,99.47,99.47,0,0,1,18.771-5.827A100.744,100.744,0,0,1-295,6a100.744,100.744,0,0,1,20.154,2.032,99.47,99.47,0,0,1,18.771,5.827,100.044,100.044,0,0,1,16.987,9.22,100.733,100.733,0,0,1,14.8,12.211,100.689,100.689,0,0,1,12.21,14.8,99.98,99.98,0,0,1,9.22,16.987,99.454,99.454,0,0,1,5.827,18.771A100.734,100.734,0,0,1-195,106a100.737,100.737,0,0,1-2.032,20.153,99.468,99.468,0,0,1-5.827,18.771,100,100,0,0,1-9.22,16.986,100.7,100.7,0,0,1-12.21,14.8,100.734,100.734,0,0,1-14.8,12.211,100,100,0,0,1-16.987,9.22,99.5,99.5,0,0,1-18.771,5.827A100.743,100.743,0,0,1-295,206,100.743,100.743,0,0,1-315.154,203.968ZM-371.923,106A77.01,77.01,0,0,0-295,182.923,77.01,77.01,0,0,0-218.077,106,77.01,77.01,0,0,0-295,29.077,77.01,77.01,0,0,0-371.923,106Zm86.014-36.014a22.727,22.727,0,0,1,22.727-22.727,22.727,22.727,0,0,1,22.727,22.727,22.727,22.727,0,0,1-22.727,22.727A22.727,22.727,0,0,1-285.909,69.986Z" transform="translate(1487 1515)" fill="#feb652" />
      </g>
    </svg>
  </div>
)
