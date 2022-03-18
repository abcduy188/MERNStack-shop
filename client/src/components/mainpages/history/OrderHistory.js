import React,{useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState';
import {Link} from 'react-router-dom';

function OrderHistory() {
    const state = useContext(GlobalState);
  return (
    <div>OrderHistory</div>
  )
}

export default OrderHistory