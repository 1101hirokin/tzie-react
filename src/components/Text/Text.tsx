import { type JSX } from 'react';
import clsx from 'clsx';
import type { Modify } from '../../utils';
import styles from './Text.module.css';
import {
    getDefaultElementForTypography,
    getTypographyClassName,
    type TzieTypography,
} from '../../tokens';
import { getTzComponentClassName, type TzieComponentProps } from '../component';

type TextProps = Modify<
    TzieComponentProps,
    {
        typography?: TzieTypography;
        as?: Extract<
            'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label',
            keyof JSX.IntrinsicElements
        >;
    }
>;

export const Text: React.FC<TextProps> = (p) => {
    const {
        id,
        className,
        style,
        children,
        typography = 'body-1',
        as: textAs = 'span',
        ...rest
    } = p;

    const typographyClassName = getTypographyClassName(typography);
    const Element = textAs ? textAs : getDefaultElementForTypography(typography);

    return (
        <Element
            id={id}
            className={clsx(getTzComponentClassName(), styles.Text, typographyClassName, className)}
            style={{
                ...style,
            }}
            {...rest}
        >
            {children}
        </Element>
    );
};
