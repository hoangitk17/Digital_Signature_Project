import React, { Component } from "react";

export default class ImageLoading extends Component {
  state = {
    loading: true,
    error: false
  }

  /**
   * onload of image
   */
  onLoad = () => {
    this.setState({
      loading: false
    })
  }

  /**
  * onerr of image
  */
  onError = () => {
    this.setState({
      error: true
    })
  }

  render() {
    const { src, innerClass } = this.props;
    const { loading, error } = this.state;
    const cssClassLoading = loading ? ' loading' : ''
    return (
      <div className={`emenu-image-loading${cssClassLoading} ${innerClass || ''}`}>
        <img
          className="e-image-loading"
          src={src}
          onLoad={this.onLoad}
          onError={this.onError} alt="" />
        <Loading loading={loading} error={error} />
      </div>
    );
  }
}

/**
 * Loading.
 */
const Loading = ({ loading, error }) => {
  if (loading && !error) {
    return <IconLoading />;
  } else if (loading && error) {
    return <IconError />;
  }
  return '';
}

/**
 * Image loading.
 */
const IconLoading = () => (
  <div className={`logo-loading`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 200 199.999">
      <g id="logo-loadding" transform="translate(-1092 -1521.001)">
        <path id="Path_593" data-name="Path 593" d="M-315.154,203.968a99.518,99.518,0,0,1-18.771-5.827,100,100,0,0,1-16.986-9.22,100.7,100.7,0,0,1-14.8-12.211,100.7,100.7,0,0,1-12.211-14.8,100,100,0,0,1-9.22-16.986,99.56,99.56,0,0,1-5.827-18.771A100.732,100.732,0,0,1-395,106a100.734,100.734,0,0,1,2.032-20.154,99.561,99.561,0,0,1,5.827-18.771,100,100,0,0,1,9.22-16.987,100.733,100.733,0,0,1,12.211-14.8,100.7,100.7,0,0,1,14.8-12.211,100.039,100.039,0,0,1,16.986-9.22,99.47,99.47,0,0,1,18.771-5.827A100.744,100.744,0,0,1-295,6a100.744,100.744,0,0,1,20.154,2.032,99.47,99.47,0,0,1,18.771,5.827,100.044,100.044,0,0,1,16.987,9.22,100.733,100.733,0,0,1,14.8,12.211,100.689,100.689,0,0,1,12.21,14.8,99.98,99.98,0,0,1,9.22,16.987,99.454,99.454,0,0,1,5.827,18.771A100.734,100.734,0,0,1-195,106a100.737,100.737,0,0,1-2.032,20.153,99.468,99.468,0,0,1-5.827,18.771,100,100,0,0,1-9.22,16.986,100.7,100.7,0,0,1-12.21,14.8,100.734,100.734,0,0,1-14.8,12.211,100,100,0,0,1-16.987,9.22,99.5,99.5,0,0,1-18.771,5.827A100.743,100.743,0,0,1-295,206,100.743,100.743,0,0,1-315.154,203.968ZM-371.923,106A77.01,77.01,0,0,0-295,182.923,77.01,77.01,0,0,0-218.077,106,77.01,77.01,0,0,0-295,29.077,77.01,77.01,0,0,0-371.923,106Zm86.014-36.014a22.727,22.727,0,0,1,22.727-22.727,22.727,22.727,0,0,1,22.727,22.727,22.727,22.727,0,0,1-22.727,22.727A22.727,22.727,0,0,1-285.909,69.986Z" transform="translate(1487 1515)" fill="#feb652" />
      </g>
    </svg>
  </div>
)

/**
 * Image error.
 */
const IconError = () => (
  <div className={`logo-error`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="362" height="363" viewBox="0 0 362 363">
      <g id="omenu-1" transform="translate(-1629 -2218)">
        <rect id="Rectangle_2281" data-name="Rectangle 2281" width="362" height="363" transform="translate(1629 2218)" fill="#fff" opacity="0" />
        <g id="Group_14" data-name="Group 14" transform="translate(7)">
          <path id="Path_595" data-name="Path 595" d="M44.961-26.133a26.809,26.809,0,0,0-1.172-8.34,17.063,17.063,0,0,0-3.242-5.957,12.986,12.986,0,0,0-4.922-3.555,16.287,16.287,0,0,0-6.25-1.172,16.287,16.287,0,0,0-6.25,1.172A12.986,12.986,0,0,0,18.2-40.43a17.063,17.063,0,0,0-3.242,5.957,26.809,26.809,0,0,0-1.172,8.34,26.809,26.809,0,0,0,1.172,8.34A16.852,16.852,0,0,0,18.2-11.855,13.271,13.271,0,0,0,23.125-8.3a16.053,16.053,0,0,0,6.25,1.191A16.053,16.053,0,0,0,35.625-8.3a13.271,13.271,0,0,0,4.922-3.555,16.852,16.852,0,0,0,3.242-5.937A26.809,26.809,0,0,0,44.961-26.133Zm9.883,0a33.752,33.752,0,0,1-1.7,10.957A24.215,24.215,0,0,1,48.184-6.6a22.3,22.3,0,0,1-8.008,5.586A27.685,27.685,0,0,1,29.375.977a27.685,27.685,0,0,1-10.8-1.992A22.3,22.3,0,0,1,10.566-6.6a24.215,24.215,0,0,1-4.961-8.574,33.752,33.752,0,0,1-1.7-10.957,33.752,33.752,0,0,1,1.7-10.957,24.215,24.215,0,0,1,4.961-8.574,22.3,22.3,0,0,1,8.008-5.586,27.685,27.685,0,0,1,10.8-1.992,27.685,27.685,0,0,1,10.8,1.992,22.3,22.3,0,0,1,8.008,5.586,24.215,24.215,0,0,1,4.961,8.574A33.752,33.752,0,0,1,54.844-26.133ZM120.1-23.047q0-1.211-.078-2.266a11,11,0,0,0-.273-1.836,5.155,5.155,0,0,0-1.68-2.773,5.448,5.448,0,0,0-3.516-1.094,9.485,9.485,0,0,0-2.5.352,13.489,13.489,0,0,0-2.559,1,14.2,14.2,0,0,0-2.422,1.563,14.146,14.146,0,0,0-2.09,2.051V0H95.723V-23.047q0-1.211-.078-2.266a11,11,0,0,0-.273-1.836,5.207,5.207,0,0,0-1.66-2.773,5.43,5.43,0,0,0-3.535-1.094,9.485,9.485,0,0,0-2.5.352,13.489,13.489,0,0,0-2.559,1A14.2,14.2,0,0,0,82.7-28.105a14.147,14.147,0,0,0-2.09,2.051V0H71.348V-37.852H79l.859,5.273h.156a13.9,13.9,0,0,1,2.07-2.3,14.5,14.5,0,0,1,2.832-1.992A16.559,16.559,0,0,1,88.4-38.262a14.867,14.867,0,0,1,4-.527,13.638,13.638,0,0,1,6.738,1.66,10.621,10.621,0,0,1,4.551,5.176h.156a18.432,18.432,0,0,1,2.441-2.773,14.894,14.894,0,0,1,2.988-2.148,15.9,15.9,0,0,1,3.535-1.406,15.562,15.562,0,0,1,4.043-.508,13.246,13.246,0,0,1,6.816,1.7,11.16,11.16,0,0,1,4.238,4.551,9.59,9.59,0,0,1,.664,1.621,14.306,14.306,0,0,1,.449,1.973q.176,1.094.254,2.422t.078,3.047V0H120.1ZM166.524-6.484a30.661,30.661,0,0,0,5.625-.547,43.528,43.528,0,0,0,5.938-1.562v7.383A27.716,27.716,0,0,1,172.579.273a41.259,41.259,0,0,1-7.7.7,27.6,27.6,0,0,1-7.637-1.035,16.611,16.611,0,0,1-6.309-3.34,16.075,16.075,0,0,1-4.277-5.977,22.467,22.467,0,0,1-1.582-8.906,25.11,25.11,0,0,1,1.484-9.023,18.365,18.365,0,0,1,3.984-6.406,16.4,16.4,0,0,1,5.723-3.809,18.016,18.016,0,0,1,6.66-1.27,19.354,19.354,0,0,1,6.621,1.094,13.3,13.3,0,0,1,5.234,3.438,16.066,16.066,0,0,1,3.438,6.035,27.691,27.691,0,0,1,1.23,8.73q-.039,1.953-.117,3.32h-24.8A11.347,11.347,0,0,0,155.7-11.7a8.616,8.616,0,0,0,2.559,3.008,10.537,10.537,0,0,0,3.691,1.68A18.811,18.811,0,0,0,166.524-6.484Zm-3.711-25.078a7.246,7.246,0,0,0-3.125.645,7.333,7.333,0,0,0-2.363,1.758,8.578,8.578,0,0,0-1.582,2.6,12.515,12.515,0,0,0-.781,3.164h14.883a10.868,10.868,0,0,0-.449-3.164,7.782,7.782,0,0,0-1.328-2.6,6.284,6.284,0,0,0-2.187-1.758A6.863,6.863,0,0,0,162.813-31.562Zm41.27-1.016h.156a13.9,13.9,0,0,1,2.07-2.3,14.267,14.267,0,0,1,2.852-1.992,16.8,16.8,0,0,1,3.535-1.387,15.6,15.6,0,0,1,4.121-.527,16.935,16.935,0,0,1,4,.469,11.994,11.994,0,0,1,3.535,1.465,10.819,10.819,0,0,1,2.832,2.578,12.115,12.115,0,0,1,1.934,3.77,12.443,12.443,0,0,1,.527,2.637q.137,1.426.137,3.3V0h-9.258V-23.125a25.032,25.032,0,0,0-.117-2.617,7.689,7.689,0,0,0-.43-1.914,4.783,4.783,0,0,0-2.129-2.578,7.1,7.1,0,0,0-3.457-.781,11.218,11.218,0,0,0-5.176,1.27,13.357,13.357,0,0,0-4.395,3.691V0h-9.258V-37.852h7.656ZM264.182.977a20.527,20.527,0,0,1-9.453-1.934,13.53,13.53,0,0,1-5.664-5.215,13.983,13.983,0,0,1-1.5-3.867,20.815,20.815,0,0,1-.488-4.687V-37.852h9.258V-15.7a17.3,17.3,0,0,0,.273,3.3,8.533,8.533,0,0,0,.82,2.4,5.935,5.935,0,0,0,2.656,2.559,9.257,9.257,0,0,0,4.1.84,9.061,9.061,0,0,0,4.277-.937,6,6,0,0,0,2.676-2.852,11.862,11.862,0,0,0,.9-5.117V-37.852h9.258v23.125a17.086,17.086,0,0,1-1.6,7.773,12.97,12.97,0,0,1-2.324,3.262,13.61,13.61,0,0,1-3.359,2.5,17.711,17.711,0,0,1-4.375,1.6A24.157,24.157,0,0,1,264.182.977Z" transform="translate(1660 2580)" fill="#feb652" />
          <path id="Path_594" data-name="Path 594" d="M-280.82,289.094a142.311,142.311,0,0,1-26.842-8.333,142.992,142.992,0,0,1-24.29-13.184,144,144,0,0,1-21.163-17.462,144,144,0,0,1-17.462-21.163,143,143,0,0,1-13.185-24.29,142.373,142.373,0,0,1-8.332-26.842A144.048,144.048,0,0,1-395,149a144.051,144.051,0,0,1,2.905-28.82,142.373,142.373,0,0,1,8.332-26.842,143,143,0,0,1,13.185-24.291,144.049,144.049,0,0,1,17.462-21.164,144,144,0,0,1,21.163-17.462,143.055,143.055,0,0,1,24.29-13.184A142.241,142.241,0,0,1-280.82,8.906,144.063,144.063,0,0,1-252,6a144.063,144.063,0,0,1,28.82,2.905,142.241,142.241,0,0,1,26.842,8.332,143.063,143.063,0,0,1,24.291,13.184,144.049,144.049,0,0,1,21.163,17.462,143.986,143.986,0,0,1,17.461,21.164,142.97,142.97,0,0,1,13.185,24.291,142.221,142.221,0,0,1,8.332,26.842A144.05,144.05,0,0,1-109,149a144.054,144.054,0,0,1-2.905,28.819,142.241,142.241,0,0,1-8.332,26.842,143,143,0,0,1-13.185,24.29,144,144,0,0,1-17.461,21.163,144.049,144.049,0,0,1-21.163,17.462,143,143,0,0,1-24.291,13.184,142.29,142.29,0,0,1-26.842,8.333A144.064,144.064,0,0,1-252,292,144.064,144.064,0,0,1-280.82,289.094ZM-362,149A110.125,110.125,0,0,0-252,259,110.124,110.124,0,0,0-142,149,110.125,110.125,0,0,0-252,39,110.125,110.125,0,0,0-362,149Zm123-51.5A32.5,32.5,0,0,1-206.5,65,32.5,32.5,0,0,1-174,97.5,32.5,32.5,0,0,1-206.5,130,32.5,32.5,0,0,1-239,97.5Z" transform="translate(2055 2213)" fill="#feb652" />
        </g>
      </g>
    </svg>
  </div>
)
