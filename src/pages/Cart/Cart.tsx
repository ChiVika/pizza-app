import { useDispatch, useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import type { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from './Cart.module.css';
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { CartAction } from "../../store/cart.slice";

const DELIVERY = 169;
export function Cart(){
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const items = useSelector((s: RootState) => s.cart.items)
    const jwt = useSelector((s: RootState) => s.user.jwt)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    //получение одного блюда
    const getItem = async(id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`)
        return data
    }
    //загрузка всех блюд в корзине
    const loadAllItems = async() => {
        const res = await Promise.all((items.map(i => getItem(i.id))));
        setCartProducts(res)
    }
    useEffect(() => {
        loadAllItems();
    }, [items])

    const total =  
        items.map(item => {
            const product = cartProducts.find(p => p.id === item.id);
            if(!product){
                return 0;
        }
        return item.count * product.price;
        }).reduce((acc, i) => acc += i, 0)
    
    const checkout = async() => {
        await axios.post(`${PREFIX}/order`,{
            products: items
        },
        {headers: {
            Authorization: `Bearer ${jwt}`
        }})
        dispatch(CartAction.clear());
        navigate('/order/success');
    }
    
    return(
        <div className={styles['container']}>
        
            <Headling className={styles['headling']}>Корзина</Headling>
            {items.map(item => {
                const product = cartProducts.find(p => p.id === item.id);
                if(!product){
                    return
                }
                return <CartItem key={item.id} count={item.count} {...product}/>
            })}
            <div className={styles['line']}>
                <div className={styles['text']}>Итог</div>
                <span className={styles['price']}>{total} <span><img src="/ru.svg" alt="ru" /></span></span>
            </div>
            <hr className={styles['hr']}/>
            <div className={styles['line']}>
                <div className={styles['text']}>Доставка</div>
                <span className={styles['price']}>{DELIVERY} <span></span><img src="/ru.svg" alt="ru" /></span>
            </div>
            <hr className={styles['hr']}/>
            <div className={styles['line']}>
                <div className={styles['text']}>Итого ({items.length})</div>
                <span className={styles['price']}>{total + DELIVERY} <span><img src="/ru.svg" alt="ru" /></span></span>
            </div>
            <Button appearence="big" className={styles['order']} onClick={checkout}>Оформить</Button>
        </div>
    ) 
}