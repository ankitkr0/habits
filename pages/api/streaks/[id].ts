import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'streaks.json')

interface Streak {
  id: string;
  name: string;
  count: number;
  lastChecked: string | null;
}

function getStreaks(): Streak[] {
  if (!fs.existsSync(dataFilePath)) {
    return []
  }
  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(fileContents)
}

function saveStreaks(streaks: Streak[]) {
  const dirPath = path.dirname(dataFilePath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(streaks, null, 2))
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  let streaks = getStreaks()

  if (req.method === 'PATCH') {
    const streak = streaks.find(s => s.id === id)
    if (streak) {
      const today = new Date().toDateString()
      if (streak.lastChecked !== today) {
        streak.count += 1
        streak.lastChecked = today
        saveStreaks(streaks)
        res.status(200).json(streak)
      } else {
        res.status(400).json({ message: 'Streak already updated today' })
      }
    } else {
      res.status(404).json({ message: 'Streak not found' })
    }
  } else if (req.method === 'DELETE') {
    streaks = streaks.filter(s => s.id !== id)
    saveStreaks(streaks)
    res.status(204).end()
  } else {
    res.setHeader('Allow', ['PATCH', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}