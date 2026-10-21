import { FlutterwaveService } from './flutterwave.service';
import { CreateFlutterwaveDto } from './dto/create-flutterwave.dto';
import { UpdateFlutterwaveDto } from './dto/update-flutterwave.dto';
export declare class FlutterwaveController {
    private readonly flutterwaveService;
    constructor(flutterwaveService: FlutterwaveService);
    initiatePayment(createFlutterwaveDto: CreateFlutterwaveDto): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFlutterwaveDto: UpdateFlutterwaveDto): string;
    remove(id: string): string;
}
