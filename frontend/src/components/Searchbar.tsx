import type { FC } from "react";
import  { Input } from "./ui/input.tsx"

export type SearchbarProps = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export const Searchbar: FC<SearchbarProps> = ({ placeholder, value, onChange }) => {
  return (
    <div>
      <Input placeholder={placeholder}  value={value} />
    </div>
  )
}
