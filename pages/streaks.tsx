import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Flame, Check, X, Dumbbell, Book, Droplet, Apple, Moon, Brain, Plus } from "lucide-react"
import { StreakForm } from '@/components/StreakForm'
import { StreakCelebration } from '@/components/StreakCelebration'
import { motion, AnimatePresence } from 'framer-motion'

interface Streak {
  id: string;
  name: string;
  count: number;
  lastChecked: string | null;
  color: string;
  iconName: string;
}

type IconName = 'Flame' | 'Dumbbell' | 'Book' | 'Droplet' | 'Apple' | 'Moon' | 'Brain';

const streakSuggestions: Array<Omit<Streak, 'id' | 'count' | 'lastChecked'>> = [
  { name: "Exercise", color: "#FF5733", iconName: "Dumbbell" },
  { name: "Read", color: "#33FF57", iconName: "Book" },
  { name: "Drink Water", color: "#3357FF", iconName: "Droplet" },
  { name: "Eat Healthy", color: "#FF33F1", iconName: "Apple" },
  { name: "Sleep Well", color: "#33FFF1", iconName: "Moon" },
  { name: "Learn Something New", color: "#F1FF33", iconName: "Brain" },
]

const generateColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const getIconComponent = (iconName: IconName) => {
  switch (iconName) {
    case 'Flame': return Flame;
    case 'Dumbbell': return Dumbbell;
    case 'Book': return Book;
    case 'Droplet': return Droplet;
    case 'Apple': return Apple;
    case 'Moon': return Moon;
    case 'Brain': return Brain;
    default: return Flame;
  }
}

export default function StreaksPage() {
  const [streaks, setStreaks] = useState<Streak[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStreaks = () => {
      if (typeof window !== 'undefined') {
        try {
          const savedStreaks = localStorage.getItem('streaks')
          if (savedStreaks) {
            const parsedStreaks = JSON.parse(savedStreaks)
            setStreaks(Array.isArray(parsedStreaks) ? parsedStreaks : [])
          }
        } catch (error) {
          console.error('Error loading streaks:', error)
          setStreaks([])
        }
        setIsLoading(false)
      }
    }
    loadStreaks()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      try {
        localStorage.setItem('streaks', JSON.stringify(streaks))
      } catch (error) {
        console.error('Error saving streaks:', error)
      }
    }
  }, [streaks, isLoading])

  const addStreak = (newStreak: Omit<Streak, 'id' | 'count' | 'lastChecked' | 'color' | 'iconName'>) => {
    const streakWithColor: Streak = {
      ...newStreak,
      id: Date.now().toString(),
      count: 0,
      lastChecked: null,
      color: generateColor(),
      iconName: 'Flame'
    }
    setStreaks(prevStreaks => [...prevStreaks, streakWithColor])
  }

  const addSuggestedStreak = (suggestion: typeof streakSuggestions[0]) => {
    const newStreak: Streak = {
      ...suggestion,
      id: Date.now().toString(),
      count: 0,
      lastChecked: null,
    }
    setStreaks(prevStreaks => [...prevStreaks, newStreak])
  }

  const removeStreak = (id: string) => {
    setStreaks(prevStreaks => prevStreaks.filter(streak => streak.id !== id))
  }

  const incrementStreak = (id: string) => {
    const today = new Date().toDateString()
    setStreaks(prevStreaks => 
      prevStreaks.map(streak => 
        streak.id === id && streak.lastChecked !== today
          ? { ...streak, count: streak.count + 1, lastChecked: today }
          : streak
      )
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">My Streaks</h1>

      <StreakForm onSubmit={addStreak} />

      {streaks.length === 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Suggested Streaks</h2>
          <div className="grid grid-cols-2 gap-4">
            {streakSuggestions.map((suggestion, index) => {
              const IconComponent = getIconComponent(suggestion.iconName as IconName)
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="flex items-center justify-start p-4 h-auto"
                  onClick={() => addSuggestedStreak(suggestion)}
                >
                  <IconComponent className="mr-2" style={{ color: suggestion.color }} />
                  <span>{suggestion.name}</span>
                  <Plus className="ml-auto" size={16} />
                </Button>
              )
            })}
          </div>
        </div>
      )}

      <AnimatePresence>
        {streaks.map((streak) => {
          const IconComponent = getIconComponent(streak.iconName as IconName)
          return (
            <motion.div
              key={streak.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-4">
                <CardContent className="flex flex-col items-start p-4">
                  <span className="flex items-center mb-2">
                    <IconComponent className="mr-2" style={{ color: streak.color }} />
                    {streak.name} - {streak.count} days
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ width: `${Math.min(streak.count * 10, 100)}%`, backgroundColor: streak.color }}
                    ></div>
                  </div>
                  <div className="flex justify-end w-full">
                    <Button size="icon" variant="outline" onClick={() => incrementStreak(streak.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => removeStreak(streak.id)} className="ml-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>

      <StreakCelebration streaks={streaks} />
    </main>
  )
}