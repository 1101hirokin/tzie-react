import React from 'react';

export type ButtonSlotTag = 'leading' | 'trailing';

export type ButtonSlotFC = React.FC & {
    (
        props: React.PropsWithChildren<{
            children?: React.ReactNode;
        }>,
    ): React.ReactElement | null;
    __slot: ButtonSlotTag;
};

export const ButtonLeading: ButtonSlotFC = () => null;
ButtonLeading.__slot = 'leading';

export const ButtonTrailing: ButtonSlotFC = () => null;
ButtonTrailing.__slot = 'trailing';

export const isButtonSlot = (
    elm: any,
    tag: ButtonSlotTag,
): elm is React.ReactElement<{ children?: React.ReactNode }, ButtonSlotFC> => {
    return React.isValidElement(elm) && (elm.type as any).__slot === tag;
};
