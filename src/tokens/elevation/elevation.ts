import styles from './elevation.module.css';

export type TzieElevation =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;

export const getElevationClassName = (e: TzieElevation): string | null => {
    switch (e) {
        case 0:
            return styles['tz-elevation-0'];
        case 1:
            return styles['tz-elevation-1'];
        case 2:
            return styles['tz-elevation-2'];
        case 3:
            return styles['tz-elevation-3'];
        case 4:
            return styles['tz-elevation-4'];
        case 5:
            return styles['tz-elevation-5'];
        case 6:
            return styles['tz-elevation-6'];
        case 7:
            return styles['tz-elevation-7'];
        case 8:
            return styles['tz-elevation-8'];
        case 9:
            return styles['tz-elevation-9'];
        case 10:
            return styles['tz-elevation-10'];
        case 11:
            return styles['tz-elevation-11'];
        case 12:
            return styles['tz-elevation-12'];
        case 13:
            return styles['tz-elevation-13'];
        case 14:
            return styles['tz-elevation-14'];
        case 15:
            return styles['tz-elevation-15'];
        case 16:
            return styles['tz-elevation-16'];
        case 17:
            return styles['tz-elevation-17'];
        case 18:
            return styles['tz-elevation-18'];
        case 19:
            return styles['tz-elevation-19'];
        case 20:
            return styles['tz-elevation-20'];
        case 21:
            return styles['tz-elevation-21'];
        case 22:
            return styles['tz-elevation-22'];
        case 23:
            return styles['tz-elevation-23'];
        default:
            console.warn(`Unknown elevation: ${e}`);
            return null;
    }
};
