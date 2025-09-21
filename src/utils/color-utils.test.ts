import { describe, it, expect } from "vitest";
import {
  hexToHsl,
  hslToHex,
  normalizeHue,
  parseColorToHSL,
  formatColor,
  getContrastColor,
  generateColorHarmonies,
  generateColorHarmony,
} from "./color-utils";

describe("Color Utilities", () => {
  it("hexToHsl should convert #ff0000 to HSL red", () => {
    const [h, s, l] = hexToHsl("#ff0000");
    expect(Math.round(h)).toBe(0);
    expect(Math.round(s)).toBe(100);
    expect(Math.round(l)).toBe(50);
  });

  it("hexToHsl should handle short hex #0f0", () => {
    const [h, s, l] = hexToHsl("#0f0");
    expect(Math.round(h)).toBe(120);
    expect(Math.round(s)).toBe(100);
    expect(Math.round(l)).toBe(50);
  });

  it("hslToHex should convert HSL red back to #ff0000", () => {
    const hex = hslToHex(0, 100, 50);
    expect(hex.toLowerCase()).toBe("#ff0000");
  });

  it("normalizeHue should wrap negative and >360 values", () => {
    expect(normalizeHue(-30)).toBe(330);
    expect(normalizeHue(390)).toBe(30);
    expect(normalizeHue(720)).toBe(0);
  });

  it("parseColorToHSL should parse #ff0000 correctly", () => {
    const [h, s, l] = parseColorToHSL("#ff0000");
    expect(Math.round(h)).toBe(0);
    expect(Math.round(s)).toBe(100);
    expect(Math.round(l)).toBe(50);
  });

  it("parseColorToHSL should parse rgb() string", () => {
    const [h, s, l] = parseColorToHSL("rgb(0, 255, 0)");
    expect(Math.round(h)).toBe(120);
    expect(Math.round(s)).toBe(100);
    expect(Math.round(l)).toBe(50);
  });

  it("parseColorToHSL should parse hsl() string", () => {
    const [h, s, l] = parseColorToHSL("hsl(240, 100%, 50%)");
    expect(Math.round(h)).toBe(240);
    expect(Math.round(s)).toBe(100);
    expect(Math.round(l)).toBe(50);
  });

  it("formatColor should convert HSL to hex, hsl, and rgb", () => {
    expect(formatColor(0, 100, 50, "hex").toLowerCase()).toBe("#ff0000");
    expect(formatColor(0, 100, 50, "hsl")).toBe("hsl(0, 100%, 50%)");
    expect(formatColor(0, 100, 50, "rgb")).toBe("rgb(255, 0, 0)");
  });

  it("getContrastColor should return black or white correctly", () => {
    expect(getContrastColor("#ffffff")).toBe("black");
    expect(getContrastColor("#000000")).toBe("white");
    expect(getContrastColor("#ff0000")).toBe("white");
  });
});

describe("Color Harmony Generators", () => {
  const testHex = "#ff0000"; // Red

  it("generateColorHarmonies should return all harmony types", () => {
    const harmonies = generateColorHarmonies(testHex, "hex");
    expect(harmonies.monochromatic.length).toBeGreaterThan(0);
    expect(harmonies.complementary.length).toBeGreaterThan(0);
    expect(harmonies.triadic.length).toBeGreaterThan(0);
    expect(harmonies.analogous.length).toBeGreaterThan(0);
  });

  it("generateColorHarmony mono should generate monochromatic scheme", () => {
    const colors = generateColorHarmony(testHex, "mono", "hex");
    expect(colors.length).toBeGreaterThan(0);
    colors.forEach((c) => expect(c).toMatch(/^#/));
  });

  it("generateColorHarmony complementary should generate scheme", () => {
    const colors = generateColorHarmony(testHex, "complementary", "hex");
    expect(colors.length).toBeGreaterThan(0);
  });

  it("generateColorHarmony triadic should generate scheme", () => {
    const colors = generateColorHarmony(testHex, "triadic", "hex");
    expect(colors.length).toBeGreaterThan(0);
  });

  it("generateColorHarmony analogous should generate scheme", () => {
    const colors = generateColorHarmony(testHex, "analogous", "hex");
    expect(colors.length).toBeGreaterThan(0);
  });

  it("generateColorHarmony should throw on invalid type", () => {
    // @ts-ignore
    expect(() => generateColorHarmony(testHex, "invalid")).toThrow(
      /Invalid harmony type/
    );
  });

  it("all harmony generators should support hsl and rgb output", () => {
    const monoHSL = generateColorHarmony(testHex, "mono", "hsl");
    monoHSL.forEach((c) => expect(c).toMatch(/^hsl/));

    const monoRGB = generateColorHarmony(testHex, "mono", "rgb");
    monoRGB.forEach((c) => expect(c).toMatch(/^rgb/));
  });
});
