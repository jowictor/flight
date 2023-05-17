import { Injectable } from '@nestjs/common';
import { FlightRepository } from '../flight.repository';

@Injectable()
export class SearchFlight {
  constructor(
    private repository: FlightRepository,
  ) {
  }

  public async handle(flightNumber: string) {
    return this.repository.searchByFlightNumber(flightNumber);
  }
}
