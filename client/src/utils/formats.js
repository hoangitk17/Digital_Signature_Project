import _ from "lodash";
import moment from "moment";

export default {
  moneyFormat: function (number) {
    if (!_.isNull(number)) {
      return new Intl.NumberFormat().format(Number(number));
    }
    return "";
  },
  /**
   * Format date string to date format (YYYY/MM/DD)
   * @param dateStr
   *
   */
  dateYYYYMMDD: function (dateStr) {
    if (_.isUndefined(dateStr) || _.isNull(dateStr) || _.isEmpty(dateStr)) {
      return "";
    }

    return moment(dateStr).format("YYYY/MM/DD");
  },
  /**
   * Format date string to time format
   * @param dateStr
   *
   */
  timeFormat: function (dateStr, format) {
    if (_.isUndefined(dateStr) || _.isNull(dateStr) || _.isEmpty(dateStr)) {
      return "";
    }
    return moment(dateStr).format(format ? format : 'HH:mm');
  },
};
