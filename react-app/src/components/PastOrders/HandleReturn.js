import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate, createReturn } from "../../store/session";
import { useModal } from "../../context/Modal";
import { getAllProducts } from "../../store/products";
import './returnModal.css';

function HandleReturn({ product }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  console.log(product);

  useEffect(() => {
    dispatch(getAllProducts()).catch((res) => res);
  }, [dispatch]);

  const handleReturn = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      createReturn(product.order_id, product.product.id)
    ).catch((res) => res);
    if (!res.errors) {
      dispatch(authenticate())
        .then(closeModal);
    }
  };
  return (
    <div className='return-modal'>
      {!product.returned ? (
        <>
          <p>
            We want to hear from you. We are sorry you didn't enjoy the{" "}
            {product.product.name}.
          </p>
          <label>
            Why are you returning this?
            <input type="text" />
          </label>
          <button onClick={handleReturn}>Confirm Return </button>
        </>
      ) : (
        <>
          <p>You have already completed this return.</p>
        </>
      )}
    </div>
  );
}

export default HandleReturn;
