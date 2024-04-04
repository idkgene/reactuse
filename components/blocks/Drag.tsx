import { useDrag } from '../../hooks/useDrag'

export default function DragShowcase() {
  const { isDragging, dragRef, position } = useDrag()
  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg relative">
        <h2
          id="useDrag"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useDrag
        </h2>
        <div
          ref={dragRef}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            cursor: isDragging ? 'grabbing' : 'grab',
            border: '1px solid black',
            padding: '10px',
            backgroundColor: isDragging ? 'lightblue' : 'lightgray',
          }}
        >
          Drag me!
        </div>
      </div>
    </>
  )
}
