import {CircleUser, ClipboardCheckIcon, Home, Sparkle} from 'lucide-react'

export const routes = [
    {
        title: 'Home',
        path: '/',
        icon: Home,
    },
    {
        title: 'Dailies',
        path: '/daily',
        icon: ClipboardCheckIcon,
    },
    {
        title: 'Legendary Equipment',
        path: '/legendary',
        icon: Sparkle,
    },
    {
        title: 'Account',
        path: '/account',
        icon: CircleUser,
    }
]