import React from "react";
import { useSelector } from "react-redux";
import {Link,useHistory} from 'react-router-dom';
import OrderDetails from "./OrderDetails";
import './PastOrders.css';
import lonelyCheese from '../../assets/images/lonely-cheese.png';

function PastOrders() {
    const member = useSelector(state => state.session.member);
    const history = useHistory();

    if (!member) {
        history.push('/login')
        return null;
    }
    const past_orders = member.orders.filter(order => order.purchased==true);


    return (
        <div className="orders-container">
            <h2 className="yourOrdersTitle">Your Orders</h2>
            <h4 className="howManyOrders">{past_orders.length} {past_orders.length === 1 ? 'Order' : 'Orders'}</h4>
            {
                !past_orders.length && (
                    <div id='no-purchase'>
                    <h4>Looks like you have not made any purchases...</h4>
                    <img src={lonelyCheese} alt='cheese'></img>
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
