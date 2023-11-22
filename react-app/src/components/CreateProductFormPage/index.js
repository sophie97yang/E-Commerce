import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProduct, getAllProducts } from "../../store/products";

import "./CreateProductForm.css";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const member = useSelector((state) => state.session.member); // session.member?

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

  const [imageLoading, setImageLoading] = useState(false);

  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const categories = [
    'Fresh',
    'Bloomy Rind',
    'Wash Rind',
  ];

  useEffect(()=> {
    dispatch(getAllProducts()).catch(res => res)
  },[dispatch])


  useEffect(() => {
    yesSubmitted(false);
    setErrors({});
  }, [submitted]);

  if (member && !member.seller) return history.push('/login')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!name.length || name.length > 30)
      newErrors.push('Name must be between 1 and 31 characters');
    if (!description.length || description.length > 500)
      newErrors.push("Note's description must be between 1 and 501 characters");
    if (!price.length || price < 0)
      newErrors.push("Note's description must be between 1 and 501 characters");
    if (!category)
      newErrors.push('please select a category');
    if (!available || available < 0)
      newErrors.push('Please add at least 1 availability');
    if (!preview_img)
      newErrors.push('Please add a preview image');
    if (newErrors.length) {
      setErrors(newErrors);
      yesSubmitted(true);
      return;
    }



    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('price', price);
    form.append('category', category);
    form.append('available', available);
    form.append('preview_image', preview_img);
    form.append('product_image1', product_image1);
    form.append('product_image2', product_image2);
    form.append('product_image3', product_image3);
    form.append('product_image4', product_image4);

    setImageLoading(true);

    dispatch(createProduct(form)).then((res) => {
      setImageLoading(false);
      if (res.errors) {
        setErrors(res.errors)
      } else {
        history.push(`/products`)
        return ('success')
      }
    })


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
    <div className="create-product-container">
      <h1>Add a Product</h1>
      {/* {errors.length
        ? errors.map((e, index) => <p key={index} className='create-error'>{e}</p>)
        : null} */}
      {/* <form onSubmit={handleSubmit} className="create-product-field"> */}
      <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
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
          {/* <input */}
          <textarea
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
            // type="text"
            type="number"
            placeholder="Price of product"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=""
          >
            <option value="" disabled>Select a category</option>
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label className="label">Available</label>
          <input
            type="number"
            min="1"
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
            onChange={(e) => setPreview_img(e.target.files[0])}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 1</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image1(e.target.files[0])}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image2(e.target.files[0])}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 3</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image3(e.target.files[0])}
            className=""
          />
        </div>

        <div>
          <label className="label">Product Image 4</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProduct_image4(e.target.files[0])}
            className=""
          />
        </div>

        <div className="create-product-button">
          <button type="submit">Add Product</button>
        </div>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default CreateProductForm;
