import clsx from 'clsx';
import {
    getElevationClassName,
    getShapeClassName,
    type TzieElevation,
    type TzieShape,
} from '../../tokens';
import type { Modify, TzieComponentProps } from '../../utils';
import commonStyles from '../component.module.css';
import styles from './Button.module.css';
import { Text } from '../Text/Text';

type ButtonProps = Modify<
    TzieComponentProps,
    {
        block?: boolean;
        disabled?: boolean;

        elevation?: TzieElevation;
        shape?: TzieShape;

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
        shape = 'rounded',
        block = false,
        disabled = false,
        onClick,
        href,
        ...rest
    } = p;

    const elevationClassName = getElevationClassName(elevation);
    const shapeClassName = getShapeClassName(shape);

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
                shapeClassName,
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
            <Text typography="button">{children}</Text>
        </Element>
    );
};
