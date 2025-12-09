import styles from './shape.module.css';

export type TzieShape =
    | 'angular'
    | 'rounded'
    | 'rounded-s'
    | 'rounded-m'
    | 'rounded-l'
    | 'circular';

export const getShapeClassName = (shape: TzieShape): string | null => {
    switch (shape) {
        case 'angular':
            return styles['tz-shape-angular'];
        case 'rounded':
            return styles['tz-shape-rounded'];
        case 'rounded-s':
            return styles['tz-shape-rounded-s'];
        case 'rounded-m':
            return styles['tz-shape-rounded-m'];
        case 'rounded-l':
            return styles['tz-shape-rounded-l'];
        case 'circular':
            return styles['tz-shape-circular'];
        default:
            console.warn(`Unknown shape: ${shape}`);
            return null;
    }
};
