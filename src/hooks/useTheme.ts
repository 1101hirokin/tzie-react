import { useCallback, useEffect, useSyncExternalStore } from 'react';

type ThemeListener = () => void;

let currentTheme: string | null = null;
const listeners = new Set<ThemeListener>();

const readThemeFromDom = (): string | null => {
    if (typeof document === 'undefined') return null;
    return document.documentElement.getAttribute('data-theme');
};

const getSnapshot = (): string | null => {
    return currentTheme ?? readThemeFromDom();
};

const getServerSnapshot = (defaultTheme?: string): string | null => {
    return defaultTheme ?? null;
};

const setThemeNameInternal = (name: string | null): void => {
    currentTheme = name;

    if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (name) {
            root.setAttribute('data-theme', name);
        } else {
            root.removeAttribute('data-theme');
        }
    }

    listeners.forEach((listener) => listener());
};

const subscribe = (listener: ThemeListener): (() => void) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

export type UseThemeOptions = {
    defaultTheme?: string;
};

export const useTheme = (options?: UseThemeOptions) => {
    const themeName = useSyncExternalStore(
        subscribe,
        getSnapshot,
        () => getServerSnapshot(options?.defaultTheme),
    );

    useEffect(() => {
        if (!options?.defaultTheme) return;
        if (currentTheme != null) return;
        setThemeNameInternal(options.defaultTheme);
    }, [options?.defaultTheme]);

    const setThemeName = useCallback((name: string | null) => {
        setThemeNameInternal(name);
    }, []);

    return { themeName, setThemeName };
};
