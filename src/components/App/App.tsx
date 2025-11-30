import '@tzie/tokens/tokens.css';
import './App.css';
import commonStyles from '../component.module.css';
import styles from './App.module.css';
import clsx from 'clsx';

type AppProps = {
    children?: React.ReactNode;
};

export const App: React.FC<AppProps> = (p) => {
    const { children } = p;

    return <div className={clsx(commonStyles.tzComponent, styles.App)}>{children}</div>;
};
