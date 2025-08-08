import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './Layout.module.css';
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from 'classnames';
export function Layout(){
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      console.log(location);
    }, [location])

    const logout = () => {
      localStorage.removeItem('jwt');
      navigate('/auth/login');
    }


    return (
      <div className={styles['layout']}>
        <div className={styles['sidebar']}>
          <div className={styles['user']}>
            <img src="/person.png" alt="ava" className={styles['ava']} />
            <div className={styles['name']}>Вика Чиняева</div>
            <div className={styles['email']}>animevita03@mail.ru</div>
          </div>
          <div className={styles['menu']}>
            <NavLink to='/' className={({isActive}) => cn(styles['link'],{
              [styles['active']]: isActive
            })}>
              <img src="/menu.svg" alt="menu" />
            Меню</NavLink>
            <NavLink to='/cart' className={({isActive}) => cn(styles['link'], {
              [styles['active']]: isActive
            })}>
            <img src="/cart.svg" alt="cart" />
            Корзина</NavLink>
          </div>
          <Button className={styles['exit']} onClick={logout}>
            <img src="/exit.svg" alt="exit" />
            Выход
          </Button>
      </div>
      
      <div className={styles['content']}>
        <Outlet/>
      </div>
    </div>
    );
    
};