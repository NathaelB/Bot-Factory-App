

export function getRandomInterval(min: number, max:number) {
    return Math.floor(Math.random() * (max - min) + min)
}