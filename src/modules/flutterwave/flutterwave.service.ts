import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFlutterwaveDto } from './dto/create-flutterwave.dto';
import { UpdateFlutterwaveDto } from './dto/update-flutterwave.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FlutterwaveService {
  constructor(private readonly httpService: HttpService) {}
  async initiatePayment(dto: CreateFlutterwaveDto) {
    const { tx_ref, amount, currency, email, name, redirect_url } = dto;
    try {
      const response = await firstValueFrom(
        await this.httpService.post(
          'https://api.flutterwave.com/v3/payments',
          {
            tx_ref,
            amount,
            currency,
            customer: {
              email,
              name,
            },
            redirect_url,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data;
    } catch (error: any) {
      console.error(error.code);
      console.error(error.response.data);
      throw new InternalServerErrorException(
        'Unable to initiate Flutterwave payment',
      );
    }
  }

  findAll() {
    return `This action returns all flutterwave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flutterwave`;
  }

  update(id: number, updateFlutterwaveDto: UpdateFlutterwaveDto) {
    return `This action updates a #${id} flutterwave`;
  }

  remove(id: number) {
    return `This action removes a #${id} flutterwave`;
  }
}
