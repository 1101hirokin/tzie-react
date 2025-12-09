import styles from './variant.module.css';

export type TzieVariant = 'filled' | 'outlined' | 'text';

export const getVariantClassName = (variant: TzieVariant): string | null => {
    switch (variant) {
        case 'filled':
            return styles['tz-variant-filled'];
        case 'outlined':
            return styles['tz-variant-outlined'];
        case 'text':
            return styles['tz-variant-text'];
        default:
            console.warn(`Unknown variant: ${variant}`);
            return null;
    }
};

export const getVariantStyles = (semColor: string): React.CSSProperties | null => {
    return {
        '--_bg': tzieSemanticVar(semColor, 'bg'),
        '--_fg': tzieSemanticVar(semColor, 'fg'),
        '--_border': tzieSemanticVar(semColor, 'border'),

        '--_bg-hover': tzieSemanticVar(semColor, 'bg-hover'),
        '--_bg-pressed': tzieSemanticVar(semColor, 'bg-pressed'),

        '--_soft-bg': tzieSemanticVar(semColor, 'soft-bg'),
        '--_soft-fg': tzieSemanticVar(semColor, 'soft-fg'),
        '--_soft-border': tzieSemanticVar(semColor, 'soft-border'),

        '--_soft-bg-hover': tzieSemanticVar(semColor, 'soft-bg-hover'),
        '--_soft-bg-pressed': tzieSemanticVar(semColor, 'soft-bg-pressed'),
    } as React.CSSProperties;
};

type TzieSemanticField =
    | 'bg'
    | 'fg'
    | 'border'
    | 'bg-hover'
    | 'bg-pressed'
    | 'soft-bg'
    | 'soft-fg'
    | 'soft-border'
    | 'soft-bg-hover'
    | 'soft-bg-pressed';

const tzieSemanticVar = (semColor: string, semField: TzieSemanticField): string => {
    // --tz-color-semantic-primary-bg-hover
    return `var(--tz-color-semantic-${semColor}-${semField})`;
};
