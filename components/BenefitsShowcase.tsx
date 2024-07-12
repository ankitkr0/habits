import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Target, Brain, Zap, TrendingUp } from "lucide-react"

export function BenefitsShowcase() {
  const benefits = [
    { icon: <Target className="h-6 w-6" />, title: "Goal Setting", description: "Set and track meaningful personal goals" },
    { icon: <Brain className="h-6 w-6" />, title: "Habit Formation", description: "Build lasting habits through consistent tracking" },
    { icon: <Zap className="h-6 w-6" />, title: "Motivation Boost", description: "Stay motivated with visual progress indicators" },
    { icon: <TrendingUp className="h-6 w-6" />, title: "Personal Growth", description: "Monitor your progress and celebrate achievements" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {benefits.map((benefit, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center space-x-2">
            {benefit.icon}
            <CardTitle>{benefit.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{benefit.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}