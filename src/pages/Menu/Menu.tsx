import { useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import ProductCart from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import type { Product } from "../../interfaces/product.interface";
import styles from './Menu.module.css';

export function Menu(){

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      getMenu();
    }, [])

    const getMenu = async() => {
      try{
        const res = await fetch(`${PREFIX}/products`);
        if(!res.ok){
          return 
        }
        else{
          const data = await res.json() as Product[];
          setProducts(data);
        }
      }
      catch(e){
        console.error(e);
      }
      
    }
    return <>
    <div className={styles['content']}>
      <Headling>Меню</Headling>
      <Search placeholder="Введите блюдо или состав"/>
    </div>
    <div>
      {products.map(p => (
        <ProductCart
          key={p.id}
          id={p.id}
          name={p.name}
          description={p.ingredients.join(',')}
          price={p.price}
          rating={p.rating}
          image={p.image}
        />
      ))}
      
    </div>
      
    </>
}