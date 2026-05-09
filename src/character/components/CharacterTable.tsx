import React, {useMemo} from 'react'
import type {Character} from '@/character/character-types.ts'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table.tsx'
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel, type OnChangeFn,
    type RowSelectionState,
    useReactTable
} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {Skeleton} from '@/components/ui/skeleton.tsx'

type CharacterTableProps = {
    characters: Character[] | undefined,
    isLoading?: boolean,
    rowSelection: RowSelectionState,
    onSelectionChange: OnChangeFn<RowSelectionState>
}

type CharacterColumn = Pick<Character, 'name' | 'profession' | 'created' | 'age'>

export const CharacterTable: React.FC<CharacterTableProps> = ({characters, isLoading, rowSelection, onSelectionChange}) => {

    const columns: ColumnDef<CharacterColumn>[] = [
        {
            id: 'selection',
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: (({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ))
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'profession',
            header: 'Class',
        },
        {
            accessorKey: 'age',
            header: 'Playtime',
            cell: (cell) => `${(Number(cell.getValue()) / 3600).toFixed(1)} h`,
        }
    ]

    const sortedData = useMemo(() => characters?.toSorted((a, b) => b.age - a.age), [characters])

    const table = useReactTable<CharacterColumn>({
        data: sortedData || [],
        columns,
        onRowSelectionChange: onSelectionChange,
        getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection,
        },
    })

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        Array.from({length: 5}).map((_, i) => (
                            <TableRow key={i}>
                                {columns.map((_, j) => (
                                    <TableCell key={j}>
                                        <Skeleton className="h-4 w-full"/>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                className="cursor-pointer"
                                onClick={() => row.toggleSelected()}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No characters found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
