"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { ThemeToggle } from "./ui/theme-toogle";

export default function AdminHeader() {
  const { setTheme } = useTheme();
  return (
    <>
      <div className='flex justify-between mb-4'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight p-1'>
            Welcome back!
          </h2>
          <p className='text-muted-foreground text-sm p-1'>
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className='flex gap-5'>
          <ThemeToggle />

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-8 w-8 rounded-full'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src='/avatars/03.png' alt='@shadcn' />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>Sourabh</p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      godarasourav181@gmail.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
