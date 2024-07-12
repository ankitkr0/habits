import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

// If you haven't defined this interface yet, you should create it in a separate file
// and import it here
interface Streak {
  id: string;
  name: string;
  count: number;
  lastChecked: string | null;
  color: string;
}

interface StreakCelebrationProps {
  streaks: Streak[];
}

export function StreakCelebration({ streaks }: StreakCelebrationProps) {
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const milestones = [7, 30, 100, 365] // Days
    const reachedMilestone = streaks.some(streak => 
      milestones.includes(streak.count) && streak.count > 0
    )

    if (reachedMilestone) {
      setShowCelebration(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setTimeout(() => setShowCelebration(false), 5000)
    }
  }, [streaks])

  if (!showCelebration) return null

  return (
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p>You&apos;ve reached a streak milestone!</p>
        </div>
      </div>
    )
  }