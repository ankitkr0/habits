import { Button } from "./ui/button"

const suggestions = [
  "Daily Exercise",
  "Read for 30 minutes",
  "Meditate",
  "Learn a new word",
  "Practice a skill",
  "Drink 8 glasses of water",
  "Write in a journal",
]

interface StreakSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export function StreakSuggestions({ onSelect }: StreakSuggestionsProps) {
  return (
    <div className="mt-6 mb-8">
      <h3 className="text-lg font-semibold mb-2">Suggestions:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}