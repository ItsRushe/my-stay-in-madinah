'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import { revalidatePath } from 'next/cache';

const ADMIN_COOKIE = 'msm_admin_session';

async function requireAdmin() {
  const cookieStore = await cookies();
  if (cookieStore.get(ADMIN_COOKIE)?.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: 'ADMIN_PASSWORD environment variable is not set.' };
  }

  if (password !== adminPassword) {
    return { error: 'Incorrect password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  redirect('/admin');
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect('/admin/login');
}

export async function updateRoomStatus(roomId: string, isActive: boolean) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('rooms').update({ is_available: isActive }).eq('id', roomId);
  revalidatePath('/admin');
  revalidatePath(`/admin/rooms/${roomId}`);
}

export async function updateRoomRate(roomId: string, rate: number) {
  await requireAdmin();
  if (isNaN(rate) || rate < 0) return { error: 'Invalid rate.' };
  const supabase = await createClient();
  await supabase.from('rooms').update({ price_per_night: rate }).eq('id', roomId);
  revalidatePath('/admin');
  revalidatePath(`/admin/rooms/${roomId}`);
}

export async function updateRoomNumber(roomId: string, roomNumber: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('rooms').update({ room_number: roomNumber.trim() }).eq('id', roomId);
  revalidatePath('/admin');
  revalidatePath(`/admin/rooms/${roomId}`);
}
