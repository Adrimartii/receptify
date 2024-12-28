export const PRODUCT_CATEGORIES = [
  { id: 'appliances', label: 'Électroménager' },
  { id: 'small-appliances', label: 'Petit électroménager' },
  { id: 'furniture', label: 'Meubles' },
  { id: 'electronics', label: 'Électronique' },
  { id: 'computers', label: 'Informatique' },
  { id: 'tools', label: 'Outillage' },
  { id: 'garden', label: 'Jardin' },
  { id: 'sports', label: 'Sport & Loisirs' },
  { id: 'other', label: 'Autre' },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]['id'];