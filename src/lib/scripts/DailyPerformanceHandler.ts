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
    const token = await getToken();
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

export async function getGoals() {
    const token = await getToken();
    const response = await fetch('https://localhost:5000/dailyperformance/streak', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch goals data");
    }

    const data = await response.json();
    const goals: number[] = data.values;
    return goals;
}

export async function changeDailyGoal(newGoal: number) {
    const token = await getToken();
    const response = await fetch(`https://localhost:5000/dailyperformance/changeDailyGoal?newGoal=${newGoal}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error("Failed to change daily goal");
    }

    location.reload();
    return response;
}