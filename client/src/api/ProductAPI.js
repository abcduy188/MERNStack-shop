import React, {useState, useEffect} from 'react'
import axios from 'axios';
function ProductAPI() {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const getProducts = async()=>{
        const res = await axios.get('/api/product')
        setProducts(res.data.products);
        setImages(res.data.images);
    }
    useEffect(()=>{
        getProducts()
    },[])
  return {
    products:[products,setProducts],
    images: [images, setImages]
  }
  
}

export default ProductAPI