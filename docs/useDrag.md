# `useDrag`

A versatile React hook for implementing draggable elements with mouse and touch events. 🖱️📱

## Usage

```tsx
Under Construction
```

## Reference

```tsx
const { isDragging, dragRef, position } = useDrag({
  onDragStart: (event, position) => {
    // Handle drag start event
  },
  onDrag: (event, position) => {
    // Handle drag event
  },
  onDragEnd: (event, position) => {
    // Handle drag end event
  },
});
```

- `options` _`DragOptions`_ - Object containing optional callbacks for onDragStart, onDrag, and onDragEnd.

### DragOptions

`onDragStart` _Function_ - Callback function triggered on drag start.
`onDrag` _Function_ - Callback function triggered during dragging.
`onDragEnd` _Function_ - Callback function triggered on drag end.

### DragResult

`isDragging` _boolean_ - Indicates if the element is currently being dragged.
`dragRef` _RefObject_ - Reference to the draggable element.
`position` _`{ x: number, y: number }`_ - Current position of the draggable element.
