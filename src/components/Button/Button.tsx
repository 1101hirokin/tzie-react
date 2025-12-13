import clsx from 'clsx';
import {
    getElevationClassName,
    getFocusableClassName,
    getShapeClassName,
    getVariantClassName,
    getVariantStyles,
    type TzieElevation,
    type TzieShape,
} from '../../tokens';
import type { Modify } from '../../utils';
import styles from './Button.module.css';
import {
    getCenteringClassName,
    getTzComponentClassName,
    type TzieComponentProps,
} from '../component';
import React from 'react';
import { ButtonLeading, ButtonTrailing, isButtonSlot, type ButtonSlotFC } from './buttonSlots';
import { Text } from '../Text/Text';
import { getFocusRingTargetClassName } from '../../tokens/focusable/focusable';
import { CircularLoader } from '../CircularLoader/CircularLoader';

type ButtonProps = Modify<
    TzieComponentProps,
    {
        block?: boolean;
        disabled?: boolean;
        loading?: boolean;

        elevation?: TzieElevation;
        shape?: TzieShape;
        variant?: 'filled' | 'outlined' | 'text';
        color?: string;
        multiline?: boolean;

        leading?: React.ReactNode;
        trailing?: React.ReactNode;

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

type ButtonCompound = React.FC<ButtonProps> & {
    Leading: ButtonSlotFC;
    Trailing: ButtonSlotFC;
};

export const Button: ButtonCompound = (p) => {
    const {
        id,
        className,
        style,
        children,

        block = false,
        disabled = false,
        loading = false,

        elevation = 0,
        shape = 'rounded',
        variant = 'filled',
        color = 'primary',
        multiline = false,

        leading = null,
        trailing = null,

        onClick,
        href,
        ...rest
    } = p;

    const elevationClassName = getElevationClassName(elevation);
    const shapeClassName = getShapeClassName(shape);
    const variantClassName = getVariantClassName(variant);
    const variantStyles = getVariantStyles(disabled ? 'disabled' : color);
    const focusableClassName = getFocusableClassName();
    const focusRingTargetClassName = getFocusRingTargetClassName();

    const isAnchor = Boolean(href);
    const Element = isAnchor ? 'a' : 'button';

    // extract children slots
    let slotLeading: React.ReactNode = leading;
    let slotTrailing: React.ReactNode = trailing;
    let otherChildren: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
        if (isButtonSlot(child, 'leading')) {
            if (slotLeading === null) slotLeading = child.props.children;
            return;
        } else if (isButtonSlot(child, 'trailing')) {
            if (slotTrailing === null) slotTrailing = child.props.children;
            return;
        }
        otherChildren.push(child as React.ReactNode);
    });

    return (
        <Element
            className={clsx(
                getTzComponentClassName(),
                styles.Button,
                block && styles.block,
                className,
                elevationClassName,
                shapeClassName,
                focusableClassName,
                variantClassName,
                loading && styles.loading,
            )}
            style={{
                ...variantStyles,
                ...style,
            }}
            disabled={disabled}
            onClick={onClick}
            href={href}
            {...rest}
            aria-disabled={disabled}
            role={isAnchor ? 'button' : undefined}
        >
            <div
                className={clsx(
                    styles.layer,
                    styles.loaderLayer,
                    styles.untouchable,
                    getCenteringClassName('all'),
                )}
            >
                <div className={styles.loaderContainer}>
                    <CircularLoader className={styles.loader} />
                </div>
            </div>

            <div className={clsx(styles.layer, styles.untouchable, focusRingTargetClassName)}></div>

            <div className={clsx(styles.baseLayer, styles.contentLayer)}>
                {slotLeading && <div className={clsx(styles.leadingContainer)}>{slotLeading}</div>}
                <div className={clsx(styles.mainContainer)}>
                    <Text as="span" typography="button">
                        {otherChildren}
                    </Text>
                </div>
                {slotTrailing && (
                    <div className={clsx(styles.trailingContainer)}>{slotTrailing}</div>
                )}
            </div>
        </Element>
    );
};

Button.Leading = ButtonLeading;
Button.Trailing = ButtonTrailing;
