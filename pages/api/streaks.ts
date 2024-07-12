import type { NextApiRequest, NextApiResponse } from 'next'

type Streak = {
  id: string;
  name: string;
  count: number;
  lastChecked: string | null;
  color: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Streak[] | { message: string }>
) {
  if (req.method === 'GET') {
    // In a real application, you'd fetch this data from a database
    // For now, we'll just return an empty array
    res.status(200).json([])
  } else if (req.method === 'POST') {
    // Here you would typically add a new streak to the database
    // For now, we'll just return a success message
    res.status(200).json({ message: 'Streak added successfully' })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}