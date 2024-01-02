import {useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {getAllProducts} from '../../store/products';
import cheeseCheck from '../../assets/images/cheese-check.png';

import "./OrderComplete.css"


const OrderComplete = () => {
    const {orderId} = useParams();
    const dispatch = useDispatch();
    const member = useSelector(state=>state.session.member);
    const products = useSelector(state=>state.products.products);

    useEffect(()=> {
        dispatch(getAllProducts());
    },[dispatch])

    if (!products) return null;
    //find order
    const order = member.orders.filter(user_order=>user_order.id===parseInt(orderId))[0];
    //create string listing products
    //create string listing sellers
    //create recommendations
    let product_list=[];
    let seller_list =[];
    const recommendations=[]
    order.products.forEach(product=>{
        product_list.push(product.product.name);
        seller_list.push(`${product.product.seller.first_name} ${product.product.seller.last_name}`);
        const recommended_products=Object.values(products).filter(product_1=>product_1.category === product.product.category)
        const recommendation={"name":product.product.name,"products":recommended_products};
        recommendations.push(recommendation);
    })
    product_list=product_list.join(', ')
    seller_list = seller_list.join(', ')





    return (
        <div>
            <h2 className="thank-you-block">Thank you, your order has been placed.<img src={cheeseCheck}></img></h2>

            <div className="thank-you-container">


            <div className='ty-order-info'>
            <p>Your Order: <span id='transaction_product_list'>{product_list}</span> will be shipped to {member.first_name} {member.last_name} - by {seller_list}</p>
            <Link to='/orders/past'><button>Check your order status</button></Link>
            </div>

            <h4>Here are some products you may like:</h4>
                <div class='recommendations'>
                    <p>Based on your recent order of {recommendations[0].name}, we recommend:</p>
                    <div id='rec-list'>
                    {recommendations[0].products.map(product=> (

                        <Link to={`/products/${product.id}`}><img alt={product.name} src={product.preview_image} className="thank-you-product"></img></Link>

                    ))}
                    </div>
                </div>

                </div>
        </div>
    )

}

export default OrderComplete;
