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
            return styles['tz-elv-0'];
        case 1:
            return styles['tz-elv-1'];
        case 2:
            return styles['tz-elv-2'];
        case 3:
            return styles['tz-elv-3'];
        case 4:
            return styles['tz-elv-4'];
        case 5:
            return styles['tz-elv-5'];
        case 6:
            return styles['tz-elv-6'];
        case 7:
            return styles['tz-elv-7'];
        case 8:
            return styles['tz-elv-8'];
        case 9:
            return styles['tz-elv-9'];
        case 10:
            return styles['tz-elv-10'];
        case 11:
            return styles['tz-elv-11'];
        case 12:
            return styles['tz-elv-12'];
        case 13:
            return styles['tz-elv-13'];
        case 14:
            return styles['tz-elv-14'];
        case 15:
            return styles['tz-elv-15'];
        case 16:
            return styles['tz-elv-16'];
        case 17:
            return styles['tz-elv-17'];
        case 18:
            return styles['tz-elv-18'];
        case 19:
            return styles['tz-elv-19'];
        case 20:
            return styles['tz-elv-20'];
        case 21:
            return styles['tz-elv-21'];
        case 22:
            return styles['tz-elv-22'];
        case 23:
            return styles['tz-elv-23'];
        default:
            return null;
    }
};
