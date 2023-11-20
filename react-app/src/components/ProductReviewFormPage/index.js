// frontend/src/components/LoginFormModal/index.js
// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProducts } from './store/product'


import "./CreateProductForm.css";

function CreateProductForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const member = useSelector((state) => state.session.member) // session.member?


  const [rating, setRating] = useState(0)
  const [headline, setHeadline] = useState('')
  const [content, setContent] = useState('')
//   const [reviewDate, setReviewDate] = useState('')
  const [reviewImg, setReviewImg] = useState('')
  
   
  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});


    const newProduct = {
        // memberId: member.id,
        rating, headline, content, reviewImg,
        
    }


    const res = await dispatch(addProducts(newProduct))

    if(!res.errors){
        history.push(`/products/${product.id}`)
        yesSubmitted(true);
        reset()
    }

    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });

  };

  const reset = () => {
    setName("")
    setDescription("")

}

    useEffect(() => {
        yesSubmitted(false);

        setErrors({})
    }, [submitted])



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






        <div className="create-product-button"> 
        <button className="submit">Add Product</button>
        </div>

      </form>
    </div>
  );
}

export default CreateProductForm;