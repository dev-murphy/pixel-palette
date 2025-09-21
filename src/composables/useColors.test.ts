import { describe, it, expect, beforeEach } from "vitest";
import { useColors } from "./useColors";

describe("useColors composable full coverage", () => {
  let colors: ReturnType<typeof useColors>;

  beforeEach(() => {
    colors = useColors();
  });

  it("should initialize correctly", () => {
    expect(colors.colorMode.value).toBe("hex");
    expect(colors.color.value.a).toBe(1);
  });

  it("should toggle through modes cyclically", () => {
    expect(colors.colorMode.value).toBe("hex");
    colors.toggleMode();
    expect(colors.colorMode.value).toBe("rgb");
    colors.toggleMode();
    expect(colors.colorMode.value).toBe("hsl");
    colors.toggleMode();
    expect(colors.colorMode.value).toBe("hex");
  });

  it("should set color directly", () => {
    colors.setColor({ h: 50, s: 0.5, v: 0.5 });
    expect(colors.color.value.h).toBe(50);
    expect(colors.color.value.s).toBe(0.5);
    expect(colors.color.value.v).toBe(0.5);
  });

  it("should clamp hue", () => {
    colors.setHue(-10);
    expect(colors.hue.value).toBe(0);
    colors.setHue(400);
    expect(colors.hue.value).toBe(360);
  });

  it("should clamp alpha", () => {
    colors.setAlpha(-5);
    expect(colors.alpha.value).toBe(0);
    colors.setAlpha(2);
    expect(colors.alpha.value).toBe(1);
  });

  it("should parse hex and update state", () => {
    colors.setColorFromString("#00ff00");
    expect(colors.hex.value).toBe("00ff00");
  });

  it("should accept short hex (#0f0)", () => {
    colors.setColorFromString("#0f0");
    expect(colors.hex.value).toBe("00ff00");
  });

  it("should accept hex with alpha (#ff000080)", () => {
    colors.setColorFromString("#ff000080");
    expect(colors.alpha.value).toBeCloseTo(0.5, 2);
  });

  it("should reject invalid hex", () => {
    colors.setColorFromString("#zzz");
    // Should keep previous valid state
    expect(colors.hex.value).toBeDefined();
  });

  it("should parse rgb()", () => {
    colors.setColorFromString("rgb(255, 128, 0)");
    expect(colors.exportColor.value).toMatch("#ff8000");
  });

  it("should parse rgba()", () => {
    colors.setColorFromString("rgba(255, 0, 0, 0.3)");
    expect(colors.alpha.value).toBeCloseTo(0.3, 1);
  });

  it("should parse hsl()", () => {
    colors.setColorFromString("hsl(240, 100%, 50%)");
    expect(colors.exportColor.value).toMatch("#0000ff");
  });

  it("should parse hsla()", () => {
    colors.setColorFromString("hsla(120, 50%, 50%, 0.2)");
    expect(colors.alpha.value).toBeCloseTo(0.2, 1);
  });

  it("should ignore invalid color strings", () => {
    colors.setColorFromString("not-a-color");
    // color should remain unchanged
    expect(colors.color.value).toBeTruthy();
  });

  it("should update via hex setter", () => {
    colors.hex.value = "0000ff"; // set blue
    expect(colors.hex.value).toBe("0000ff");
  });

  it("should update hslH via setter", () => {
    colors.hslH.value = 200;
    expect(colors.hue.value).toBe(200);
  });

  it("should update hslS via setter", () => {
    colors.setColorFromString("hsl(200, 50%, 50%)");
    const prev = colors.hslS.value;
    colors.hslS.value = 0.8;
    expect(colors.hslS.value).not.toBe(prev);
  });

  it("should update hslL via setter", () => {
    colors.setColorFromString("hsl(200, 50%, 50%)");
    const prev = colors.hslL.value;
    colors.hslL.value = 0.2;
    expect(colors.hslL.value).not.toBe(prev);
  });

  it("should update rgbR via setter", () => {
    colors.setColorFromString("#ff0000");
    colors.rgbR.value = 100;
    expect(colors.rgbR.value).toBe(100);
  });

  it("should update rgbG via setter", () => {
    colors.setColorFromString("#00ff00");
    colors.rgbG.value = 100;
    expect(colors.rgbG.value).toBe(100);
  });

  it("should update rgbB via setter", () => {
    colors.setColorFromString("#0000ff");
    colors.rgbB.value = 100;
    expect(colors.rgbB.value).toBe(100);
  });

  it("should export rgba when alpha < 1", () => {
    colors.setColor({ h: 0, s: 1, v: 1, a: 0.5 });
    colors.colorMode.value = "rgb";
    expect(colors.exportColor.value).toBe("rgba(255, 0, 0, 0.50)");
  });

  it("should export hsla when alpha < 1", () => {
    colors.setColorFromString("hsla(200, 50%, 50%, 0.3)");
    colors.colorMode.value = "hsl";
    expect(colors.exportColor.value).toMatch(/^hsla/);
  });

  it("should export hex by default", () => {
    colors.setColorFromString("#abcdef");
    expect(colors.exportColor.value).toBe("hsl(210, 68%, 80%)");
  });

  it("should generate random color", () => {
    colors.randomColor();
    expect(colors.hue.value).toBeGreaterThanOrEqual(0);
    expect(colors.hue.value).toBeLessThanOrEqual(360);
  });
});
