import clsx from 'clsx';
import styles from './component.module.css';

export const getTzComponentClassName = () => {
    return styles.tzComponent;
};

type CenteringDirection = 'x' | 'y' | 'all';

export const getCenteringClassName = (d: CenteringDirection) => {
    const classNames = [styles.centering];

    if (d === 'x') {
        classNames.push(styles.x);
    } else if (d === 'y') {
        classNames.push(styles.y);
    } else if (d === 'all') {
        classNames.push(styles.x, styles.y);
    }

    return clsx(...classNames);
};
