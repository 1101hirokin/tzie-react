import { type JSX } from 'react';
import styles from './typography.module.css';

export type TzieTypography =
    | 'title'
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'heading-4'
    | 'heading-5'
    | 'heading-6'
    | 'subtitle-1'
    | 'subtitle-2'
    | 'body-1'
    | 'body-2'
    | 'caption'
    | 'overline'
    | 'button'
    | 'code';

export const getTypographyClassName = (typography: TzieTypography): string | null => {
    switch (typography) {
        case 'title':
            return styles['tz-typography-title'];
        case 'heading-1':
            return styles['tz-typography-heading-1'];
        case 'heading-2':
            return styles['tz-typography-heading-2'];
        case 'heading-3':
            return styles['tz-typography-heading-3'];
        case 'heading-4':
            return styles['tz-typography-heading-4'];
        case 'heading-5':
            return styles['tz-typography-heading-5'];
        case 'heading-6':
            return styles['tz-typography-heading-6'];
        case 'subtitle-1':
            return styles['tz-typography-subtitle-1'];
        case 'subtitle-2':
            return styles['tz-typography-subtitle-2'];
        case 'body-1':
            return styles['tz-typography-body-1'];
        case 'body-2':
            return styles['tz-typography-body-2'];
        case 'caption':
            return styles['tz-typography-caption'];
        case 'overline':
            return styles['tz-typography-overline'];
        case 'button':
            return styles['tz-typography-button'];
        case 'code':
            return styles['tz-typography-code'];
        default:
            console.warn(`Unknown typography: ${typography}`);
            return null;
    }
};

export const getDefaultElementForTypography = (
    typography: TzieTypography,
): keyof JSX.IntrinsicElements => {
    switch (typography) {
        case 'title':
            return 'h1';
        case 'heading-1':
            return 'h1';
        case 'heading-2':
            return 'h2';
        case 'heading-3':
            return 'h3';
        case 'heading-4':
            return 'h4';
        case 'heading-5':
            return 'h5';
        case 'heading-6':
            return 'h6';
        case 'subtitle-1':
        case 'subtitle-2':
        case 'body-1':
        case 'body-2':
            return 'p';
        case 'caption':
        case 'overline':
        case 'button':
        case 'code':
            return 'span';
        default:
            return 'span';
    }
};
