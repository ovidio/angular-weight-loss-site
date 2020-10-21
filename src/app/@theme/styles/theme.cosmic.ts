import { NbJSThemeOptions, COSMIC_THEME as baseTheme } from '@nebular/theme';

const baseThemeVariables = baseTheme.variables;

export const COSMIC_THEME = {
  name: 'cosmic',
  base: 'cosmic',
  variables: {
    chartjs: {
      axisLineColor: baseThemeVariables.separator,
      textColor: baseThemeVariables.fgText,
    },
  },
} as NbJSThemeOptions;
