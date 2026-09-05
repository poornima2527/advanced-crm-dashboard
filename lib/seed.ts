import type { Customer } from '@/types/customer';
const companies=['Acme Corp','Globex','Innovatech','Stark Industries','Innovate Solutions Inc.','Campresso Ltd.','Cavari Corp.'];
const names=['Alice Green','Bob Ross','Charlie Davis','Eleanor Henderson','John Ross','Eoron Ross','John Doe','Sarah Chen','Olivia Martin','Daniel Kim','Maya Patel','Noah Wilson'];
export function seedCustomers(count=150): Customer[] { return Array.from({length:count},(_,i)=>({ name:names[i%names.length], email:`${names[i%names.length].toLowerCase().replace(/ /g,'.')}${i?i:''}@example.com`, phone:`+1 (555) ${String(100+i).padStart(3,'0')}-${String(1000+i).slice(-4)}`, company:companies[i%companies.length], status:(['Active','Prospect','Lead','Inactive','Active','Active','Archive'] as const)[i%7], lastContactDate:new Date(Date.UTC(2023, (i*3)%12, (i%27)+1)).toISOString().slice(0,10), notes:i%3===0?'Follow-up requested after product discussion.':'', createdAt:new Date(Date.UTC(2023,0,1+i%200)).toISOString() })); }

export function seedDeals() { return [
	{ name:'Enterprise renewal', customer:'Alice Green', value:'85000', stage:'Negotiation', probability:'75', closeDate:'2026-09-18', status:'Open', createdAt:'2026-08-20T09:00:00.000Z' },
	{ name:'Analytics platform rollout', customer:'Daniel Kim', value:'62000', stage:'Proposal', probability:'55', closeDate:'2026-10-04', status:'Open', createdAt:'2026-08-18T09:00:00.000Z' },
	{ name:'Growth plan expansion', customer:'Maya Patel', value:'42000', stage:'Qualified', probability:'35', closeDate:'2026-10-21', status:'Open', createdAt:'2026-08-12T09:00:00.000Z' },
	{ name:'Onboarding package', customer:'Sarah Chen', value:'18500', stage:'Won', probability:'100', closeDate:'2026-08-28', status:'Closed', createdAt:'2026-08-05T09:00:00.000Z' },
]; }

export function seedTasks() { return [
	{ title:'Send renewal proposal', customer:'Alice Green', dueDate:'2026-09-08', priority:'High', status:'Pending', assignee:'CRM Admin', createdAt:'2026-09-01T09:00:00.000Z' },
	{ title:'Schedule product walkthrough', customer:'Daniel Kim', dueDate:'2026-09-10', priority:'Medium', status:'In Progress', assignee:'CRM Admin', createdAt:'2026-08-30T09:00:00.000Z' },
	{ title:'Review expansion requirements', customer:'Maya Patel', dueDate:'2026-09-14', priority:'Medium', status:'Pending', assignee:'CRM Admin', createdAt:'2026-08-28T09:00:00.000Z' },
	{ title:'Confirm onboarding handoff', customer:'Sarah Chen', dueDate:'2026-09-03', priority:'Low', status:'Completed', assignee:'CRM Admin', createdAt:'2026-08-22T09:00:00.000Z' },
]; }
