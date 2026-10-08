'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { ImagePlus, Trash2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  preview?: string;
  onRemove?: () => void;
  label?: string;
  hint?: string;
  accept?: string;
}

export default function ImageDropzone({
  onFileSelect,
  preview,
  onRemove,
  label = 'Banner project',
  hint = 'Seret gambar ke sini atau klik untuk memilih. Rasio 16:9 direkomendasikan.',
  accept = 'image/*',
}: ImageDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const acceptFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran gambar maksimal 5 MB.');
        return;
      }
      setError('');
      onFileSelect(file);
    },
    [onFileSelect],
  );

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[0.8125rem] font-medium">
          {label}
        </label>
        {preview && onRemove && (
          <Button type="button" variant="ghost" size="sm" onClick={onRemove} className="text-red-500 hover:bg-red-500/10 hover:text-red-500">
            <Trash2 className="h-3.5 w-3.5" />
            Hapus
          </Button>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          acceptFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed transition-all duration-300 ${
          dragging
            ? 'border-[var(--foreground)] bg-[var(--accent-soft)]'
            : 'border-[var(--input)] bg-[var(--surface-2)]/40 hover:border-[color-mix(in_oklab,var(--foreground)_30%,transparent)]'
        } ${preview ? 'aspect-[16/9]' : 'h-52'}`}
      >
        {preview ? (
          <>
            {/* Remote preview — plain img keeps arbitrary hosts working */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Pratinjau banner" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-black">
                <ImagePlus className="h-4 w-4" />
                Ganti gambar
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--surface)]">
              <UploadCloud className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.75} />
            </span>
            <p className="text-sm text-[var(--muted)]">{hint}</p>
          </div>
        )}

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => acceptFile(e.target.files?.[0])}
        />
      </div>

      {error && (
        <p className="text-[0.8125rem] text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
