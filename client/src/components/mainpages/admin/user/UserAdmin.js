import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";

function UserAdmin() {
  const state = useContext(GlobalState);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (token) {
      const getUsers = async () => {
        try {
          const res = await axios.get("/user/allusers", {
            headers: { Authorization: token },
          });
          setUsers(res.data);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUsers();
    }
  }, [callback, token]);

  const handlechangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Bạn không phải admin");
      if (edit) {
        const res = await axios.patch(
          `/user/update/${user._id}`,
          { ...user },

          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
        setEdit(false);
      } else {
        const res = await axios.post(
          "/user/createuser",
          { ...user },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }

      setCallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const editUser = async (user) => {
    setUser(user, (user.password = ""));
    setEdit(true);
  };
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/user/delete/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (error) {
      alert(error.respone.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="category">Tên</label>
          <input
            type="text"
            name="name"
            value={user.name || ""}
            required
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="category">Email</label>
          <input
            type="text"
            name="email"
            value={user.email || ""}
            required
            onChange={handlechangeInput}
          />
        </div>
        {edit ? (
          <div className="row">
            <label htmlFor="category">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handlechangeInput}
            />
          </div>
        ) : (
          <div className="row">
            <label htmlFor="category">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={user.password || ""}
              required
              onChange={handlechangeInput}
            />
          </div>
        )}
        <div className="row">
          <label htmlFor="category">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={user.address || ""}
            required
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="category">Role</label>
          <select name="role" value={user.role} onChange={handlechangeInput}>
            <option value="">Vui lòng chọn quyền</option>
            <option value="1">Admin</option>
            <option value="0">User</option>
          </select>
        </div>
        <button type="submit">{edit ? "Cập nhật" : "Thêm"}</button>
      </form>
      <div className="col">
        {users.map((item) => (
          <div className="row" key={item._id}>
            <p>{item.name}</p>
            <div>
              <button onClick={() => editUser(item)}>Sửa</button>
              <button onClick={() => deleteUser(item._id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserAdmin;
