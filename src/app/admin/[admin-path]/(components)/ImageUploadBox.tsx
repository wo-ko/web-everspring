'use client';

import { useEffect, useState } from 'react';

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function ImageUploadBox({ file, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div>
      <label className='block text-sm font-medium mb-1'>เลือกรูปใหม่</label>

      <input
        type='file'
        accept='image/*'
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          onChange(selectedFile);
        }}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = '';
        }}
      />

      {preview && (
        <div className='mt-3 border rounded-lg p-2'>
          <img
            src={preview}
            alt='preview'
            className='max-h-48 object-contain mx-auto'
          />
        </div>
      )}
    </div>
  );
}
