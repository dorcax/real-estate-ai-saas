import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    create(dto: CreatePlanDto): Promise<{
        message: string;
        data: {
            name: string;
            code: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
        };
    }>;
    findAll(): Promise<{
        message: string;
        data: {
            name: string;
            code: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: {
            name: string;
            code: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
        };
    }>;
    update(id: string, dto: UpdatePlanDto): Promise<{
        message: string;
        data: {
            name: string;
            code: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
        data: {
            name: string;
            code: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string | null;
            currency: string;
            monthlyPrice: import("@prisma/client/runtime/client").Decimal;
            yearlyPrice: import("@prisma/client/runtime/client").Decimal;
            maxProperties: number;
            features: import("@prisma/client/runtime/client").JsonValue | null;
        };
    }>;
}
