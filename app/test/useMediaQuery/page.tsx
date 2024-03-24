"use client"
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export default function TestPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {isMobile ? 'Mobile view': 'Desktop view'}
    </div>
  )
}