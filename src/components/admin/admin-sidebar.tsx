'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarContent,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ListChecks,
  FileCode2,
  Trophy,
  Code2,
  Settings,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/mcqs', label: 'MCQs', icon: ListChecks },
  { href: '/admin/problems', label: 'Problems', icon: FileCode2 },
  { href: '/admin/rounds', label: 'Rounds', icon: Settings },
  { href: '/admin/results', label: 'Live Leaderboard', icon: Trophy },
  { href: '/admin/disqualified', label: 'Disqualified', icon: AlertTriangle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSidebar();
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    router.replace('/admin/login');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Code2 className="size-6 text-primary" />
            {open && <span className="font-bold font-headline">DebugArena</span>}
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                 <SidebarMenuButton
                  onClick={handleLogout}
                  tooltip={{ children: "Logout" }}
                >
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
