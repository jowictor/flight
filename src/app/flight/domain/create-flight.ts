import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from '../dto/create-flight.dto';
import { FlightRepository } from '../flight.repository';

const shortid = require('shortid');

@Injectable()
export class CreateFlight {
  constructor(
    private repository: FlightRepository,
  ) {
  }

  public async handle(flight: CreateFlightDto) {
    flight.flight_number = this.generateFlightNumber(flight.operant_company);
    return this.repository.create(flight);
  }

  private generateFlightNumber(operantCompany: string): string {
    return `${operantCompany}-${shortid.generate()}`;
  }
}
