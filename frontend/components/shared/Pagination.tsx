'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1
    if (currentPage <= 4) return i + 1
    if (currentPage >= totalPages - 3) return totalPages - 6 + i
    return currentPage - 3 + i
  })

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white hover:border-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="w-9 h-9 rounded-lg border border-gray-200 text-sm hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all">1</button>
          {pages[0] > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'w-9 h-9 rounded-lg border text-sm font-medium transition-all',
            page === currentPage
              ? 'bg-cyan-500 text-white border-cyan-500'
              : 'border-gray-200 hover:bg-cyan-500 hover:text-white hover:border-cyan-500'
          )}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-gray-400">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="w-9 h-9 rounded-lg border border-gray-200 text-sm hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white hover:border-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
