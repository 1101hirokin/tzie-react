import clsx from 'clsx';
import styles from './component.module.css';
import type { Modify } from '../utils';

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

type TzieDataAttributes = {
    [dataAttr: `data-${string}`]: string | number | boolean;
};
export type TzieComponentProps = Modify<
    {
        id?: string;

        className?: string;

        style?: React.CSSProperties;

        children?: React.ReactNode;

        role?: React.AriaRole;
    },
    TzieDataAttributes
>;
