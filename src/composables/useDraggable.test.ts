// @vitest-environment jsdom
import { ref, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDraggable } from "./useDraggable";

interface Position {
  x: number;
  y: number;
}

describe("useDraggable", () => {
  let parent: HTMLElement;
  let element: HTMLElement;

  beforeEach(() => {
    // Create parent + child DOM elements
    parent = document.createElement("div");
    parent.style.width = "200px";
    parent.style.height = "200px";

    // jsdom doesn't calculate layout → mock manually
    Object.defineProperty(parent, "offsetWidth", { value: 200 });
    Object.defineProperty(parent, "offsetHeight", { value: 200 });
    parent.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 200, height: 200 } as DOMRect);

    element = document.createElement("div");
    Object.defineProperty(element, "offsetWidth", { value: 50 });
    Object.defineProperty(element, "offsetHeight", { value: 50 });
    element.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 50, height: 50 } as DOMRect);

    parent.appendChild(element);
    document.body.appendChild(parent);
  });

  it("initializes with provided position (constrained)", async () => {
    const wrapper = mount({
      template: `<div></div>`,
      setup() {
        const target = ref<HTMLElement | null>(element);
        const { position } = useDraggable(target, {
          initialPosition: { x: 180, y: 180 }, // outside bounds
        });
        return { position };
      },
    });

    await nextTick();

    // should be constrained within parent (200 - 50 = 150)
    expect(wrapper.vm.position).toEqual({ x: 150, y: 150 });
  });

  it("updates position on drag events", async () => {
    const onDragStart = vi.fn();
    const onDrag = vi.fn();
    const onDragEnd = vi.fn();

    const wrapper = mount({
      template: `<div></div>`,
      setup() {
        const target = ref<HTMLElement | null>(element);
        const api = useDraggable(target, {
          onDragStart,
          onDrag,
          onDragEnd,
        });
        // Explicitly return startDrag so it's available on wrapper.vm
        return {
          ...api,
          startDrag: api.startDrag,
        };
      },
    });

    await nextTick();

    // start drag
    const startEvent = new MouseEvent("mousedown", {
      clientX: 20,
      clientY: 20,
      bubbles: true,
    });
    (wrapper.vm as unknown as ReturnType<typeof useDraggable>).startDrag(startEvent);

    expect(onDragStart).toHaveBeenCalled();

    // move inside
    const moveEvent = new MouseEvent("mousemove", {
      clientX: 100,
      clientY: 100,
      bubbles: true,
    });
    document.dispatchEvent(moveEvent);

    expect(onDrag).toHaveBeenCalled();
    expect((wrapper.vm.position as Position).x).toBeGreaterThan(0);
    expect((wrapper.vm.position as Position).y).toBeGreaterThan(0);

    // end drag
    const upEvent = new MouseEvent("mouseup", { bubbles: true });
    document.dispatchEvent(upEvent);

    expect(onDragEnd).toHaveBeenCalled();
    expect(wrapper.vm.isDragging).toBe(false);
  });

  it("setPosition applies constraints", async () => {
    const wrapper = mount({
      template: `<div></div>`,
      setup() {
        const target = ref<HTMLElement | null>(element);
        const api = useDraggable(target);
        return api;
      },
    });

    await nextTick();

    (wrapper.vm as unknown as ReturnType<typeof useDraggable>).setPosition({
      x: 500,
      y: 500,
    }); // way outside
    expect(wrapper.vm.position).toEqual({ x: 150, y: 150 }); // constrained
  });
});
