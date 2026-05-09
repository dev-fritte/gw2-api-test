import {CircleUser, Home, Radar, Sparkle, User} from 'lucide-react'

export const routes = [
    {
        title: 'Home',
        path: '/',
        icon: Home,
    },
    {
        title: 'Characters',
        path: '/characters',
        icon: User,
    },
    {
        title: 'Legendary Equipment',
        path: '/legendary',
        icon: Sparkle,
    },
    {
        title: 'Legendary Finder',
        path: '/legendary-finder',
        icon: Radar,
    },
    {
        title: 'Account',
        path: '/account',
        icon: CircleUser,
    },
]