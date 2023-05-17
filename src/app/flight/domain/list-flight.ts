import { Injectable } from '@nestjs/common';
import { FlightRepository } from '../flight.repository';

@Injectable()
export class ListFlight {
  constructor(
    private repository: FlightRepository,
  ) {
  }

  public async handle() {
    return this.repository.list();
  }
}
