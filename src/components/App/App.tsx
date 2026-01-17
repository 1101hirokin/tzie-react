import '@tzie/tokens/tokens.css';
import './App.css';
import styles from './App.module.css';
import clsx from 'clsx';
import { getTzComponentClassName } from '../component';
import { useMemo } from 'react';
import { buildThemesCss, type TzieThemeDefinition } from '../../tokens';
import { useTheme } from '../../hooks';

type AppProps = {
    children?: React.ReactNode;
    theme?: TzieThemeDefinition | TzieThemeDefinition[];
    themes?: TzieThemeDefinition[];
    defaultTheme?: string;
};

export const App: React.FC<AppProps> = (p) => {
    const { children, theme, themes, defaultTheme } = p;

    const themeList = useMemo(() => {
        const list: TzieThemeDefinition[] = [];

        if (Array.isArray(theme)) {
            list.push(...theme);
        } else if (theme) {
            list.push(theme);
        }

        if (themes?.length) {
            list.push(...themes);
        }

        return list;
    }, [theme, themes]);

    const hasDefaultTheme =
        Boolean(defaultTheme) && themeList.some((entry) => entry.name === defaultTheme);
    const effectiveDefaultTheme = hasDefaultTheme ? defaultTheme : undefined;

    const themeCss = useMemo(() => buildThemesCss(themeList), [themeList]);

    useTheme({ defaultTheme: effectiveDefaultTheme });

    return (
        <div className={clsx(getTzComponentClassName(), styles.App)}>
            {themeCss ? <style data-tzie-theme="true">{themeCss}</style> : null}
            {children}
        </div>
    );
};
