import React,{useContext} from 'react';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/ProductItem/ProductItem';
function Product() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products
  console.log(state);
  return (
    <div className='products'>
        {
          products.map(product=>{
            return <ProductItem key={product._id} product={product}/>
          })
        }
    </div>
    
  )
}

export default Product