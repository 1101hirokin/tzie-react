export type Modify<T, R> = Omit<T, keyof R> & R;

type TzieDataAttributes = {
    [dataAttr: `data-${string}`]: string | number | boolean;
};

export type TzieComponentProps = Modify<
    {
        id?: string;

        className?: string;

        style?: React.CSSProperties;

        children?: React.ReactNode;

        role?: React.AriaRole;
    },
    TzieDataAttributes
>;
