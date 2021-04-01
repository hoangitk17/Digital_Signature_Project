import { REQUEST_PAYMENT_LOCAL } from '../consts/constants';
import { get, save } from "../services/localStorage";
export default {
  getReqPayments: () => {
    const reqPayment = get(REQUEST_PAYMENT_LOCAL);

    if (reqPayment == null) {
      save(REQUEST_PAYMENT_LOCAL, true);
      return true;
    }

    return reqPayment;
  },
  updateReqPayments: (isRequestPayment) => {
    save(REQUEST_PAYMENT_LOCAL, isRequestPayment);
  }
}
