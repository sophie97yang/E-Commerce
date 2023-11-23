import OrderProductDetails from "./OrderProductDetails";

function OrderDetails({order}) {
    const products = order?.products;
    console.log(products);
    console.log(order.purchased_date);

    return (
    <div>
        <div className="order-details-bar">
            <p>Purchased On:{order.purchased_date}</p>
        </div>
    {products.map(product => (
        <div key={product.product.id}>
            <OrderProductDetails product={product} date={order.purchase_date}/>
        </div>
    ))}
    </div>
    )


}
export default OrderDetails
