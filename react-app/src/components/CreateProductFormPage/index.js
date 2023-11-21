// frontend/src/components/LoginFormModal/index.js
// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProduct } from "../../store/products";

import "./CreateProductForm.css";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const member = useSelector((state) => state.session.member); // session.member?

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.00); //?
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(0);

  const [previewImg, setPreviewImg] = useState(null);
  const [productImg1, setProductImg1] = useState(null);
  const [productImg2, setProductImg2] = useState(null);
  const [productImg3, setProductImg3] = useState(null);
  const [productImg4, setProductImg4] = useState(null);

  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newProduct = {
      memberId: member.id,
      name,
      description,
      price,
      category,
      available,
      previewImg,
      productImg1,
      productImg2,
      productImg3,
      productImg4,
    };

    const res = await dispatch(createProduct(newProduct));

    if(!res.errors){
        // history.push(`/products/${product.id}`)
        yesSubmitted(true);
        reset()
    }

      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) {
      //     setErrors(data.errors);
      //   }
      // });
  };

  const reset = () => {
    setName("");
    setDescription("");
    setPrice(0.00);
    setCategory("");
    setAvailable(0);
    setPreviewImg("");
    setProductImg1("");
    setProductImg2("");
    setProductImg3("");
    setProductImg4("");
  };

  useEffect(() => {
    yesSubmitted(false);
    setErrors({});
  }, [submitted]);

  return (
    <div className="create-product-container">
      <h1>Add a Product</h1>
      <form onSubmit={handleSubmit} className="create-product-field">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Name of product"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=""
          />
          {/* {errors.address && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.address}</p>
          )} */}
        </div>

        <div>
          <label className="label">Description</label>
          <input
            type="textarea"
            placeholder="description of product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="text"
            placeholder="Price of product"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Category</label>
          <input
            type="text"
            placeholder="Category of product"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Available</label>
          <input
            type="number"
            placeholder="Name of product"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Preview Image</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Preview Image"
            // value={name}
            onChange={(e) => setPreviewImg(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 1</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Product Image"
            // value={name}
            onChange={(e) => setProductImg1(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 2</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Product Image"
            // value={name}
            onChange={(e) => setProductImg2(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 3</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Product Image"
            // value={name}
            onChange={(e) => setProductImg3(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 4</label>
          <input
            type="file"
            accept="image/*"
            placeholder="Product Image"
            // value={name}
            onChange={(e) => setProductImg4(e.target.value)}
            className=""
          />
        </div>

        <div className="create-product-button">
          <button className="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
