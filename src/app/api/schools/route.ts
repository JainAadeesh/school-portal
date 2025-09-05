import { NextRequest, NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';
import path from 'path';
import { promises as fs } from 'fs';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Disable Next body parsing for multipart (not needed in app router; using formData API)

export async function GET() {
	try {
		const pool = getDbPool();
		const [rows] = await pool.query(
			'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC'
		);
		return NextResponse.json(rows);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		return NextResponse.json({ message }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const name = String(formData.get('name') || '').trim();
		const address = String(formData.get('address') || '').trim();
		const city = String(formData.get('city') || '').trim();
		const state = String(formData.get('state') || '').trim();
		const contact = String(formData.get('contact') || '').trim();
		const email_id = String(formData.get('email_id') || '').trim();
		const image = formData.get('image') as unknown as File | null;

		if (!name || !address || !city || !state || !contact || !email_id || !image) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
		}

		// Save image to public/schoolImages with a unique filename
		const bytes = crypto.randomBytes(8).toString('hex');
		const ext = image.name.split('.').pop() || 'jpg';
		const filename = `${bytes}.${ext}`;
		const destDir = path.join(process.cwd(), 'public', 'schoolImages');
		await fs.mkdir(destDir, { recursive: true });
		const arrayBuffer = await image.arrayBuffer();
		await fs.writeFile(path.join(destDir, filename), Buffer.from(arrayBuffer));

		const pool = getDbPool();
		await pool.execute(
			'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[name, address, city, state, contact, `/schoolImages/${filename}`, email_id]
		);

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		return NextResponse.json({ message }, { status: 500 });
	}
}
