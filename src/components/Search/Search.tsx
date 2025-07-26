
import { forwardRef } from 'react';
import styles from'./Search.module.css';
import cn from 'classnames';
import type { SearchProps } from './Search.props';
const Search = forwardRef<HTMLInputElement,  SearchProps>(function Input({className, isValid = true, ...props}, ref) {

	return (
		<>
            <div className={styles['input-wrapper']}>
                <img src="/search.svg" alt="search" className={styles['img']}/>
                <input {...props} ref={ref} className={cn(styles['search'], className, {
                    [styles['invalid']] : !isValid
                })}/>
            </div>
			
		</>
	);
});

export default Search;