import {type Item} from '@/item/types.ts'
import {getItemRarityColor} from '@/item/item-utils.ts'
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card.tsx'

type ItemPreviewProps = {
    item: Item;
}

export const ItemPreview = ({item}: ItemPreviewProps) => {


    return (
        <HoverCard>
            <HoverCardTrigger>
                <div style={{border: `2px solid ${getItemRarityColor(item.rarity)}`}} className={`w-15 h-15`}>
                    <img src={item.icon} alt={`item <${item.name}> icon`}/>
                </div>
            </HoverCardTrigger>

            <HoverCardContent>
                <div className={'flex flex-col gap-2 w-60'}>
                    <div className={'flex gap-2'}>
                        <img src={item.icon} alt={`item <${item.name}> icon`}/>
                        <h3 className={'nowrap'}>{item.name}</h3>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: item.description}}/>
                    <p>{item.rarity}</p>
                </div>
            </HoverCardContent>

        </HoverCard>
    )
}