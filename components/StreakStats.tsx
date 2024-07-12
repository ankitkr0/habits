import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface Streak {
  id: string;
  name: string;
  count: number;
  lastChecked: string | null;
  color: string;
}

interface StreakStatsProps {
  streaks: Streak[]
}

export function StreakStats({ streaks }: StreakStatsProps) {
  const totalStreaks = streaks.length
  const activeStreaks = streaks.filter(streak => streak.count > 0).length
  const longestStreak = Math.max(...streaks.map(streak => streak.count), 0)

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Streak Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{totalStreaks}</p>
            <p className="text-sm text-muted-foreground">Total Streaks</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{activeStreaks}</p>
            <p className="text-sm text-muted-foreground">Active Streaks</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{longestStreak}</p>
            <p className="text-sm text-muted-foreground">Longest Streak</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}