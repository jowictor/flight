import { IsNotEmpty } from 'class-validator';

export class CreateFlightDto {
    @IsNotEmpty({ message: 'Missing departure_location' })
    departure_location: string;

    @IsNotEmpty({ message: 'Missing arrival_location' })
    arrival_location: string;

    @IsNotEmpty({ message: 'Missing operant_company' })
    operant_company: string;

    @IsNotEmpty({ message: 'Missing qnt_escale' })
    qnt_escale: Number;

    flight_number: string;

    @IsNotEmpty({ message: 'Missing departure_time' })
    departure_time: Date;

    @IsNotEmpty({ message: 'Missing arrival_time' })
    arrival_time: Date;
}
