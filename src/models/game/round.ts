import { Vote } from "./vote";

export interface Round {
    votes: Vote[];
    team: string;
    clue: string;
    remainingGuesses: number;
    isClueSubmitted: boolean;
}