'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarContent,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ListChecks,
  FileCode2,
  Trophy,
  Users,
  LogOut,
  Code2,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/mcqs', label: 'MCQs', icon: ListChecks },
  { href: '/admin/problems', label: 'Problems', icon: FileCode2 },
  { href: '/admin/rounds', label: 'Rounds', icon: Settings },
  { href: '/admin/results', label: 'Results', icon: Trophy },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSidebar();
  
  const handleLogout = () => {
    router.push('/');
  }

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
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
