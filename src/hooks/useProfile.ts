import { useState, useEffect } from 'react';
import { getCurrentUser, updateUserProfile } from '../services/users';
import type { UserProfile } from '../types/user';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getCurrentUser();
      setProfile(data);
    } catch (err) {
      setError('Erreur lors du chargement du profil');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updatedProfile = await updateUserProfile(updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refresh: loadProfile
  };
}