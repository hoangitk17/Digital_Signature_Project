import _ from 'lodash';
import jwtDecode from "jwt-decode";
export default {
  /**
   * Decode token
   * @param token
   *
   */
  decodeToken: function (token) {
    if (_.isUndefined(token) || _.isNull(token) || _.isEmpty(token)) {
      return "";
    }

    return jwtDecode(token);
  },

  /**
   * Check if image exist in URL
   */
  checkImageExists(imageUrl) {
    let imageData = new Image();
    imageData.onload = function () {
      return true;
    };
    imageData.onerror = function () {
      return false;
    };
    imageData.src = imageUrl;
  },

  /**
   * Check device type
   */
  getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  }
};
