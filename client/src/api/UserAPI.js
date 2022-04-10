import { useState, useEffect } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState([]);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callback, setCallback] = useState(false);
   
    useEffect(() => {
        if (token) {
            const getUser = async() => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    });
                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                    setCart(res.data.cart);
                    setUser(res.data);
        
                } catch (error) {
                    alert(error.response.data.msg);
                }
            }
            getUser();
        }
    }, [token]);
    


    //dependiences useeffect run when deps change
    const addCart = async(product) => {
        console.log("add cart dc goi ");
        if (!isLogged) return alert("Vui lòng đăng nhập trước");

        const check = cart.every(item => {
            return item._id !== product._id;
        })
        if (check) {
            setCart([...cart, {...product, quantity: 1 }]); //... is Spread and rest operators
            console.log([...cart, {...product, quantity: 1 }]);
            await axios.patch('/user/addcart', { cart: [...cart, {...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
            alert("Đã thêm sản phẩm vào giỏ hàng");
        } else {
            alert("Sản phẩm đã có sẵn trong giỏ hàng");
        }
    }
    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user: [user, setUser],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback]
    }
}

export default UserAPI;