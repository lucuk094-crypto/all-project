'use client';

import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  preview?: string;
  onRemove?: () => void;
  label?: string;
  accept?: string;
}

export default function ImageDropzone({ 
  onFileSelect, 
  preview, 
  onRemove,
  label = 'Banner Project',
  accept = 'image/*'
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      } else {
        alert('Hanya file gambar yang diperbolehkan');
      }
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-semibold text-gray-700 dark:text-white mb-3 block">
        {label}
      </label>
      
      {preview ? (
        <div className="relative group">
          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-white/10">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex gap-2">
                <label className="cursor-pointer">
                  <div className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Ganti
                  </div>
                  <input
                    type="file"
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
                {onRemove && (
                  <Button
                    type="button"
                    onClick={onRemove}
                    className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Hapus
                  </Button>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-white/70 mt-2 text-center">
            Hover untuk mengganti atau menghapus gambar
          </p>
        </div>
      ) : (
        <div
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-black dark:border-white bg-gray-50 dark:bg-white/10 scale-[1.02]'
              : 'border-gray-300 dark:border-white/20 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/10'
          }`}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="pointer-events-none">
            {isDragging ? (
              <>
                <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white dark:text-black" />
                </div>
                <p className="text-lg font-bold text-black dark:text-white mb-2">Lepas file di sini</p>
                <p className="text-sm text-gray-600 dark:text-white/70">File akan diupload secara otomatis</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400 dark:text-white/50" />
                </div>
                <p className="text-lg font-bold text-black dark:text-white mb-2">
                  Drag & Drop atau Klik untuk Upload
                </p>
                <p className="text-sm text-gray-600 dark:text-white/70 mb-4">
                  PNG, JPG, WEBP sampai 10MB
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold">
                  <Upload className="w-4 h-4" />
                  Pilih File
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
