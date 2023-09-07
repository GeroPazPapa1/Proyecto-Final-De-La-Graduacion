import React, { useEffect } from 'react'
import styles from './Cart.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, emptyCart, purchaseProducts, setCart } from '../../redux/actions';

export default function Cart() {
    const cartList = useSelector(state => state.cartList);
    const dispatch = useDispatch();
    const removeFromCart = (productId) => {
        dispatch(deleteProduct(productId));
    }

    const totalPrice = () => {
        return cartList.reduce((total, product) => {
            const productPrice = Number(product.price); // Convert price to number
            return total + productPrice;
        }, 0);
    }
    const handleEmptyCart = () => {
        dispatch(emptyCart())
    }
    const handleBuy = () => {
        dispatch(purchaseProducts(cartList))
    }
    useEffect(() => {
        // Carga el carrito desde localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            dispatch(setCart(parsedCart));
        }
        // Luego se guarda en el carrito en localStorage cada vez que el carrito cambie
        localStorage.setItem('cart', JSON.stringify(cartList));
    }, [cartList, dispatch]);
    return (
        <>
            {cartList.length === 0 ? (
                <div className={styles.nocars}>
                    <h2 className={styles.nocars_title}>
                        No cars added at the cart
                    </h2>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-car-off" width="72" height="72" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M15.584 15.588a2 2 0 0 0 2.828 2.83" />
                        <path d="M5 17h-2v-6l2 -5h1m4 0h4l4 5h1a2 2 0 0 1 2 2v4m-6 0h-6m-6 -6h8m4 0h3m-6 -3v-2" />
                        <path d="M3 3l18 18" />
                    </svg>
                    <Link to="/home" className={styles.keeplooking}>Keep looking</Link>
                </div>
            ) : (
                <div className={styles.cart}>
                    <div>
                        <h1>Your Cart</h1>
                        <Link to="/home" className={styles.keeplooking}> Keep looking </Link>
                    </div>
                    <div className={styles.products_detail}>
                        <div className={styles.products}>
                            <div className={styles.topics}>
                                <h3 className={styles.topic_product}>Product</h3>
                                <h3 className={styles.topic_price}>Price</h3>
                            </div>
                            {cartList.map((product) => (
                                <div className={styles.car_i} key={product.name}>
                                    {product.image && product.image[0] && <img className={styles.car_img} src={product.image[0]} alt='imagen' />}
                                    <div className={styles.name_and_brand}>
                                        <p>{product.name} {product.model}<br />{product.brand} </p>
                                    </div>
                                    <div className={styles.price_and_btnx}>
                                        <h4 className={styles.car_price}>${Number(product.price)}</h4>
                                    </div>
                                    <div className={styles.delete}>
                                        <div className={styles.delete_btn} onClick={() => removeFromCart(product.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.btnX} width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M18 6l-12 12" />
                                                <path d="M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.detail_info}>
                            <p className={styles.subtotal}>
                                Subtotal: ${totalPrice()} usd
                            </p>
                            <button className={styles.btn_buy} onClick={handleBuy}>Finish Order</button>
                            <button onClick={handleEmptyCart}>Empty Cart</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}
