import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeProduct } from "../../store/products";
import { useModal } from "../../context/Modal";


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
        <div>
        <p>Are you sure you want to delete this product?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
        </div>
    )
}
export default ConfirmDeleteModal;
