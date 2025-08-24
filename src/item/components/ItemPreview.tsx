import {type Item} from '@/item/types.ts'
import {getItemRarityColor} from '@/item/item-utils.ts'

type ItemPreviewProps = {
    item: Item;
}

export const ItemPreview = ({item}: ItemPreviewProps) => {
    return (
        <div style={{border: `2px solid ${getItemRarityColor(item.rarity)}`}} className={`w-15 h-15`}>
            <img src={item.icon} alt={`item <${item.name}> icon`}/>
        </div>
    )
}