import type { Raw } from "vue";

export type COLOR_MODES = "hex" | "hsl" | "rgb";
export type MANAGER_NAMES = "npm" | "yarn" | "pnpm" | "bun";

export type MANAGER_TYPE = {
  pkg: MANAGER_NAMES;
  icon: Raw<Component>;
};

export interface COMPONENT_PROPS {
  title: string;
  initialColor: string;
  initialColorMode: COLOR_MODES;
  enableAlpha: boolean;
  openAlphaByDefault: boolean;
  colorSwatch: string[];
}
