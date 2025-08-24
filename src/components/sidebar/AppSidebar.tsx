import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import {routes} from '@/routes/routes.ts'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip.tsx'

export function AppSidebar() {

    return (
        <Sidebar collapsible={'icon'}>
            <SidebarHeader>
                <div className={'flex m-auto'}>
                    <h1>GW2 API Test</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {routes.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.path}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <item.icon/>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Tooltip</p>
                                                </TooltipContent>
                                            </Tooltip>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {}
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
}