'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import React, { useMemo, useState } from 'react'

type WithId = { id?: string | number; disabled?: boolean }

export type Column<T> = {
  label: string
  key: keyof T | string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  defaultEmptyValue?: string
  sortable?: boolean
  render?: (row: T, index?: number) => React.ReactNode
  onFilterClick?: () => void
}

type SortState = { key: string; direction: 'asc' | 'desc' } | null

export interface InteractiveTableProps<T extends WithId> {
  columns: Column<T>[]
  rows: T[]
  showCheckbox?: boolean
  showInitials?: boolean
  initialsKey?: string
  initialsPalette?: string[]
  pagination?: boolean
  rowsPerPageOptions?: number[]
  initialRowsPerPage?: number
  onRowClick?: (row: T) => void
  className?: string
}

export default function InteractiveTable<T extends WithId>({
  columns,
  rows,
  showCheckbox = false,
  showInitials = false,
  initialsKey,
  initialsPalette,
  pagination = true,
  rowsPerPageOptions = [10, 20, 50],
  initialRowsPerPage = rowsPerPageOptions[0],
  onRowClick,
  className
}: InteractiveTableProps<T>) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)
  const [sort, setSort] = useState<SortState>(null)
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([])

  const toggleAll = (checked: boolean) => {
    if (checked) {
      const ids = rows.map((r) => r.id).filter(Boolean) as Array<
        string | number
      >
      setSelectedIds(ids)
    } else {
      setSelectedIds([])
    }
  }

  const toggleRow = (row: T) => {
    const id = row.id
    if (id === undefined || id === null) return
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const sortedRows = useMemo(() => {
    if (!sort) return rows
    const { key, direction } = sort
    const dir = direction === 'asc' ? 1 : -1
    return [...rows].sort((a: T, b: T) => {
      const va = resolveKey(a, key)
      const vb = resolveKey(b, key)
      const na = normalize(va)
      const nb = normalize(vb)
      if (na < nb) return -1 * dir
      if (na > nb) return 1 * dir
      return 0
    })
  }, [rows, sort])

  const paginatedRows = useMemo(() => {
    if (!pagination) return sortedRows
    const start = page * rowsPerPage
    return sortedRows.slice(start, start + rowsPerPage)
  }, [sortedRows, pagination, page, rowsPerPage])

  const totalPages = useMemo(() => {
    if (!pagination) return 1
    return Math.max(1, Math.ceil(rows.length / rowsPerPage))
  }, [rows.length, rowsPerPage, pagination])

  const handleHeaderClick = (col: Column<T>) => {
    if (!col.sortable) return
    const key = String(col.key)
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' }
      if (prev.direction === 'asc') return { key, direction: 'desc' }
      return null
    })
    setPage(0)
  }

  const isAllSelected =
    rows.length > 0 &&
    selectedIds.length > 0 &&
    selectedIds.length === rows.filter((r) => r.id !== undefined).length

  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      <div className={cn('overflow-x-auto w-full', className)}>
        <Table>
          <TableHeader>
            <TableRow className="bg-white border-b border-gray-50">
              {showCheckbox && (
                <TableHead className="px-8 py-5 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                </TableHead>
              )}
              {showInitials && <TableHead className="px-8 py-5 w-16" />}
              {columns.map((col) => {
                const active = sort && sort.key === String(col.key)
                const ariaSort = active
                  ? sort!.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
                return (
                  <TableHead
                    key={String(col.key)}
                    role="columnheader"
                    aria-sort={ariaSort}
                    className={cn(
                      'px-8 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest select-none',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right',
                      col.sortable && 'cursor-pointer'
                    )}
                    onClick={() => handleHeaderClick(col)}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    <span className={cn(active && 'text-gray-900')}>
                      {col.label}
                      {col.sortable && (
                        <span className="ml-2 text-[10px]">
                          {active
                            ? sort!.direction === 'asc'
                              ? '↑'
                              : '↓'
                            : ''}
                        </span>
                      )}
                    </span>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-50">
            {paginatedRows.map((row, index) => (
              <TableRow
                key={(row.id ?? index) as React.Key}
                className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                onClick={() => onRowClick?.(row)}
                data-state={
                  row.id !== undefined &&
                  selectedIds.includes(row.id as string | number)
                    ? 'selected'
                    : undefined
                }
              >
                {showCheckbox && (
                  <TableCell className="px-8 py-6">
                    <input
                      type="checkbox"
                      checked={
                        row.id !== undefined &&
                        selectedIds.includes(row.id as string | number)
                      }
                      onChange={() => toggleRow(row)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                )}
                {showInitials && (
                  <TableCell className="px-8 py-6">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm tracking-tighter shrink-0',
                        pickColor(initialsPalette, index)
                      )}
                    >
                      {deriveInitials(
                        resolveKey(row, initialsKey ?? '') as string
                      )}
                    </div>
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={cn(
                      'px-8 py-6',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {col.render
                      ? col.render(row, index)
                      : getCellValue(
                          row,
                          String(col.key),
                          col.defaultEmptyValue
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {paginatedRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={
                    (showCheckbox ? 1 : 0) +
                    (showInitials ? 1 : 0) +
                    columns.length
                  }
                  className="px-8 py-10 text-center text-sm text-gray-500"
                >
                  Nenhum item encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {pagination && (
          <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-between text-gray-400 font-bold text-[11px] uppercase tracking-[2px]">
            <span>
              Página {page + 1} de {totalPages}
            </span>
            <div className="flex items-center gap-6">
              <button
                className={cn(
                  'transition-colors',
                  page === 0
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:text-gray-900 font-extrabold'
                )}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                Anterior
              </button>
              <div className="flex items-center gap-2">
                <select
                  className="text-gray-500 bg-white border border-gray-200 rounded-md px-2 py-1 text-[11px]"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value))
                    setPage(0)
                  }}
                >
                  {rowsPerPageOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}/pág
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="hover:text-blue-600 transition-colors font-extrabold"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page + 1 >= totalPages}
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function pickColor(palette: string[] | undefined, index: number): string {
  const colors = palette ?? [
    'bg-blue-100 text-blue-600',
    'bg-amber-100 text-amber-600',
    'bg-emerald-100 text-emerald-600',
    'bg-slate-100 text-slate-600'
  ]
  return colors[index % colors.length]
}

function deriveInitials(value: string | undefined): string {
  if (!value || typeof value !== 'string') return ''
  return value
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function resolveKey<T>(row: T, key: string): unknown {
  const match = /^(\w+)\[(\d+)\]$/.exec(key)
  if (match) {
    const prop = match[1] as keyof T
    const index = Number(match[2])
    const value = (row[prop] as unknown[] | undefined)?.[index]
    return value
  }
  const normalKey = key as keyof T
  return (row as unknown as Record<string, unknown>)[normalKey as string]
}

function normalize(value: unknown): number | string {
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'string') {
    const n = Number(value)
    if (!Number.isNaN(n) && value.trim() !== '') return n
    return value.toLowerCase()
  }
  if (typeof value === 'number') return value
  if (typeof value === 'boolean') return value ? 1 : 0
  if (value == null) return ''
  return JSON.stringify(value)
}

function getCellValue<T>(
  row: T,
  key: string,
  defaultEmptyValue = ''
): React.ReactNode {
  const value = resolveKey(row, key)
  if (value === undefined || value === null) return defaultEmptyValue
  if (typeof value === 'object' && !(value instanceof Date))
    return JSON.stringify(value)
  return String(value)
}
