import {
  ref,
  onUnmounted,
  type ShallowRef,
  watchEffect,
  computed,
  type MaybeRef,
  unref,
} from "vue";

type Position = {
  x: number;
  y: number;
};

interface ContainerBounds {
  width: number;
  height: number;
}

interface DraggableOptions {
  elementSize?: MaybeRef<number>;
  offset?: MaybeRef<number>;
  initialPosition?: Position;
  constrainToParent?: boolean;
  onDragStart?: (event: MouseEvent | TouchEvent, position: Position) => void;
  onDrag?: (event: MouseEvent | TouchEvent, position: Position) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent, position: Position) => void;
}

export const useDraggable = (
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  options: DraggableOptions = {}
) => {
  const isDragging = ref(false);
  const position = ref<Position>({ x: 0, y: 0 });

  // Make reactive computeds for elementSize and offset
  const elementSize = computed(() => unref(options.elementSize) || 0);
  const offset = computed(() => unref(options.offset) || 0);

  // Other options (these don't need to be reactive typically)
  const {
    constrainToParent = true,
    initialPosition,
    onDragStart,
    onDrag,
    onDragEnd,
  } = options;

  // Function to apply bounds constraints
  const constrainPosition = (pos: Position): Position => {
    if (!constrainToParent || !elementRef.value?.parentElement) {
      return pos;
    }

    const bounds = {
      width: elementRef.value.parentElement.offsetWidth,
      height: elementRef.value.parentElement.offsetHeight,
    };

    const currentElementSize =
      elementRef.value.getBoundingClientRect().width || elementSize.value;

    return {
      x: Math.max(
        0,
        Math.min(pos.x, bounds.width - currentElementSize + offset.value)
      ),
      y: Math.max(
        0,
        Math.min(pos.y, bounds.height - currentElementSize + offset.value)
      ),
    };
  };

  // Set initial position with bounds checking
  const initializePosition = () => {
    if (initialPosition) {
      position.value = constrainPosition(initialPosition);
    }
  };

  // Initialize position when element is available
  watchEffect(() => {
    if (elementRef.value && initialPosition) {
      initializePosition();
    }
  });

  // Enhanced setPosition with bounds checking
  const setPosition = (newPosition: Partial<Position>) => {
    const current = position.value;
    const updated = {
      x: newPosition.x ?? current.x,
      y: newPosition.y ?? current.y,
    };

    position.value = constrainPosition(updated);
  };

  // Helper function to get coordinates from mouse or touch event
  const getEventCoordinates = (event: MouseEvent | TouchEvent) => {
    if ('touches' in event && event.touches.length > 0) {
      return {
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      };
    }
    return {
      clientX: (event as MouseEvent).clientX,
      clientY: (event as MouseEvent).clientY,
    };
  };

  const startDrag = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    isDragging.value = true;

    // Call onDragStart callback if provided
    onDragStart?.(event, position.value);

    updatePosition(event);

    // Add global event listeners for both mouse and touch
    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value) return;
    event.preventDefault();
    updatePosition(event);
    onDrag?.(event, position.value);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging.value) return;
    event.preventDefault();
    updatePosition(event);
    onDrag?.(event, position.value);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (!isDragging.value) return;
    endDrag(event);
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (!isDragging.value) return;
    endDrag(event);
  };

  const endDrag = (event: MouseEvent | TouchEvent) => {
    isDragging.value = false;

    // Call onDragEnd callback if provided
    onDragEnd?.(event, position.value);

    // Remove all event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const updatePosition = (event: MouseEvent | TouchEvent) => {
    if (!elementRef.value) return;

    let parentElement: HTMLElement | null = null;
    let bounds: ContainerBounds | null = null;
    const currentElementSize = elementRef.value.getBoundingClientRect().width;

    // Determine container and bounds
    if (constrainToParent && elementRef.value.parentElement) {
      // Use parent element bounds
      parentElement = elementRef.value.parentElement;
      bounds = {
        width: parentElement.offsetWidth,
        height: parentElement.offsetHeight,
      };
    }

    if (!parentElement || !bounds) return;

    // Get coordinates from either mouse or touch event
    const { clientX, clientY } = getEventCoordinates(event);

    // Calculate position relative to parent
    const rect = parentElement.getBoundingClientRect();
    const x = clientX - rect.left - currentElementSize / 2 + offset.value / 2;
    const y = clientY - rect.top - currentElementSize / 2 + offset.value / 2;

    // Constrain to bounds if provided
    position.value = {
      x: Math.max(
        0,
        Math.min(x, bounds.width - currentElementSize + offset.value)
      ),
      y: Math.max(
        0,
        Math.min(y, bounds.height - currentElementSize + offset.value)
      ),
    };
  };

  // Cleanup on unmount
  onUnmounted(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  });

  return {
    isDragging,
    position,

    // Methods
    startDrag,
    setPosition,
  };
};