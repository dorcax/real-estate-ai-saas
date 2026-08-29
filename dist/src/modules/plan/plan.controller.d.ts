import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    create(dto: CreatePlanDto): Promise<{
        message: string;
        data: {
            id: string;
            code: string;
            name: string;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(): Promise<{
        message: string;
        data: {
            id: string;
            code: string;
            name: string;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: {
            id: string;
            code: string;
            name: string;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: string, dto: UpdatePlanDto): Promise<{
        message: string;
        data: {
            id: string;
            code: string;
            name: string;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: {
            id: string;
            code: string;
            name: string;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
