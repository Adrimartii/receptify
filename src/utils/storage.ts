import { supabase } from './supabase';

/**
 * Upload a receipt image to Supabase Storage
 * @param file File to upload
 * @param userId User ID for folder organization
 * @returns URL of the uploaded file
 */
export async function uploadReceiptImage(file: File, userId: string): Promise<string> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Création du nom de fichier avec le même format que précédemment
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    console.log('Attempting to upload file:', fileName);

    // Upload du fichier avec la même configuration que précédemment
    const { data, error } = await supabase.storage
      .from('receipts')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Error uploading file: ${error.message}`);
    }

    console.log('File uploaded successfully:', data);

    // Génération d'une URL signée comme précédemment
    const { data: { signedUrl }, error: signedUrlError } = await supabase.storage
      .from('receipts')
      .createSignedUrl(fileName, 60 * 60); // 1 heure d'expiration

    if (signedUrlError || !signedUrl) {
      throw new Error('Failed to generate signed URL');
    }

    console.log('Signed URL generated:', signedUrl);
    return signedUrl;

  } catch (error) {
    console.error('Error in uploadReceiptImage:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

/**
 * Delete a receipt image from Supabase Storage
 * @param imageUrl URL of the image to delete
 */
export async function deleteReceiptImage(imageUrl: string): Promise<void> {
  const path = imageUrl.split('/').slice(-2).join('/');
  
  const { error } = await supabase.storage
    .from('receipts')
    .remove([path]);

  if (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
}

/**
 * Get a signed URL for a receipt image
 * @param path Path of the image in storage
 * @returns Signed URL with 1 hour expiration
 */
export async function getSignedUrl(path: string): Promise<string> {
  const { data: { signedUrl }, error } = await supabase.storage
    .from('receipts')
    .createSignedUrl(path, 60 * 60); // 1 hour expiration

  if (error || !signedUrl) {
    throw new Error(`Error getting signed URL: ${error?.message || 'No URL generated'}`);
  }

  return signedUrl;
}