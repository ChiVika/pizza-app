
import styles from'./Headling.module.css';
import cn from 'classnames';
import type { HeadlingProps } from './Headling.props';
function Headling({children, className, ...props}: HeadlingProps) {

	return (
		<>
			<h1 {...props} className={cn(className, styles['h1'])}>{children}</h1>
		</>
	);
}

export default Headling;