'use client';
import {useQuery} from '@tanstack/react-query';
import {ArrowUpRight,CheckCircle2,Handshake,PhoneCall,UserPlus,Users} from 'lucide-react';
import {Card,CardContent} from '@/components/ui/card';
import {AnalyticsOverview} from '@/components/analytics-overview';

const cards=[
	['Total Customers','total',Users,'+3.2%','vs. last month','blue'],
	['Active Customers','active',CheckCircle2,'+5.8%','vs. last month','emerald'],
	['New Customers','newCustomers',UserPlus,'+12.4%','vs. last month','violet'],
	['Open Deals','openDeals',Handshake,'+8.1%','vs. last month','amber'],
	['Pending Tasks','pendingTasks',ArrowUpRight,'-1.5%','vs. last week','rose'],
	['Contacted This Week','contactedThisWeek',PhoneCall,'+6.7%','vs. last week','cyan'],
] as const;

export function StatsCards(){
	const {data,isLoading}=useQuery({queryKey:['stats'],queryFn:()=>fetch('/api/stats').then(r=>r.json())});
	return <><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([title,key,Icon,trend,comparison,color])=><Card key={title} className="border-white/[.07] bg-card/80"><CardContent className="flex min-h-[132px] items-start justify-between p-5"><div><p className="text-sm text-muted-foreground">{title}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{isLoading?'—':(data?.[key]??0)}</p><p className="mt-2 text-xs text-muted-foreground"><span className={trend.startsWith('-')?'text-rose-400':'text-emerald-400'}>{trend}</span> {comparison}</p></div><div className={`rounded-xl p-2.5 ${color==='blue'?'bg-blue-500/10 text-blue-400':color==='emerald'?'bg-emerald-500/10 text-emerald-400':color==='violet'?'bg-violet-500/10 text-violet-400':color==='amber'?'bg-amber-500/10 text-amber-400':color==='rose'?'bg-rose-500/10 text-rose-400':'bg-cyan-500/10 text-cyan-400'}`}><Icon className="h-5 w-5"/></div></CardContent></Card>)}</div><AnalyticsOverview/></>
}
