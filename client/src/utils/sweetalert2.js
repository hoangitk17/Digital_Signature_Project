import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from '../components/common';

const Swals = withReactContent(Swal);
const ConfirmButton = ({ confirmButtonText }) => <Button>{confirmButtonText || 'OK'}</Button>;
const CancelButton = ({ cancelButtonText }) => <Button type='s2'>{cancelButtonText || 'Cancel'}</Button>;

export default {
  fire: options => Swals.mixin({
    showCloseButton: true,
    customClass: {
      confirmButton: '',
      cancelButton: ''
    },
    buttonsStyling: false
  }).fire({
    ...options,
    confirmButtonText: <ConfirmButton {...options} />,
    cancelButtonText: <CancelButton {...options} />
  })
}