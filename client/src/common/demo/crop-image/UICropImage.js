import React, { Component } from 'react';
import Share from '../Share'
import { PROPERTY } from '../../../../consts/settings/ui/cropImage'
import { CropImage, CropList } from '../../../common'
class UICropImage extends Component {
  state = {
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
  }
  render() {
    return (
      <Share propertys={PROPERTY}>
        <button onClick={async () => {
          const data = await this.cropList.uploadImage();
          console.log(data);
        }}>click </button>
        <CropList
          ref={ e => {this.cropList = e} }
          images={[
            {
              image: "https://api-stg.omenu.vn/images/6fe25e03-a7dd-4882-a87a-db5c2aca96bc/c7935ba8-517d-4c8f-b284-c7658ff787e5.png"
            },
            {
            image: "https://api-stg.omenu.vn/images/6fe25e03-a7dd-4882-a87a-db5c2aca96bc/13c4d6a1-2745-4295-a688-7a6881d9d153.png"
            }
          ]}
        />
        <h5>Crop Image default</h5>
        <CropImage
          name="file1"
          save={({image, blob})=> {
            this.setState({image1:image})
          }}
        />
        <h5>Crop Image set size</h5>
        <CropImage
          name="file2"
          src={this.state.image1}
            save={({image, blob})=> {
            this.setState({image2:image})
          }}
          innerClass="ui-set-image"
        />
          <h5>Crop Image set slot</h5>
        <CropImage
          name="file3"
          src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
          btnChoseFile="Chọn hình khác"
          btnDone="Đồng ý"
          title="chỉnh sửa hình"
          textAdd="Chọn hình"
          save={({image, blob})=> {
            this.setState({image3:image})
          }}
        >

        </CropImage>
        <h5>Crop Image set ratio</h5>
        <CropImage
          innerClass="ui-set-crop-1-2"
          src={this.state.image3}
          name="file"
          ratio={1/2}
          save={({image, blob})=> {
            this.setState({image4:image})
          }}
        >
        </CropImage>
      </Share>
    );
  }
}

export default UICropImage;
