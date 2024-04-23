import { getToken } from "./UserHandler";

export interface DailyPerformance {
    id: number;
    date: string;
    wordsGuessedCount: number;
    minutesSpentLearning: number;
    newWords: number;
    userId: number;
}

export async function getDailyPerformance() {
    const token = getToken();
    const response = await fetch('https://localhost:5000/dailyperformance/today', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch daily performance data");
    }

    const data = await response.json();
    const dailyPerformance: DailyPerformance = data.todaysPerformance;
    return dailyPerformance;
}