import React, { Component } from 'react';
import CropImage from './CropImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Api from "../../services/api";
import _ from 'lodash';
const END_POINT = "/upload";

export default class CropList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: _.cloneDeep(props.images || [])
    }
  }

  /**
   * Get data image
   */
  getDataImage = () => {
    return this.state.images;
  }

  /**
   * Upload images after that return data images new
   */
  uploadImage = async () => {
    const { images } = this.state;
    try {
      return await Promise.all(images.map(async ({ image, blob, fileName }) => {
        if (blob) {
          let form = new FormData();
          form.append("files", blob, fileName);
          const { data } = await Api.post(`${END_POINT}`, form);
          return data.data[0].path;
        }
        return image;
      }))
    } catch (error) {
      return images
    }
  }

  render() {
    const { images } = this.state;
    const { max, textAdd, title, btnChoseFile, btnDone } = this.props;
    const styleCrop = images.length >= max ? { display: 'none' } : {}
    return (
      <div className="emenu-list-crop e-flex e-flex-row">
        {
          images.map((image, index) => {
            return (
              <div className="crop-image-box e-m-5" key={'create-' + index}>
                <CropImage
                  src={image.image}
                  innerClass="e-crop-thumb"
                  name={'create-' + index}
                  save={({ image, blob, fileName }) => {
                    this.setState(state => {
                      const _state = state
                      _state.images[index] = {
                        image, blob, fileName
                      }
                      return _state
                    })
                  }}
                  textAdd={textAdd}
                  title={title}
                  btnChoseFile={btnChoseFile}
                  btnDone={btnDone}
                />
                <CropImageTool
                  onClick={() => {
                    this.setState(state => {
                      const { images } = state
                      images.splice(index, 1)
                      return {
                        images,
                      }
                    })
                  }} />
              </div>)
          })
        }
        <div className="e-m-5 crop-image-box" style={styleCrop}>
          <CropImage
            ref={c => { this.cropNew = c }}
            innerClass="e-crop-thumb"
            name={'create-new'}
            save={({ image, blob, fileName }) => {
              this.setState(state => ({
                images: [...state.images, {
                  image,
                  blob,
                  fileName
                }]
              }), () => {
                this.cropNew.reset();
              })
            }}
            textAdd={textAdd}
            title={title}
          />
        </div>
      </div>
    )
  }
}


CropList.defaultProps = {
  max: 15,
  textAdd: "Add Images",
  title: "Chỉnh sửa ảnh",
  btnChoseFile: "Chọn ảnh",
  btnDone: "Ok"
};


/**
 * Component Remove
 */
const CropImageTool = ({ onClick }) => {
  return (
    <div className="crop-remove" onClick={onClick}>
      <FontAwesomeIcon
        icon={faTrashAlt}
        color="#f44336"
      />
    </div>
  )
}