import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Lightbulb } from "lucide-react"

const tips = [
  "Start with small, achievable streaks to build momentum.",
  "Use the color customization to make your streaks visually appealing and motivating.",
  "Check in daily to maintain your streak, even if you can only make a small effort.",
  "Use the suggestions feature to discover new habits you might want to form.",
  "Celebrate your milestones, no matter how small!"
]

export function UsageTips() {
  const [tip, setTip] = useState("")

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)])
  }, [])

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2" /> Tip of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{tip}</p>
      </CardContent>
    </Card>
  )
}