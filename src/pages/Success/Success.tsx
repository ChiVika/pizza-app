import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Success.module.css';

export function Success(){
    const navigate = useNavigate();

    const newOrder = () => {
        navigate('/');
    }
    return <>
    <div className={styles['success']}>
        <img className={styles['img']} src="/pizza.svg" alt="pizza" />
        <div className={styles['text']} >Ваш заказ успешно офрмлен!</div>
        <Button appearence="big" onClick={newOrder}>Сделать новый</Button>
    </div>
    </>
}