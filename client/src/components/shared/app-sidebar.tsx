import { ChartNoAxesColumn, HandCoins } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext";

const items = [
  {
    title: "Elemzések",
    url: "/",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Számlák",
    url: "/invoice",
    icon: HandCoins,
  }
];

const UserData = () => {
    const { user } = useUserContext()
    return (
        <div className="flex items-center select-none bg-white/50 border-2 border-black/10 rounded-lg p-3 gap-2">
            <div>
                <img src={user.pfp} className="rounded-lg bg-black" width={50} alt={`${user.name} profilképe`} />
            </div>
            <div>
                <p className="font-bold">{user.name}</p>
                <span className="text-black/50 flex items-center gap-1 text-sm">{user.email.split('@')[0]}</span>
            </div>
        </div>
    )
}

export function AppSidebar() {
    const location = useLocation()
  return (
    <Sidebar>
      <SidebarContent>
        <img src="logo.png" className="mt-3 mx-auto drag-none select-none" width={200} alt="Logo" />
        <SidebarGroup>
          <SidebarGroupLabel>DiákKassza</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title} className={location.pathname === item.url ? 'bg-secondarycolor text-white rounded-md transition-all duration-300' : ''}>
                    <SidebarMenuButton className={location.pathname === item.url ? 'hover:bg-secondarycolor hover:text-white' : ''} asChild>
                        <a href={item.url}>
                        <item.icon color={location.pathname === item.url ? 'white' : '#dda802'}/>
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
            <UserData />
      </SidebarFooter>
    </Sidebar>
  )
}
