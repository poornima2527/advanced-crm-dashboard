'use client';
import {BarChart3, CheckSquare, KanbanSquare, Menu, PanelLeftClose, Settings, Users, X} from 'lucide-react';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';

const items = [['Dashboard', BarChart3, '/dashboard'], ['Contacts', Users, '/contacts'], ['Deals', KanbanSquare, '/deals'], ['Tasks', CheckSquare, '/tasks'], ['Settings', Settings, '/settings']] as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navigation = <nav className="space-y-1 p-3">{items.map(([label, Icon, href]) => { const active = pathname === href || (href === '/dashboard' && pathname === '/'); return <a key={label} href={href} onClick={() => setMobileOpen(false)} className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors', active ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground', collapsed && 'justify-center px-2')} title={collapsed ? label : undefined}><Icon className="h-4 w-4 shrink-0"/>{!collapsed && label}</a> })}</nav>;
  return <>
    <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="fixed left-4 top-4 z-30 rounded-lg border border-border bg-card p-2 text-muted-foreground shadow-lg md:hidden"><Menu className="h-5 w-5"/></button>
    {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/60 md:hidden"/>}
    <aside className={cn('fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform md:static md:z-auto md:flex', mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0', collapsed ? 'md:w-16' : 'md:w-56')}>
      <div className="flex h-16 items-center justify-between border-b border-border px-4"><div className="font-bold tracking-[.18em] text-primary">{collapsed ? 'C' : 'CRM'}</div><div className="flex items-center gap-2"><button aria-label="Close mobile navigation" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground md:hidden"><X className="h-4 w-4"/></button><button aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(value => !value)} className="hidden text-muted-foreground hover:text-foreground md:block"><PanelLeftClose className={cn('h-4 w-4', collapsed && 'rotate-180')}/></button></div></div>
      {navigation}
      <div className="mt-auto border-t border-border p-4 text-xs text-muted-foreground">{!collapsed && <><p className="font-medium text-foreground">Workspace</p><p className="mt-1">Acme Growth Team</p></>}</div>
    </aside>
  </>;
}