import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProduct, getAllProducts } from "../../store/products";
import babyCheese from '../../assets/images/baby-cheese.png'

import "./CreateProductForm.css";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const member = useSelector((state) => state.session.member);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("1.00"); //?
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(1);
  const [preview_img, setPreview_img] = useState(null);
  const [product_image1, setProduct_image1] = useState(null);
  const [product_image2, setProduct_image2] = useState(null);
  const [product_image3, setProduct_image3] = useState(null);
  const [product_image4, setProduct_image4] = useState(null);

  const defaultImage =
    "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg";

  const [imageLoading, setImageLoading] = useState(false);

  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const categories = ["Fresh", "Bloomy Rind", "Washed Rind"];

  useEffect(() => {
    dispatch(getAllProducts()).catch((res) => res);
  }, [dispatch]);

  useEffect(() => {
    yesSubmitted(false);
    setErrors({});
  }, [submitted]);




  if (!member || !member?.seller) {
    history.push("/login");
    return null;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorList = {};

    if (!name.length || name.length > 30)
      errorList.name = "Name must be between 1 and 31 characters";
    if (!description.length || description.length > 500)
      errorList.description =
        "Note's description must be between 1 and 501 characters";
    if (!price.length || price < 0)
      errorList.price =
        "Note's description must be between 1 and 501 characters";
    if (!available || available < 0)
      errorList.available = "Please add at least 1 availability";
    if(!category) errorList.category = "Please select a category"

    if (!preview_img)
      errorList.preview_img =
        "Please add a preview image (.jpg, .jpeg, .png, .gif, .pdf)";

    // if(!product_image1) errorList.product_image1 = "Please add a product image"
    // if(!product_image2) errorList.product_image2 = "Please add a product image"
    // if(!product_image3) errorList.product_image3 = "Please add a product image"
    // if(!product_image4) errorList.product_image4 = "Please add a product image"

    if (Object.values(errorList).length > 0) {
      setErrors(errorList);
      return;
    }



    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("category", category);
    form.append("available", available);
    form.append("preview_image", preview_img);
    if (product_image1) {
      form.append("product_image1", product_image1);
    }
    // else {
    //   form.append("product_image1", defaultImage);
    // }
    if (product_image2) {
      form.append("product_image2", product_image2);
    }
    // else {
    //   form.append("product_image2", defaultImage);
    // }
    if (product_image3) {
      form.append("product_image3", product_image3);
    }
    // else {
    //   form.append("product_image3", defaultImage);
    // }
    if (product_image4) {
      form.append("product_image4", product_image4);
    }
    // else {
    //   form.append("product_image4", defaultImage);
    // }

    setImageLoading(true);

    dispatch(createProduct(form)).then((res) => {
      setImageLoading(false);
      if (res.errors) {
        setErrors(res.errors);
      } else {
        history.push(`/products`);
        yesSubmitted(true);
        // reset()
        return "success";
      }
    });

  };

  // const reset = () => {
  //   setName("");
  //   setDescription("");
  //   setPrice("0.00");
  //   setCategory("");
  //   setAvailable(1);
  //   setPreview_Img(null);
  //   setproduct_image1(null);
  //   setProduct_image2(null);
  //   setProduct_image3(null);
  //   setProduct_image4(null);
  // };




  return (
    <>

      <h1 className="add-product-title">Add a Product</h1>
      <img src={babyCheese} alt='baby-cheese' id='add-prod-img'></img>
    <div className="create-product-container">

      <form className="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Name of product"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=""
          />

          {errors.name && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.name}</p>
          )}

        </div>

        <div>
          <label className="label">Description</label>

          <textarea
            type="textarea"
            placeholder="Description of product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-field"
          />

        {errors.description && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.description}</p>
          )}

        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="number"
            step='0.01'
            placeholder="Price of product"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            className=""
          />

        {errors.price && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.price}</p>
          )}
        </div>



        <div>
          <label className="label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=""
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>

          {errors.category && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.category}</p>
          )}
        </div>

        <div>
          <label className="label">Available</label>
          <input
            type="number"
            min="1"
            placeholder="Number of available products"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className=""
          />

        {errors.available && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.available}</p>
          )}
        </div>


        <div>
          <label className="label">Preview Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPreview_img(e.target.files[0])}
            className=""
          />

        {errors.preview_img && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.preview_img}</p>
          )}


        </div>

        <div>
          <label className="label">Product Image 1</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image1(e.target.files[0])}
            className=""
          />
          {errors.product_image1 && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.product_image1}</p>
          )}
        </div>

        <div>
          <label className="label">Product Image 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image2(e.target.files[0])}
            className=""
          />
          {errors.product_image2 && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.product_image2}</p>
          )}
        </div>

        <div>
          <label className="label">Product Image 3</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image3(e.target.files[0])}
            className=""
          />
          {errors.product_image3 && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.product_image3}</p>
          )}
        </div>

        <div>
          <label className="label">Product Image 4</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image4(e.target.files[0])}
            className=""
          />
          {errors.product_image4 && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.product_image4}</p>
          )}
        </div>

        <div className="create-product-button">
          <button type="submit">Add Product</button>
        </div>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
    </>
  );
};

export default CreateProductForm;
