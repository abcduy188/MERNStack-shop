import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import Loading from "../../utils/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  cpu: "",
  ram: 8,
  vga: "",
  weight: "",
  id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState); //gan product bang object mac dinh
  const [categories] = state.categoryAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productAPI.callback;

  const navigate = useNavigate();
  //edit
  const [products] = state.productAPI.products;
  const param = useParams();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (param.id) {
      products.forEach((element) => {
        if (element._id === param.id) {
          setProduct(element);
          setImages(element.images);
        }
      });
      setEdit(true);
    } else {
      setEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);
  //end edit
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Bạn không phải admin");
      const file = e.target.files[0];
      if (!file) return alert("Ảnh không tồn tại");
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      )
        alert("Vui lòng chọn ảnh");

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (error) {
      alert(error.respone.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("Bạn không phải admin");
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setImages(false);
    } catch (error) {
      alert(error.respone.data.msg);
    }
  };
  const handlechangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Bạn không phải admin");
      if (!images) return alert("Ảnh không đc bỏ trống");
      if (edit) {
        await axios.put(
          `/api/product/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/product",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      navigate("/");
    } catch (error) {
      alert(error.respone.data.msg);
    }
  };
  const styleupload = {
    display: images ? "block" : "none",
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleupload}>
            <img src={images ? images.url : ""} alt="" height="400px" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">ID sản phẩm</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handlechangeInput}
            disabled={edit}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">Tên sản phẩm</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">Giá</label>
          <input
            type="text"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">Mô tả</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">Nội dung</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            onChange={handlechangeInput}
            rows="5"
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">CPU</label>
          <input
            type="text"
            name="cpu"
            id="cpu"
            required
            value={product.cpu}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">VGA</label>
          <input
            type="text"
            name="vga"
            id="vga"
            required
            value={product.vga}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">RAM</label>
          <input
            type="number"
            min={1}
            name="ram"
            id="ram"
            required
            value={product.ram}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">Cân nặng</label>
          <input
            type="text"
            name="weight"
            id="weight"
            required
            value={product.weight}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="product_id">Danh mục: </label>
          <select
            name="category"
            value={product.category}
            onChange={handlechangeInput}
          >
            <option value="">Vui lòng chọn danh mục</option>
            {categories.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">
          {edit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
