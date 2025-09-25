import {type Item} from '@/item/types.ts'
import {getItemRarityColor} from '@/item/item-utils.ts'
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card.tsx'

type ItemPreviewProps = {
    item: Item;
    unlocked?: boolean,
    amount? : string,
}

export const ItemPreview = ({item, unlocked, amount}: ItemPreviewProps) => {


    return (
        <HoverCard>
            <HoverCardTrigger>
                <div style={{border: `2px solid ${getItemRarityColor(item.rarity)}`}} className={`w-15 h-15`}>
                    <img src={item.icon} alt={`item <${item.name}> icon`}
                         style={{filter: `grayscale(${unlocked ? 0 : '100%'}) brightness(${unlocked ? '100%' : '50%'})`,}}/>
                    {unlocked && <ItemUnlockedMarker text={amount}/>}
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

const ItemUnlockedMarker = ({text} : {text?: string}) => {
    return (
        <div style={{
            position: 'relative',
            bottom: 20,
            left: 0,
            right: 0,
            height: '20px',
            backgroundColor: 'rgba(52,52,52,0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <p className={'text-white'}>{text}</p>
        </div>
    )
}