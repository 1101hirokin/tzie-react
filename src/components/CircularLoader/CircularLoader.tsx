import clsx from 'clsx';
import type { Modify } from '../../utils';
import styles from './CircularLoader.module.css';
import type { TzieComponentProps } from '../component';

type CircularLoaderProps = Modify<TzieComponentProps, {}>;

export const CircularLoader: React.FC<CircularLoaderProps> = (p) => {
    const { id, className, style, ...rest } = p;

    return (
        <div
            id={id}
            className={clsx(className, styles.CircularLoader)}
            style={{
                ...style,
            }}
            {...rest}
        >
            <div className={styles.spinner}></div>
        </div>
    );
};
