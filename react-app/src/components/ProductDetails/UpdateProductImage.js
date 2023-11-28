import {useState} from 'react';
import { editImage, getAllProducts } from '../../store/products';
import { useDispatch } from 'react-redux';
import {useModal} from '../../context/Modal';
import "./UpdateProductImage.css"

function UpdateProductImage({product,type}) {
    const [productImg,setProductImg] = useState(null);
    const [errors,setErrors] = useState(null);
    const dispatch = useDispatch();
    const {closeModal} =useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productImg) {
            setErrors({"productImg":"Please add an image (.jpg, .jpeg, .png, .gif, .pdf)"});
            return;
        }
        const form = new FormData();
        if (type==='preview') {
            form.append("preview_image", productImg);
        }
        else if (type===1) {
            form.append("product_image1", productImg);
        } else if (type===2){
            form.append("product_image2", productImg);
        } else if (type===3){
            form.append("product_image3", productImg);
        } else if (type===4){
            form.append("product_image4", productImg);
        }
        //to pass form validations
        form.append("available",product.available);
        form.append("category",product.category);
        form.append("description",product.description);
        form.append("name",product.name);
        form.append("price",product.price);


        dispatch(editImage(form,product.id)).then((res) => {
            if (res.errors) {
              setErrors(res.errors);
            } else {
                setErrors(null);
                dispatch(getAllProducts());
                closeModal();
            }
          });
    }
    return (
        <form className="update-image-form">
              <label className="update-product-title"> Add a New Product Image </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setProductImg(e.target.files[0])
                }}
                className=""
              />
              {errors?.productImg && (
                <p style={{ fontSize: "10px", color: "red" }}>*{errors.productImg}</p>
              )}
              <button onClick={handleSubmit}>Upload Image</button>
        </form>
    )
    }
    export default UpdateProductImage;
