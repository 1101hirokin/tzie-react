import type { Modify } from '../../utils';
import type { TzieComponentProps } from '../component';

type AccordionProps = Modify<TzieComponentProps, {}>;

export const Accordion: React.FC<AccordionProps> = (p) => {
    const { id, className, style, ...rest } = p;
};
