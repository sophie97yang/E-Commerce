import { useState } from "react"
function CartForm({product}) {
    const [quantity,setQuantity] = useState(`${product.quantity}`)
    const handleChange = (e)=> {
        e.preventDefault();
        setQuantity(e.target.value)
    }
    return (
        <form>
            <label for='quantity'>Quantity:
            <input type='number' min='1' max={`${product.product.available}`} value={`${quantity}`} onChange={handleChange}  name='quantity'/>
            </label>
        </form>
    )
}

export default CartForm
