import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { seedCustomers } from '@/lib/seed';

export async function GET(req: NextRequest) {
  const db = await getDb();
  const col = db.collection('customers');
  if (process.env.CRM_DEMO_MODE === 'true' && await col.countDocuments() === 0) {
    await col.insertMany(seedCustomers().map(({ _id, ...customer }) => customer));
  }
  const sp = req.nextUrl.searchParams;
  const q = (sp.get('q') || '').trim();
  const page = Math.max(1, Number(sp.get('page') || 1));
  const limit = Math.min(50, Math.max(10, Number(sp.get('limit') || 10)));
  const sort = sp.get('sort') || 'name';
  const dir = sp.get('dir') === 'desc' ? -1 : 1;
  const statuses = (sp.get('statuses') || '').split(',').filter(Boolean);
  const companies = (sp.get('companies') || '').split(',').filter(Boolean);
  const from = sp.get('from') || '';
  const to = sp.get('to') || '';
  const phone = sp.get('phone') || '';
  const email = sp.get('email') || '';
  const filter: Record<string, unknown> = {};
  if (q) filter.$or = [{ name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }, { company: { $regex: q, $options: 'i' } }];
  if (statuses.length) filter.status = { $in: statuses };
  if (companies.length) filter.company = { $in: companies };
  if (phone) filter.phone = { $regex: phone, $options: 'i' };
  if (email) filter.email = { $regex: email, $options: 'i' };
  if (from || to) filter.lastContactDate = { ...(from ? { $gte: from } : {}), ...(to ? { $lte: to } : {}) };
  const total = await col.countDocuments(filter);
  const customers = await col.find(filter).sort({ [sort]: dir }).skip((page - 1) * limit).limit(limit).toArray();
  const companiesList = await col.distinct('company');
  return NextResponse.json({ customers: customers.map(x => ({ ...x, _id: x._id.toString() })), total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)), companies: companiesList });
}

export async function POST(req: NextRequest) { try { const body = await req.json(); const db = await getDb(); const customer = { ...body, createdAt: new Date().toISOString() }; const result = await db.collection('customers').insertOne(customer); return NextResponse.json({ ...customer, _id: result.insertedId.toString() }, { status: 201 }); } catch { return NextResponse.json({ error: 'Invalid customer payload' }, { status: 400 }); } }
export async function PATCH(req: NextRequest) { try { const body = await req.json(); const { _id, ...changes } = body; const db = await getDb(); const { ObjectId } = await import('mongodb'); await db.collection('customers').updateOne({ _id: new ObjectId(_id) }, { $set: changes }); const updated = await db.collection('customers').findOne({ _id: new ObjectId(_id) }); return NextResponse.json({ ...updated, _id: updated?._id.toString() }); } catch { return NextResponse.json({ error: 'Unable to update customer' }, { status: 400 }); } }
export async function DELETE(req: NextRequest) { try { const id = req.nextUrl.searchParams.get('id'); if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 }); const db = await getDb(); const { ObjectId } = await import('mongodb'); await db.collection('customers').deleteOne({ _id: new ObjectId(id) }); return NextResponse.json({ ok: true }); } catch { return NextResponse.json({ error: 'Unable to delete customer' }, { status: 400 }); } }