import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx'
import {ItemType} from '@/item/types.ts'

export type ItemTypeFilterValue = ItemType | 'All';

type ItemSelectTypeProps = {
    onChange: (value: ItemTypeFilterValue) => void,
}

export const ItemTypeSelect = ({onChange}: ItemSelectTypeProps) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Filter"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value={ItemType.ARMOR}><p className={'capitalize'}>{ItemType.ARMOR}</p></SelectItem>
                <SelectItem value={ItemType.WEAPON}><p className={'capitalize'}>{ItemType.WEAPON}</p></SelectItem>
            </SelectContent>
        </Select>
    )
}