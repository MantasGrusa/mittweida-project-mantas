import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class GetLocationDto {
    @ApiProperty({ example: 'sports', enum: ['sports', 'nightlife', 'culture'] })
    @IsString()
    @IsIn(['sports', 'nightlife', 'culture'])
    category: string;
}

export class ScanQRDto {
    @ApiProperty({ example: 'SPORTS_001' })
    @IsString()
    qrCode: string;
}