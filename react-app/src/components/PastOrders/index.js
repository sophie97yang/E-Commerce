import React from "react";
import { useSelector } from "react-redux";
import {Link,useHistory} from 'react-router-dom';
import OrderDetails from "./OrderDetails";

function PastOrders() {
    const member = useSelector(state => state.session.member);
    const history = useHistory();

    if (!member) {
        history.push('/login')
        return null;
    }
    const past_orders = member.orders.filter(order => order.purchased==true);

    return (
        <div>
            <h2>Your Orders</h2>
            <h4>{past_orders.length} Orders</h4>
            {
                !past_orders.length && (
                    <div>
                    <h4>You look like you have not made any purchases.</h4>
                    <Link to='/products'>Let's Change That</Link>
                    </div>
                )
            }
            {past_orders && past_orders.map(order => (
                <div key={order.id}>
                    <OrderDetails order={order}/>
                </div>
            ))}

        </div>
    )

}

export default PastOrders
