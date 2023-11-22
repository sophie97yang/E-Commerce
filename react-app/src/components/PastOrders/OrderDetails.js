function OrderDetails({order}) {
    const products = order.products();
    console.log(products);

    // return products.map(product => (
    //     <div key={product.id}>


    //     </div>
    // ))


}
export default OrderDetails
