import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar.tsx'
import {AppSidebar} from '@/components/sidebar/AppSidebar.tsx'

export const Route = createRootRoute({
    component: () => (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main>
                    <SidebarTrigger/>
                    <Outlet/>
                </main>
            </SidebarProvider>
            <TanStackRouterDevtools/>
        </>
    ),
})
