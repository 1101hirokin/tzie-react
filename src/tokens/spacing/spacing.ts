// spacing.ts
import clsx from 'clsx';
import styles from './spacing.module.css';

/**
 * Spacing scale.
 * --tz-spacing-0x〜12x に対応。
 */
export type TzieSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type TzieSpacingType = 'margin' | 'padding';
type TzieSpacingSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * コンポーネントが受け取る spacing 系 props。
 * m / mt / mx / p / px ... はすべて 0〜12 のスケール。
 */
export type TzieSpacingProps = {
    // margin
    m?: TzieSpacing;
    mt?: TzieSpacing;
    mr?: TzieSpacing;
    mb?: TzieSpacing;
    ml?: TzieSpacing;
    mx?: TzieSpacing;
    my?: TzieSpacing;

    // padding
    p?: TzieSpacing;
    pt?: TzieSpacing;
    pr?: TzieSpacing;
    pb?: TzieSpacing;
    pl?: TzieSpacing;
    px?: TzieSpacing;
    py?: TzieSpacing;
};

const typeAbbrMap: Record<TzieSpacingType, 'm' | 'p'> = {
    margin: 'm',
    padding: 'p',
};

const sideAbbrMap: Record<TzieSpacingSide, 't' | 'r' | 'b' | 'l'> = {
    top: 't',
    right: 'r',
    bottom: 'b',
    left: 'l',
};

type MarginSlot = 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft';
type PaddingSlot = 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft';
type Slot = MarginSlot | PaddingSlot;

const slotToTypeAndSide: Record<Slot, { type: TzieSpacingType; side: TzieSpacingSide }> = {
    marginTop: { type: 'margin', side: 'top' },
    marginRight: { type: 'margin', side: 'right' },
    marginBottom: { type: 'margin', side: 'bottom' },
    marginLeft: { type: 'margin', side: 'left' },
    paddingTop: { type: 'padding', side: 'top' },
    paddingRight: { type: 'padding', side: 'right' },
    paddingBottom: { type: 'padding', side: 'bottom' },
    paddingLeft: { type: 'padding', side: 'left' },
};

/**
 * scale / type / side から CSS Modules のクラス名を 1 つ返す。
 * 例: tz-spacing-4x-mt, tz-spacing-8x-pr
 */
export const getSpacingClassName = (
    scale: TzieSpacing,
    type: TzieSpacingType,
    side: TzieSpacingSide,
): string => {
    const typeAbbr = typeAbbrMap[type];
    const sideAbbr = sideAbbrMap[side];

    // tz-spacing-<scale>x-mt 形式に合わせる
    const classKey = `tz-spacing-${scale}x-${typeAbbr}${sideAbbr}` as keyof typeof styles;

    return styles[classKey] ?? '';
};

/**
 * TzieSpacingProps を CSS Modules のクラス名配列に変換する。
 *
 * 優先順位（上書き順）は以下：
 *   1. m / p（全方向のデフォルト）
 *   2. mx / my, px / py（軸ごとの上書き）
 *   3. mt / mr / mb / ml, pt / pr / pb / pl（最も細かい指定）
 */
export const spacingPropsToClassNames = (props: TzieSpacingProps): string[] => {
    const slots: Partial<Record<Slot, TzieSpacing>> = {};

    const { m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py } = props;

    // ---- margin ----
    if (m != null) {
        slots.marginTop = m;
        slots.marginRight = m;
        slots.marginBottom = m;
        slots.marginLeft = m;
    }

    if (mx != null) {
        slots.marginLeft = mx;
        slots.marginRight = mx;
    }

    if (my != null) {
        slots.marginTop = my;
        slots.marginBottom = my;
    }

    if (mt != null) slots.marginTop = mt;
    if (mr != null) slots.marginRight = mr;
    if (mb != null) slots.marginBottom = mb;
    if (ml != null) slots.marginLeft = ml;

    // ---- padding ----
    if (p != null) {
        slots.paddingTop = p;
        slots.paddingRight = p;
        slots.paddingBottom = p;
        slots.paddingLeft = p;
    }

    if (px != null) {
        slots.paddingLeft = px;
        slots.paddingRight = px;
    }

    if (py != null) {
        slots.paddingTop = py;
        slots.paddingBottom = py;
    }

    if (pt != null) slots.paddingTop = pt;
    if (pr != null) slots.paddingRight = pr;
    if (pb != null) slots.paddingBottom = pb;
    if (pl != null) slots.paddingLeft = pl;

    const classNames: string[] = [];

    (Object.keys(slots) as Slot[]).forEach((slot) => {
        const scale = slots[slot];
        if (scale == null) return;

        const { type, side } = slotToTypeAndSide[slot];
        const className = getSpacingClassName(scale, type, side);

        if (className) {
            classNames.push(className);
        }
    });

    return classNames;
};

/**
 * spacing props から 1 本の className 文字列を返すヘルパー。
 */
export const spacingPropsToClassName = (props: TzieSpacingProps): string =>
    clsx(spacingPropsToClassNames(props));
