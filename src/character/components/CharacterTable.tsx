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

type CharacterTableProps = {
    characters: Character[] | undefined,
    rowSelection: RowSelectionState,
    onSelectionChange: OnChangeFn<RowSelectionState>
}

type CharacterColumn = Pick<Character, 'name' | 'profession' | 'created' | 'age'>

export const CharacterTable: React.FC<CharacterTableProps> = ({characters, rowSelection, onSelectionChange}) => {

    const columns: ColumnDef<CharacterColumn>[] = [
        {
            id: 'selection',
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
            header: 'Profession',
        },
        {
            accessorKey: 'age',
            header: 'Playtime',
            cell: (cell) => `${(Number(cell.getValue()) / 3600).toFixed(1)} h`,
        }
    ]

    const sortedData = useMemo(() => characters?.toSorted((a, b) => b.age - a.age), [characters])

    console.log(sortedData)

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
        <div className="overflow-hidden rounded-md border ">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
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
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}