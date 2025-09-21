// @vitest-environment jsdom
import { ref, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  it("should call callback when clicking outside", async () => {
    const callback = vi.fn();

    const wrapper = mount({
      template: `<div><div ref="target">inside</div><div id="outside">outside</div></div>`,
      setup() {
        const target = ref<HTMLElement | null>(null);
        useClickOutside(target, callback);
        return { target };
      },
    });

    await nextTick();

    // simulate click inside (should NOT call callback)
    await wrapper.find("div").trigger("click");
    expect(callback).not.toHaveBeenCalled();

    // simulate click outside
    document.body.click();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should cleanup event listener on unmount", async () => {
    const callback = vi.fn();

    const wrapper = mount({
      template: `<div><div ref="target">inside</div></div>`,
      setup() {
        const target = ref<HTMLElement | null>(null);
        useClickOutside(target, callback);
        return { target };
      },
    });

    await nextTick();

    wrapper.unmount();

    // after unmount, clicking outside should NOT trigger callback
    document.body.click();
    expect(callback).not.toHaveBeenCalled();
  });
});
