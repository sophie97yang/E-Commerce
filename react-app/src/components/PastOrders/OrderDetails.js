import OrderProductDetails from "./OrderProductDetails";
import './OrderDetails.css'
function OrderDetails({order}) {
    const products = order?.products;
    const date = new Date(order.purchase_date);
    const date_to_show = date.toDateString();
    let total_price=0;
    products.forEach(product => total_price+=(product.product.price*product.quantity))
    return (
    <div>
        <div className="order-details-bar">
            <p>Purchased On:{date_to_show}</p>
            <p>Total: ${total_price} </p>
        </div>
    {products.map(product => (
        <div key={product.product.id}>
            <OrderProductDetails product={product} date={date}/>
        </div>
    ))}
    </div>
    )


}
export default OrderDetails
