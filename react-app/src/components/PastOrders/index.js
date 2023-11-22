import React from "react";
import { useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";

function PastOrders() {
    const member = useSelector(state => state.session.member)

    if (!member) return null;
    const past_orders = member.orders.filter(order => order.purchased==true);

    return (
        <div>
            <h1>Your Orders</h1>
            <h4>{past_orders.length}</h4>
            {past_orders.map(order => (
                <div key={order.id}>
                    <OrderDetails order={order}/>
                </div>
            ))}

        </div>
    )

}

export default PastOrders
