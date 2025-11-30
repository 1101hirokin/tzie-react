import clsx from 'clsx';
import { getElevationClassName, type TzieElevation } from '../../tokens';
import type { Modify, TzieComponentProps } from '../../utils';
import commonStyles from '../component.module.css';
import styles from './Button.module.css';

type ButtonProps = Modify<
    TzieComponentProps,
    {
        elevation?: TzieElevation;
        block?: boolean;
        disabled?: boolean;

        // button specific props
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
        type?: 'button' | 'submit' | 'reset';
        form?: string;

        // anchor specific props
        href?: string; // if href is provided, render as <a>
        target?: string;
        rel?: string;
    }
>;

export const Button: React.FC<ButtonProps> = (p) => {
    const {
        id,
        className,
        style,
        children,
        elevation = 0,
        block = false,
        disabled = false,
        onClick,
        href,
        ...rest
    } = p;

    const elevationClassName = getElevationClassName(elevation);

    const isAnchor = Boolean(href);
    const Element = isAnchor ? 'a' : 'button';

    return (
        <Element
            className={clsx(
                commonStyles.tzComponent,
                styles.Button,
                block && styles.block,
                className,
                elevationClassName,
            )}
            style={{
                ...style,
            }}
            disabled={disabled}
            onClick={onClick}
            href={href}
            {...rest}
            aria-disabled={disabled}
            role={isAnchor ? 'button' : undefined}
        >
            {children}
        </Element>
    );
};
