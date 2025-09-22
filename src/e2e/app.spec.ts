import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://dev-murphy.github.io/pixel-palette/");
  const colorPickerBtn = page.getByTestId("color-picker-btn");
  await colorPickerBtn.click();
});

test("has color picker", async ({ page }) => {
  const colorPickerPopup = page.getByTestId("color-picker-popup");
  await expect(colorPickerPopup).toBeVisible();
});

test("should allow user to enter hex color value", async ({ page }) => {
  const hexInput = page.getByTestId("cp-hex-input");

  const initialHuePosition = await page
    .getByTestId("cp-hue-knob")
    .boundingBox();

  await hexInput.fill("#ff0000");
  await page.keyboard.press("Enter");

  const currentHuePosition = await page
    .getByTestId("cp-hue-knob")
    .boundingBox();

  await expect(initialHuePosition?.x).not.toEqual(currentHuePosition?.x);
});

test("should allow user to get random color", async ({ page }) => {
  const initalColor = page.getByTestId("cp-clr-text").textContent();
  const initialColorSpaceKnobPosition = await page
    .getByTestId("cp-clr-space-knob")
    .boundingBox();
  const initialHuePosition = await page
    .getByTestId("cp-hue-knob")
    .boundingBox();
  const randomColorBtn = page.getByTestId("cp-rand-clr-btn");

  await randomColorBtn.click();
  const currentColor = page.getByTestId("cp-clr-text").textContent();
  const currentColorSpaceKnobPosition = await page
    .getByTestId("cp-clr-space-knob")
    .boundingBox();
  const currentHuePosition = await page
    .getByTestId("cp-hue-knob")
    .boundingBox();

  await expect(initalColor).not.toEqual(currentColor);
  await expect(initialColorSpaceKnobPosition?.x).not.toEqual(
    currentColorSpaceKnobPosition?.x
  );
  await expect(initialHuePosition?.x).not.toEqual(currentHuePosition?.x);
});

test("should allow users to view color harmonies", async ({ page }) => {
  const colorHarmonyBtn = page.getByTestId("cp-show-clr-compare-btn");
  const colorHarmonySection = page.getByTestId("cp-clr-campare");

  await expect(colorHarmonySection).not.toBeVisible();
  await colorHarmonyBtn.click();
  await expect(colorHarmonySection).toBeVisible();
});
