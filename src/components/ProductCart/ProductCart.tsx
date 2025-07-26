import { Link } from 'react-router-dom';
import styles from './ProductCart.module.css';
import type { ProductCartProps } from './ProductCart.prop';

function ProductCart(props: ProductCartProps){
    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']}>
                <div className={styles['head']} style={{backgroundImage: `url('${props.image}')`}}>
                    <div className={styles['price']}>
                        {props.price}
                        <span className={styles['ru']}>₽</span>
                    </div>
                    <button className={styles['add-to-cart']}>
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

