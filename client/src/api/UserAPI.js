import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState([]);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(()=>{
            if(token){
                const getUser = async()=>{
                    try {
                        const res = await axios.get('/user/infor',{
                            headers: {Authorization : token}
                        })
                        setIsLogged(true);
                        res.data.role === 1? setIsAdmin(true): setIsAdmin(false);
                        setCart(res.data.cart);
                     
                    } catch (error) {
                        alert(error.response.data.msg)
                    }
                }
                getUser()
            }
            
    },[token]) //dependiences useeffect run when deps change

    const addCart = async(product) =>{
        if(!isLogged) return alert("Please Login to continue buying");

        const check = cart.every(item =>{
            return item._id !== product._id;
        })
        if(check){
            setCart([...cart,{...product,quantity: 1}]); //... is Spread and rest operators
            console.log([...cart,{...product,quantity: 1}]);
            await axios.patch('/user/addcart', {cart:[...cart, {...product, quantity: 1}]},{
                headers: {Authorization: token}
            })
            
        }else{
            alert("This item has been added to cart");
        }
    }
    return{
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        user :[user, setUser],
        cart:[cart, setCart],
        addCart: addCart,
        history:[history, setHistory],
    }
}
export default UserAPI;