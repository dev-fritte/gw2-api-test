import React from 'react'
import type {Character} from '@/character/character-types.ts'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table.tsx'
import {type ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'

type CharacterTableProps = {
    characters: Character[] | undefined
}

type CharacterColumn = Pick<Character, 'name' | 'profession' | 'created' | 'age'>

export const CharacterTable: React.FC<CharacterTableProps> = ({characters}) => {

    const columns: ColumnDef<CharacterColumn>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "profession",
            header: "Profession",
        },
        {
            accessorKey: "age",
            header: "Playtime",
            cell: (cell) => `${(Number(cell.getValue()) / 3600).toFixed(1)} h`,
        }
    ]

    const table = useReactTable<CharacterColumn>({
        data: characters || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                                data-state={row.getIsSelected() && "selected"}
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