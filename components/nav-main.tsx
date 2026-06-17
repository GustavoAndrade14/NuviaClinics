"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type SidebarIcon = Icon | LucideIcon;

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: SidebarIcon
  }[]
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url ||
              (item.url !== "/" && pathname?.startsWith(item.url));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="
                    text-[#78736D] 
                    hover:text-foreground hover:bg-muted
                    data-[active=true]:bg-[#f5eee0] data-[active=true]:text-[#cc9433]
                    data-[state=active]:bg-[#f5eee0] data-[state=active]:text-[#cc9433]
                    py-3 px-4 h-auto min-h-[48px]
                    text-base
                    [&_svg]:size-5
                  "
                  data-active={isActive}
                  data-state={isActive ? "active" : undefined}
                  asChild
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}