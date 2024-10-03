import React, { useState } from 'react'
import { IconChevronDown, IconX } from "@tabler/icons-react"

interface SelectProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option]
    onChange(newValue)
  }

  const removeValue = (optionToRemove: string) => {
    onChange(value.filter(v => v !== optionToRemove))
  }

  return (
    <div className="relative">
      <div
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {value.length > 0 ? (
            value.map(v => (
              <span key={v} className="bg-secondary text-secondary-foreground px-1 py-0.5 rounded-sm text-xs flex items-center">
                {v}
                <button onClick={(e) => { e.stopPropagation(); removeValue(v); }} className="ml-1">
                  <IconX size={12} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder || 'Select options'}</span>
          )}
        </div>
        <IconChevronDown className="h-4 w-4 opacity-50" />
      </div>
      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center"
              onClick={() => handleSelect(option)}
            >
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => {}}
                className="mr-2"
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}