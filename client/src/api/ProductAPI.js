import React, { useState, useEffect } from 'react'
import axios from 'axios';

function ProductAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    const getProducts = async() => {
        const res = await axios.get(`/api/product?limit=${page*9}&${category}&${sort}&title[regex]=${search}`);
        setProducts(res.data.products);
        setResult(res.data.result);
        console.log(res.data);
    }
    useEffect(() => {
        getProducts()
    }, [callback, category, sort, page, search])
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        page: [page, setPage],
        result: [result, setResult],
        search: [search, setSearch]
    }

}

export default ProductAPI