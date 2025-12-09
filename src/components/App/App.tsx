import '@tzie/tokens/tokens.css';
import './App.css';
import styles from './App.module.css';
import clsx from 'clsx';
import { getTzComponentClassName } from '../component';

type AppProps = {
    children?: React.ReactNode;
};

export const App: React.FC<AppProps> = (p) => {
    const { children } = p;

    return <div className={clsx(getTzComponentClassName(), styles.App)}>{children}</div>;
};
