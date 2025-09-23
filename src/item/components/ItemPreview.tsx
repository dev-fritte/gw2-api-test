import {type Item} from '@/item/types.ts'
import {getItemRarityColor} from '@/item/item-utils.ts'
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card.tsx'

type ItemPreviewProps = {
    item: Item;
    unlocked?: boolean,
}

export const ItemPreview = ({item, unlocked}: ItemPreviewProps) => {


    return (
        <HoverCard>
            <HoverCardTrigger>
                <div style={{border: `2px solid ${getItemRarityColor(item.rarity)}`}} className={`w-15 h-15`}>
                    <img src={item.icon} alt={`item <${item.name}> icon`} style={{filter: `grayscale(${unlocked ? 0 : '100%'})`,}}/>
                    {unlocked && <ItemUnlockedMarker />}
                </div>
            </HoverCardTrigger>

            <HoverCardContent>
                <div className={'flex flex-col gap-2 w-60'}>
                    <div className={'flex gap-2'}>
                        <img src={item.icon} alt={`item <${item.name}> icon`}/>
                        <h3 className={'nowrap'}>{item.name}</h3>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: item.description}}/>
                    <p className={'text-sm'}
                       style={{color: getItemRarityColor(item.rarity)}}>{item.rarity}</p>
                </div>
            </HoverCardContent>

        </HoverCard>
    )
}

const ItemUnlockedMarker = () => {
    return (
        <div style={{
            position: 'relative',
            bottom: 20,
            right: 2,
            width: 0,
            height: 0,
            borderTop: '15px solid transparent',
            borderBottom: '15px solid transparent',
            borderLeft: '15px solid green',
            transform: 'rotate(135deg)',
        }}/>
    )
}