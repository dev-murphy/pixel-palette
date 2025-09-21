import { copyColor } from ".";
import { vi, expect, it } from "vitest";

const mockClipboard = {
  writeText: vi.fn(),
  readText: vi.fn(),
};

Object.defineProperty(navigator, "clipboard", {
  value: mockClipboard,
  writable: true,
});

it("should be able copy text", () => {
  const text = "This is test for copy";
  const isCopied = copyColor(text);
  expect(isCopied).toBe(true);
  expect(mockClipboard.writeText).toHaveBeenCalledWith(text);
});
