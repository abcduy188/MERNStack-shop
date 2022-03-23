import React,{useContext} from 'react';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/ProductItem/ProductItem';
import Loading from '../utils/loading/Loading';

function Product() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  const [images] = state.productAPI.images;

  return (
    <>
     <div className='products'>
        {
          products.map(product=>{
            
            return <ProductItem key={product._id} product={product} images={images}
            isAdmin={isAdmin} />
          })
        }
    </div>
    {products.length === 0 && <Loading />}
    </>
   
  )
}

export default Product