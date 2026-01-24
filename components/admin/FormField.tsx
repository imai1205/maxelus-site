'use client'

import { forwardRef } from 'react'

interface FormFieldProps {
  label: string
  description?: string
  cmsKey: string
  children: React.ReactNode
  highlighted?: boolean
}

export function FormField({ label, description, cmsKey, children, highlighted }: FormFieldProps) {
  return (
    <div 
      className={`space-y-2 transition-all duration-300 ${
        highlighted ? 'bg-yellow-50 -mx-4 px-4 py-3 rounded-lg ring-2 ring-yellow-400' : ''
      }`}
      data-cms-key={cmsKey}
    >
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      {children}
    </div>
  )
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  cmsKey: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ cmsKey, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-cms-key={cmsKey}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fff100] focus:border-transparent outline-none transition-all ${className}`}
        {...props}
      />
    )
  }
)
TextInput.displayName = 'TextInput'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  cmsKey: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ cmsKey, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-cms-key={cmsKey}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fff100] focus:border-transparent outline-none transition-all resize-none ${className}`}
        {...props}
      />
    )
  }
)
TextArea.displayName = 'TextArea'

interface FormCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function FormCard({ title, description, children }: FormCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

interface ImagePickerProps {
  cmsKey: string
  value: { id: string; bucket: string; path: string; alt: string } | null
  onChange: (asset: { id: string; bucket: string; path: string; alt: string } | null) => void
  onPickerOpen: () => void
}

export function ImagePicker({ cmsKey, value, onChange, onPickerOpen }: ImagePickerProps) {
  const imageUrl = value 
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${value.bucket}/${value.path}`
    : null

  return (
    <div className="space-y-2" data-cms-key={cmsKey}>
      {imageUrl ? (
        <div className="relative group">
          <img 
            src={imageUrl} 
            alt={value?.alt || ''} 
            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onPickerOpen}
              className="px-2 py-1 bg-white text-gray-900 text-xs rounded hover:bg-gray-100"
            >
              変更
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              クリア
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onPickerOpen}
          className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
      <p className="text-xs text-gray-500">Assetsから画像を選択</p>
    </div>
  )
}
