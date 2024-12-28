import { supabase } from '../utils/supabase';
import type { Receipt, CreateReceiptDTO } from '../types/receipt';

export async function createReceipt(data: CreateReceiptDTO): Promise<Receipt> {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      throw new Error('Session not found');
    }

    const { data: receipt, error } = await supabase
      .from('receipts')
      .insert([
        {
          ...data,
          user_id: session.user.id,
        },
      ])
      .single();

    if (error) {
      console.error('Error creating receipt:', error);
      throw error;
    }

    return receipt;
  } catch (error) {
    console.error('Error in createReceipt:', error);
    throw error;
  }
}

export async function getUserReceipts(): Promise<Receipt[]> {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteReceipt(
  id: string,
  reason: { type: 'sold' | 'discarded' | 'other'; details?: string }
): Promise<void> {
  const { error } = await supabase
    .from('receipts')
    .update({
      deleted_at: new Date().toISOString(),
      deletion_reason: reason
    })
    .eq('id', id);

  if (error) throw error;
}