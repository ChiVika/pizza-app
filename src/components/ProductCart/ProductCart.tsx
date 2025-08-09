import { Link } from 'react-router-dom';
import styles from './ProductCart.module.css';
import type { ProductCartProps } from './ProductCart.prop';
import type { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { CartAction } from '../../store/cart.slice';

function ProductCart(props: ProductCartProps){
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(CartAction.add(props.id))

    }
    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']}>
                <div className={styles['head']} style={{backgroundImage: `url('${props.image}')`}}>
                    <div className={styles['price']}>
                        {props.price}
                        <span className={styles['ru']}>₽</span>
                    </div>
                    <button className={styles['add-to-cart']} onClick={add}>
                        <img src="/cart-icon.svg" alt="cart-icon" />
                    </button>
                    <div className={styles['rating']}>
                        {props.rating}
                        <img src="/star.svg" alt="star" />
                    </div>
                </div>
                <div className={styles['footer']}>
                    <div className={styles['title']}>{props.name}</div>
                    <div className={styles['description']}>{props.description}</div>

                </div>
                
            </div>
        </Link>
        
    )
}

export default ProductCart;

