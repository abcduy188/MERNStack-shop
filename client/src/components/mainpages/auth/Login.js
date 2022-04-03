import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({
    email:'', password:''
  })


  const onChangeInput = e =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }
  const loginSubmit = async e =>{
    e.preventDefault()
    try {
      await axios.post('/user/login',{...user});
      window.location.href="/";
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  return (
    <div className="login-page">
      <h2>Đăng nhập</h2>
      <form onSubmit={loginSubmit}>
        <input type="email" name='email' required  placeholder='Email' value={user.email} onChange={onChangeInput} />
        <input type="password" name='password'autoComplete='on' required placeholder='Mật khẩu' value={user.password}onChange={onChangeInput} />

        <div className="row">
          <button type='submit'>Đăng nhập</button>
          <Link to='/register'>Đăng ký</Link>
          </div>
        
        </form>
      </div>
  )
}

export default Login