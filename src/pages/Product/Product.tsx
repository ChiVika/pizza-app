import { useLoaderData, useNavigate } from "react-router-dom"
import type { Product } from "../../interfaces/product.interface";
import Headling from "../../components/Headling/Headling";
import styles from './Product.module.css';
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { CartAction } from "../../store/cart.slice";

export function Product(){

    const data = useLoaderData() as Product;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(CartAction.add(data.id))
    }
    return (
        <div className={styles['page']}>  
            <Button className={styles['cart']} onClick={increase}>
                <img src="/cart-icon.svg" alt="cart" />
                В корзину
            </Button>
            <div className={styles['header']}>
                <button className={styles['backPage']} onClick={() => navigate('/')}>
                    <img src="/backPage.svg" alt="backPage" />
                </button>
                <Headling>{data.name}</Headling>
            </div>
            <div className={styles['container']}>
                <div className={styles['image']} style={{backgroundImage: `url('${data.image}')`}}></div>
                <div className={styles['content']}>
                    <div className={styles['block']}>
                        <span className="span">Цена</span>
                        <div>
                            {data.price}
                            <img src="/ru.svg" alt="ru" />
                        </div>
                    </div>
                    <hr className={styles['hr']}/>
                    <div className={styles['block']}>
                        <span className="span">Рейтинг</span>
                        <div className={styles['rating']}>
                            {data.rating}
                            <img src="/star.svg" alt="star" />
                        </div>
                    </div>
                    <div className={styles['description']}>
                        <span className={styles['contain']}>Состав:</span>
                        <ul className={styles['ul']}>
                            {data.ingredients.map(i => (
                                <li key={data.ingredients.indexOf(i)}>{i}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
    
    
}

export default Product;