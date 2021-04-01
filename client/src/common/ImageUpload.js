import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCaretLeft,
  faCaretRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import api from "../../services/api";
const endPoint = "/upload";

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick} >
      <FontAwesomeIcon icon={faCaretRight} />
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faCaretLeft} style={{ color: "black" }} />
    </div>
  );
}

class ImageUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: [],
      source: [...props.source],
      updateSource: [],
      selected: {
        index: 0,
        source: props.source.length > 0
      }
    }
  }

  handlerFile = async (event) => {
    const { image } = this.state;
    await this.setState({
      image: [...event.target.files, ...image],
      selected: {
        index: 0,
        source: false
      }
    });

    this.props.onChange(this.state.image)
  };

  onRemoveImage = () => {
    const { image, selected, source, updateSource } = this.state;
    if (selected.source) {
      const update = [...updateSource, ...source.splice(selected.index, 1)];
      this.setState({ updateSource: update })
      if (source.length === 0) {
        selected.source = false;
        selected.index = image.length - 1;
      } else if (selected.index === 0 && image.length > 0) {
        selected.source = false;
        selected.index = image.length - 1;
      } else {
        selected.index = selected.index !== 0 ? selected.index - 1 : 0;
      }
    } else {
      image.splice(selected.index, 1);
      if (image.length === 0) {
        selected.source = true;
        selected.index = 0;
      } else {
        selected.index = selected.index !== 0 ? selected.index - 1 : 0;
      }
    }

    this.setState({
      selected,
      image: [...image],
      source: [...source]
    });
  };

  getImage = async () => {
    const { image, updateSource } = this.state;
    let data = new FormData();
    for (let i = 0; i < image.length; i++) {
      data.append("files", image[i]);
    }
    const res = await api.post(`${endPoint}?language=vi`, data);
    const updateImage = res.data.data.map(image => ({...image, id: ''}))
    const dataPath = [...updateSource, ...updateImage]
    return dataPath
  }

  render() {
    const settings = {
      infinite: false,
      speed: 200,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    const { image, selected, source } = this.state;
    return (
      <div className="emenu-image-upload">
        <div className="upload-box">
          {image.length === 0 && source.length === 0 ? (
            <label href="#" className="main-btn upload-btn ">
              {/* {t("dishManagaments.addImg")} */}
              Chose file
              <input
                multiple
                type="file"
                hidden
                defaultValue=""
                ref={(el) => (this.inputImage = el)}
                onChange={this.handlerFile}
                accept="image/*"
              />
            </label>
          ) : (
            <>
              <div className="add-new-image" onClick={() => this.fileIP.click()}>
                <input
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  defaultValue=""
                  ref={(fileIP) => (this.fileIP = fileIP)}
                  onChange={this.handlerFile}
                  accept="image/*"
                />
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ fontSize: "23px", color: "white" }}
                />
              </div>
              <div className="uploaded-img">
                <img
                  className="image-big"
                  src={selected.source ? source[selected.index].image_link : URL.createObjectURL(image[selected.index])}
                  aria-hidden
                  alt="Picture of me taking a photo of an image"
                />
                <span className="remove-btn" onClick={this.onRemoveImage}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ fontWeight: "600px" }}
                  />
                </span>
              </div>
              <div className="slider-images">
                <Slider {...settings}>
                  {/* Image */}
                  {image.map((item, index) => (
                    <div key={index}>
                      <div
                        className={`image-box ${
                          index === selected.index && !selected.source ? "selected" : ''
                          }`}
                        onClick={() => {
                          this.setState({
                              selected: {
                                index,
                                source: false
                              }
                            });
                          }}
                      >
                        <img
                          className="image-small"
                          src={URL.createObjectURL(item)}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                  {/* Source */}
                  {source.map((item, index) => (
                    <div key={index}>
                      <div
                        className={`image-box ${
                          index === selected.index && selected.source ? "selected" : ''
                          }`}
                        onClick={() => {
                          this.setState({
                              selected: {
                                index,
                                source: true
                              }
                            });
                        }}
                      >
                        <img
                          className="image-small"
                          src={item.image_link}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.defaultProps = {
  source: [],
  onChange: (data) => {
    console.log(data)
  }
};

export default ImageUpload;