import React, {useState, useEffect} from 'react'
import axios from 'axios';
function ProductAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const getProducts = async()=>{
        const res = await axios.get('/api/product')
        setProducts(res.data.products)
    }
    useEffect(()=>{
        getProducts()
    },[callback])
  return {
    products:[products,setProducts],
    callback:[callback,setCallback]
  }
  
}

export default ProductAPI