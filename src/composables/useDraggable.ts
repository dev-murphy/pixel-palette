import { ref, onUnmounted, type ShallowRef, watchEffect } from "vue";

type Position = {
  x: number;
  y: number;
};

interface ContainerBounds {
  width: number;
  height: number;
}

interface DraggableOptions {
  elementSize?: number;
  offset?: number;
  initialPosition?: Position;
  constrainToParent?: boolean;
  onDragStart?: (event: MouseEvent, position: Position) => void;
  onDrag?: (event: MouseEvent, position: Position) => void;
  onDragEnd?: (event: MouseEvent, position: Position) => void;
}

export const useDraggable = (
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  options: DraggableOptions = {}
) => {
  const isDragging = ref(false);
  const position = ref<Position>({ x: 0, y: 0 });

  // Destructure options with defaults
  const {
    elementSize = 0,
    offset = 0,
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
      elementRef.value.getBoundingClientRect().width || elementSize;

    return {
      x: Math.max(
        0,
        Math.min(pos.x, bounds.width - currentElementSize + offset)
      ),
      y: Math.max(
        0,
        Math.min(pos.y, bounds.height - currentElementSize + offset)
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
  const startDrag = (event: MouseEvent) => {
    event.preventDefault();
    isDragging.value = true;

    // Call onDragStart callback if provided
    onDragStart?.(event, position.value);

    updatePosition(event);

    // Add global event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value) return;

    updatePosition(event);

    // Call onDrag callback if provided
    onDrag?.(event, position.value);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (!isDragging.value) return;

    isDragging.value = false;

    // Call onDragEnd callback if provided
    onDragEnd?.(event, position.value);

    // Remove global event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const updatePosition = (event: MouseEvent) => {
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

    // Calculate position relative to parent
    const rect = parentElement.getBoundingClientRect();
    const x = event.clientX - rect.left - currentElementSize / 2 + offset / 2;
    const y = event.clientY - rect.top - currentElementSize / 2 + offset / 2;

    // Constrain to bounds if provided
    position.value = {
      x: Math.max(0, Math.min(x, bounds.width - currentElementSize + offset)),
      y: Math.max(0, Math.min(y, bounds.height - currentElementSize + offset)),
    };
  };
  
  // Get current position as percentage
  const getPositionPercent = (): Position => {
    const bounds = {
      width: elementRef.value?.parentElement?.offsetWidth || 100,
      height: elementRef.value?.parentElement?.offsetHeight || 100,
    };

    return {
      x: (position.value.x / (bounds.width - elementSize)) * 100,
      y: (position.value.y / (bounds.height - elementSize)) * 100,
    };
  };

  // Set position by percentage
  const setPositionPercent = (percent: Partial<Position>) => {
    const bounds = {
      width: elementRef.value?.parentElement?.offsetWidth || 100,
      height: elementRef.value?.parentElement?.offsetHeight || 100,
    };

    const newPosition: Partial<Position> = {};

    if (percent.x !== undefined) {
      newPosition.x = (percent.x / 100) * (bounds.width - elementSize);
    }
    if (percent.y !== undefined) {
      newPosition.y = (percent.y / 100) * (bounds.height - elementSize);
    }

    setPosition(newPosition);
  };

  // Cleanup on unmount
  onUnmounted(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  });

  return {
    // State
    isDragging,
    position,

    // Methods
    startDrag,
    setPosition,
    getPositionPercent,
    setPositionPercent,
  };
};
