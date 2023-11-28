import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeProduct } from "../../store/products";
import { useModal } from "../../context/Modal";
import './DeleteProduct.css'


function ConfirmDeleteModal({product}) {
    const dispatch=useDispatch();
    const history=useHistory();
    const {closeModal} = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(removeProduct(product.id)).then(closeModal);
        history.push('/products')
    }

    return (
        <div className='delete-modal'>
            <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
        <button onClick={handleDelete}>Yes, delete my product.</button>
        <button onClick={closeModal}>No, keep my product.</button>
        </div>
    )
}
export default ConfirmDeleteModal;
