import { useState } from "react"
function CartForm({product}) {
    const [quantity,setQuantity] = useState(1)
    const handleChange = (e)=> {
        e.preventDefault();
        setQuantity(e.target.value)
    }
    return (
        <form>
            <input type='number' min='1' max={`${product.available}`} value={`${quantity}`} onChange={handleChange}  name='quantity'/>
        </form>
    )
}

export default CartForm
