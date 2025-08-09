import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './Layout.module.css';
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { profile, UserAction } from "../../store/user.slice";
export function Layout(){
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const dataProfile = useSelector((s: RootState) => s.user.profile);

    const items = useSelector((s: RootState) => s.cart.items)

    useEffect(() => {
      console.log(location);
    }, [location])

    const logout = () => {
      dispatch(UserAction.logout())
      navigate('/auth/login');
    }

    useEffect(() => {
      dispatch(profile());
    }, [dispatch])


    return (
      <div className={styles['layout']}>
        <div className={styles['sidebar']}>
          <div className={styles['user']}>
            <img src="/person.png" alt="ava" className={styles['ava']} />
            <div className={styles['name']}>{dataProfile?.name}</div>
            <div className={styles['email']}>{dataProfile?.email}</div>
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
            {items.reduce((acc, item) => acc+= item.count, 0)}
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