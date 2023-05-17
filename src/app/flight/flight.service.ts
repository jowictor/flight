import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateFlight } from './domain/create-flight';
import { ListFlight } from './domain/list-flight';
import { SearchFlight } from './domain/search-flight';
import { CreateFlightDto } from './dto/create-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    private createFlightService: CreateFlight,
    private listFlightSevice: ListFlight,
    private searchFlightService: SearchFlight,
  ) { }

  public async createFlight(flight: CreateFlightDto) {
    try {
      return this.createFlightService.handle(flight);
    } catch (ex) {
      throw new HttpException(JSON.stringify(ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async listFlight() {
    try {
      return this.listFlightSevice.handle();
    } catch (ex) {
      throw new HttpException(JSON.stringify(ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async searchFlight(flightNumber: string) {
    try {
      return this.searchFlightService.handle(flightNumber);
    } catch (ex) {
      throw new HttpException(JSON.stringify(ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
