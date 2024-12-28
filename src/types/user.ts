export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
    calendar: {
      google: boolean;
      outlook: boolean;
    };
  };
  subscriptionTier: 'free' | 'premium';
  subscriptionExpiryDate?: string;
}

export interface NotificationSettings {
  beforeExpiry: number; // days
  whenExpired: boolean;
  reminderFrequency: 'daily' | 'weekly' | 'monthly';
}