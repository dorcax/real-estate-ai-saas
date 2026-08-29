export declare class CreatePlanDto {
    code: string;
    name: string;
    description?: string;
    currency?: string;
    monthlyPrice: number;
    yearlyPrice: number;
    maxAgents: number;
    maxProperties: number;
    maxCalls: number;
    maxCallMinutes: number;
    maxAiAgents: number;
    features?: Record<string, any>;
    isActive?: boolean;
}
