import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateProduct, getAllProducts } from "../../store/products";
import { useModal } from '../../context/Modal';

const UpdateProductForm = () => {
    const { id } = useParams()

    // console.log('produtSingle', singleProduct)
    // const productId = singleProduct.id
    // console.log('product Id', productId)

    const { closeModal } = useModal()
    const products = useSelector(state=>state.products.products)
    const product = products[id]
    const dispatch = useDispatch();
    const history = useHistory();
    const member = useSelector((state) => state.session.member); // session.member?

    console.log('this i s prodt', product)


    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price); //?
    const [category, setCategory] = useState(product.category);
    const [available, setAvailable] = useState(product.available);

    // const [preview_img, setPreview_img] = useState();
    // const [product_image1, setProduct_image1] = useState();
    // const [product_image2, setProduct_image2] = useState();
    // const [product_image3, setProduct_image3] = useState();
    // const [product_image4, setProduct_image4] = useState();

    // const [imageLoading, setImageLoading] = useState(false);

    const [submitted, yesSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    const categories = [
        'Fresh',
        'Bloomy Rind',
        'Wash Rind',
    ];


    useEffect(() => {
        dispatch(getAllProducts()).catch(res => res)
    }, [])

console.log('before handleSubmit')
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors({});
        const newErrors = [];
        console.log('after handleSubmit')

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
        // if (!preview_img)
        //     newErrors.push('Please add a preview image');
        if (newErrors.length) {
            setErrors(newErrors);
            yesSubmitted(true);
            return;
        }

        const form = new FormData();
        // form.append('seller', member.id)
        form.append('name', name);
        form.append('description', description);
        form.append('price', price);
        form.append('category', category);
        form.append('available', available);
        // form.append('preview_image', preview_img);
        // form.append('product_image1', product_image1);
        // form.append('product_image2', product_image2);
        // form.append('product_image3', product_image3);
        // form.append('product_image4', product_image4);

        // const res = await dispatch(createProduct(newProduct));

        // if(!res.errors){
        //     history.push(`/products/${id}`)
        //     yesSubmitted(true);
        //     reset()
        // }

        console.log('updateProductBEFORE DISPARCH')
        dispatch(updateProduct(form, id)).then((res) => {
            if (res.errors) {
                setErrors(res.errors)
            } else {
                console.log('update product successful react act, res', res)
                history.push(`/products`)
                closeModal()
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

    useEffect(() => {
        yesSubmitted(false);
        setErrors({});
    }, [submitted]);


    return (
        <div className="create-product-container">
            <h1>Update Your Product</h1>
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

                {/* <div>
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
                </div> */}

                {/* <div>
                    <label className="label">Product Image 2</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProduct_image2(e.target.files[0])}
                        className=""
                    />
                </div> */}
{/*
                <div>
                    <label className="label">Product Image 3</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProduct_image3(e.target.files[0])}
                        className=""
                    />
                </div> */}

                {/* <div>
                    <label className="label">Product Image 4</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProduct_image4(e.target.files[0])}
                        className=""
                    />
                </div> */}

                <div className="update-product-button">
                    <button type="submit">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductForm;
