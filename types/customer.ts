export const CUSTOMER_STATUSES = ['Active','Inactive','Prospect','Lead','Archive'] as const;
export type CustomerStatus = typeof CUSTOMER_STATUSES[number];
export type Customer = { _id?: string; name:string; email:string; phone:string; company:string; status:CustomerStatus; lastContactDate:string; notes:string; createdAt:string; };
export type CustomerFilters = { statuses:CustomerStatus[]; companies:string[]; from?:string; to?:string; phone?:string; email?:string };
export type SavedFilter = { id:string; name:string; filters:CustomerFilters; favorite?:boolean; createdAt:string };
