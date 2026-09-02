import { FlutterwaveService } from './flutterwave.service';
import { UpdateFlutterwaveDto } from './dto/update-flutterwave.dto';
export declare class FlutterwaveController {
    private readonly flutterwaveService;
    constructor(flutterwaveService: FlutterwaveService);
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFlutterwaveDto: UpdateFlutterwaveDto): string;
    remove(id: string): string;
}
