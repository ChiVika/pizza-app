
import styles from './CartItem.module.css';
import type { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { CartAction } from '../../store/cart.slice';

function CartItem(props: CartItemProps){
    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(CartAction.add(props.id))
    }
    const descrease = () => {
        dispatch(CartAction.remove(props.id))
    }

    const remove = () => {
        dispatch(CartAction.delete(props.id))
    }
    return (
            <div className={styles['item']}>
                <div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}></div>
                    <div className={styles['description']}>
                        <div className={styles['name']}>{props.name}</div>
                        <div className={styles['price']}>{props.price}₽</div>
                    </div>
                    <div className={styles['actions']}>
                        <button className={styles['minus']} onClick={descrease}>
                            <img src="/remove-count.svg" alt="descrease" />
                        </button>
                        {props.count < 10 && <div className={styles['count']}>0{props.count}</div>}
                        {props.count >= 10 && <div className={styles['count']}>{props.count}</div>}
                        <button className={styles['plus']} onClick={increase}>
                            <img src="/add-count.svg" alt="increase" />
                        </button>
                        
                        <button className={styles['remove']} onClick={remove}>
                            <img src="/remove-product.svg" alt="remove" />
                        </button>
                    
                </div>
                    
                
                
            </div>
        
    )
}

export default CartItem;

