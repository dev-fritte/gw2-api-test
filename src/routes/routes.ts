import { CircleUser, ClipboardCheckIcon, Home, Sparkle, User } from 'lucide-react'

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
        title: 'Account',
        path: '/account',
        icon: CircleUser,
    }
]