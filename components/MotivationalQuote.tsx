import { useState, useEffect } from 'react'
import { Card, CardContent } from "./ui/card"

const quotes = [
  "The secret of getting ahead is getting started. - Mark Twain",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future depends on what you do today. - Mahatma Gandhi"
]

export function MotivationalQuote() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <Card className="my-4">
      <CardContent className="py-4">
        <p className="text-center italic">{quote}</p>
      </CardContent>
    </Card>
  )
}