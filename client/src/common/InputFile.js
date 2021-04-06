import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
// import api from "../../services/api";
// const endPoint = "/upload";

export default class InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image
    };
    this.exampleRef = React.createRef();
  }
  onChange = event => {
    let img = event.target.files[0]
    this.setState({ image: img });
    event.preventDefault()
    this.props.onChange(img);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.image !== prevState.image && nextProps.image != undefined) {
      console.log("1")
      return {
        image: nextProps.image
      };
    }
    return null;
  }

//   getImage = async () => {
//     const { image } = this.state
//     let data = new FormData();
//     data.append("files", image);
//     const res = await api.post(`${endPoint}?language=vi`, data);
//     let dataPath = res.data.data[0].path
//     return dataPath
//   }
  render() {
    const { image } = this.state;
    return (
      <label className="emenu-file-input">
        <input
          type="file"
          className="hide"
          ref={this.exampleRef}
          onChange={this.onChange}
        />
        {image ?
          <div className="image"
            style={{ backgroundImage: `url(${typeof image === 'string' ? image : URL.createObjectURL(image)})` }}>
          </div> :
          <div className="emenu-file-icon">
            <FontAwesomeIcon
              icon={faImage}
              color="#0d6efd"
              size="3x" />
            <div>Thêm hình ảnh</div>
          </div>
        }
      </label>
    )
  }
}
InputFile.propTypes = {
  onChange: PropTypes.func.isRequired
};
