import styles from './focusable.module.css';

export const getFocusableClassName = (): string => {
    return styles['tz-focusable'];
};

export const getFocusRingTargetClassName = (): string => {
    return styles['tz-focus-ring-target'];
};
