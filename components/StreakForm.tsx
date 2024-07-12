import { useState } from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

interface StreakFormProps {
  onSubmit: (streak: { name: string; color: string }) => void;
}

export function StreakForm({ onSubmit }: StreakFormProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#3B82F6') // default blue

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit({ name, color })
      setName('')
      setColor('#3B82F6')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add new streak"
        className="mr-2"
      />
      <Input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-10 p-0 mr-2"
      />
      <Button type="submit">
        <Plus className="mr-2 h-4 w-4" /> Add
      </Button>
    </form>
  )
}