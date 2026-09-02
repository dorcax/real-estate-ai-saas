import { CreateFlutterwaveDto } from './dto/create-flutterwave.dto';
import { UpdateFlutterwaveDto } from './dto/update-flutterwave.dto';
import { HttpService } from '@nestjs/axios';
export declare class FlutterwaveService {
    private readonly httpService;
    constructor(httpService: HttpService);
    initiatePayment(dto: CreateFlutterwaveDto): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFlutterwaveDto: UpdateFlutterwaveDto): string;
    remove(id: number): string;
}
