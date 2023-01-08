import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [SendgridService],
exports: [SendgridService]})
export class SendgridModule {}
