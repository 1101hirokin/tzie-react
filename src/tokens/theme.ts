import type { TzieTheme } from '@tzie/tokens';

type TzieTokenValue = {
    $value: string | number;
    $type?: string;
};

export type TzieThemeDefinition = {
    name: string;
    theme: TzieTheme;
};

const isTokenValue = (value: unknown): value is TzieTokenValue => {
    return Boolean(value) && typeof value === 'object' && '$value' in (value as TzieTokenValue);
};

const tokenRefRegex = /^\{([a-zA-Z0-9_.-]+)\}$/;

const toCssVarName = (path: string[]): string => `--tz-${path.join('-')}`;

const resolveTokenValue = (value: string | number): string => {
    if (typeof value !== 'string') {
        return String(value);
    }

    const match = tokenRefRegex.exec(value.trim());
    if (!match) {
        return value;
    }

    const path = match[1].split('.').filter(Boolean);
    if (path.length === 0) {
        return value;
    }

    return `var(${toCssVarName(path)})`;
};

const escapeCssAttributeValue = (value: string): string => {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
};

const collectCssVars = (node: TzieTheme, path: string[], lines: string[]): void => {
    Object.entries(node).forEach(([key, value]) => {
        if (isTokenValue(value)) {
            const cssVar = toCssVarName([...path, key]);
            const cssValue = resolveTokenValue(value.$value);
            lines.push(`${cssVar}: ${cssValue};`);
            return;
        }

        if (value && typeof value === 'object') {
            collectCssVars(value as TzieTheme, [...path, key], lines);
        }
    });
};

export const buildThemeCss = (theme: TzieThemeDefinition): string => {
    const lines: string[] = [];
    collectCssVars(theme.theme, [], lines);

    if (lines.length === 0) {
        return '';
    }

    const name = escapeCssAttributeValue(theme.name);
    return `:root[data-theme="${name}"] {\n  ${lines.join('\n  ')}\n}\n`;
};

export const buildThemesCss = (themes: TzieThemeDefinition[]): string => {
    const lines: string[] = [];
    const unique = new Map<string, TzieThemeDefinition>();

    themes.forEach((theme) => {
        if (!theme?.name || !theme?.theme) return;
        unique.set(theme.name, theme);
    });

    unique.forEach((theme) => {
        const css = buildThemeCss(theme);
        if (css) lines.push(css);
    });

    return lines.join('\n');
};
