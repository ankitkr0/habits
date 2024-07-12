import React from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Lock, Zap, TrendingUp, Award, Smartphone } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/streaks')
  }

  const features = [
    { icon: CheckCircle, title: "Habit Formation", description: "Build lasting habits with our scientifically-backed streak system" },
    { icon: Lock, title: "No Login Required", description: "Start tracking immediately - no account needed" },
    { icon: Zap, title: "Quick Setup", description: "Choose from suggested habits or create your own in seconds" },
    { icon: TrendingUp, title: "Progress Visualization", description: "See your progress with intuitive charts and stats" },
    { icon: Award, title: "Milestone Celebrations", description: "Stay motivated with celebrations for streak milestones" },
    { icon: Smartphone, title: "Mobile Friendly", description: "Track your habits on any device, anytime, anywhere" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to Habits.lol</h1>
      <p className="text-xl text-center mb-8">Build better habits, one day at a time.</p>

      <div className="text-center mb-12">
        <Button size="lg" onClick={handleGetStarted}>Get Started - It&apos;s Free!</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center p-6">
              <feature.icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}