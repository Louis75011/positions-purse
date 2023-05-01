export interface Position {
    id: string;
    name: string;
    ticker: string;
    isin: string;
    quantity: number;
    price: number;
    previousPrice: number; // Ajoutez cette propriété
    valuation: number;
    previousValuation: number;
    averagePrice: number;
    previousAveragePrice: number;
    averageCost: number;
    previousAverageCost: number;
    weight: number;
}

export interface SrdPosition extends Position {
    borrowing: number;
    liquidation: boolean;
}

export interface Order {
    id: string;
    positionId: string;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
}