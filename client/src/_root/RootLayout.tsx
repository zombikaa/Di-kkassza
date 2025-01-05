import { AppSidebar } from '@/components/shared/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col h-full">
        <SidebarTrigger />
        <div className="flex-1 h-full pt-2 px-2 lg:px-10">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default RootLayout