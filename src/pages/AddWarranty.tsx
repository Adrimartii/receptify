import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PRODUCT_CATEGORIES } from '../constants/categories';
import { uploadReceiptImage } from '../utils/storage';
import { createReceipt } from '../services/receipts';
import { WarrantyInfoModal } from '../components/WarrantyInfoModal';

export function AddWarranty() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showWarrantyInfo, setShowWarrantyInfo] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    purchaseDate: '',
    price: '',
    expiryDate: '',
    imageUrl: '',
    extendedWarranty: {
      enabled: false,
      duration: 12,
    },
  });

  const updateExpiryDate = (purchaseDate: string, extendedMonths: number = 0) => {
    if (!purchaseDate) return;
    
    const date = new Date(purchaseDate);
    date.setFullYear(date.getFullYear() + 2);
    if (extendedMonths > 0) {
      date.setMonth(date.getMonth() + extendedMonths);
    }
    
    setFormData((prev) => ({
      ...prev,
      expiryDate: date.toISOString().split('T')[0],
    }));
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setLoading(true);
    
    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('L\'image est trop volumineuse. Maximum 5MB.');
      }

      setImageFile(file);

      const reader = new FileReader();
      const imageUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Erreur lors de la lecture du fichier'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setFormData(prev => ({
        ...prev,
        imageUrl,
      }));

    } catch (error) {
      console.error('Erreur lors du traitement de l\'image:', error);
      alert(error instanceof Error ? error.message : 'Une erreur est survenue lors du traitement de l\'image');
      setImageFile(null);
      setFormData(prev => ({
        ...prev,
        imageUrl: '',
      }));
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    multiple: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !imageFile) return;

    setLoading(true);
    try {
      const imageUrl = await uploadReceiptImage(imageFile, user.id);

      await createReceipt({
        product_name: formData.productName,
        category: formData.category,
        purchase_date: formData.purchaseDate,
        expiry_date: formData.expiryDate,
        price: parseFloat(formData.price),
        image_url: imageUrl,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving receipt:', error);
      alert('Une erreur est survenue lors de l\'enregistrement du reçu. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (formData.imageUrl && formData.imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imageUrl);
      }
    };
  }, [formData.imageUrl]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 pb-12">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Uploader le reçu
        </h2>
        <div
          {...getRootProps()}
          className={`mt-2 flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-xl ${
            isDragActive ? 'border-indigo-600' : 'border-gray-300'
          }`}
          onClick={(e) => e.preventDefault()}
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex flex-col gap-4 mt-4">
              <p className="text-base text-gray-600">
                Choisissez une option :
              </p>
              <div className="flex flex-col gap-2 w-full">
                <input {...getInputProps()} className="hidden" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const input = document.querySelector('input[type="file"]');
                    if (input) input.click();
                  }}
                  className="w-full px-4 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Télécharger mon reçu
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="productName"
            className="block text-base font-medium text-gray-700"
          >
            Nom du produit
          </label>
          <input
            type="text"
            id="productName"
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-base py-3"
            value={formData.productName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, productName: e.target.value }))
            }
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-base font-medium text-gray-700"
          >
            Prix d'achat
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              step="0.01"
              id="price"
              required
              className="block w-full pr-12 rounded-lg border-gray-300 focus:border-brand-500 focus:ring-brand-500 text-base py-3"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-base font-medium text-gray-700"
          >
            Catégorie
          </label>
          <select
            id="category"
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-base py-3"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Sélectionnez une catégorie</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="purchaseDate"
            className="block text-base font-medium text-gray-700"
          >
            Date d'achat
          </label>
          <input
            type="date"
            id="purchaseDate"
            required
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-base py-3"
            value={formData.purchaseDate}
            onChange={(e) => {
              const newPurchaseDate = e.target.value;
              setFormData((prev) => ({ ...prev, purchaseDate: newPurchaseDate }));
              updateExpiryDate(
                newPurchaseDate,
                formData.extendedWarranty.enabled ? formData.extendedWarranty.duration : 0
              );
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="extendedWarranty"
              className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
              checked={formData.extendedWarranty.enabled}
              onChange={(e) => {
                const enabled = e.target.checked;
                setFormData((prev) => ({
                  ...prev,
                  extendedWarranty: {
                    ...prev.extendedWarranty,
                    enabled,
                  },
                }));
                if (formData.purchaseDate) {
                  updateExpiryDate(
                    formData.purchaseDate,
                    enabled ? formData.extendedWarranty.duration : 0
                  );
                }
              }}
            />
            <label htmlFor="extendedWarranty" className="ml-2 block text-base text-gray-900">
              Garantie supplémentaire
            </label>
          </div>

          {formData.extendedWarranty.enabled && (
            <div>
              <label htmlFor="warrantyDuration" className="block text-base font-medium text-gray-700">
                Durée de la garantie supplémentaire (en mois)
              </label>
              <input
                type="number"
                id="warrantyDuration"
                min="1"
                max="120"
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-base py-3"
                value={formData.extendedWarranty.duration}
                onChange={(e) => {
                  const duration = parseInt(e.target.value) || 0;
                  setFormData((prev) => ({
                    ...prev,
                    extendedWarranty: {
                      ...prev.extendedWarranty,
                      duration,
                    },
                  }));
                  if (formData.purchaseDate) {
                    updateExpiryDate(formData.purchaseDate, duration);
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="expiryDate"
            className="block text-base font-medium text-gray-700 flex items-center gap-2"
          >
            Date d'expiration
            <button
              type="button"
              onClick={() => setShowWarrantyInfo(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Info className="h-5 w-5" />
            </button>
          </label>
          <input
            type="date"
            id="expiryDate"
            required
            disabled
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-base py-3 bg-gray-50"
            value={formData.expiryDate}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 text-base font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg transition-colors"
          >
            {loading ? 'Chargement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
      <WarrantyInfoModal
        isOpen={showWarrantyInfo}
        onClose={() => setShowWarrantyInfo(false)}
      />
    </div>
  );
}