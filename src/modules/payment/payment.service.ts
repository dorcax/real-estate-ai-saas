import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { sign } from 'crypto';

@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }



  async handleWebhook(req:Request,res){
    const secretHash =process.env.FLW_SECRET_HASH
    const signature =req.headers["verif-hash"]
    if(!secretHash || secretHash !==signature){
      res.status(401).end
    }

    const payload=req.body

  }
  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
