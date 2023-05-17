import {
  Controller,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';

import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';

@Controller('flight')
export class FlightController {
  constructor(
    private flightService: FlightService,
  ) {
  }

  @Post()
  public async createFlight(@Body() flight: CreateFlightDto) {
    return this.flightService.createFlight(flight);
  }

  @Get('list')
  public async listFlight() {
    return this.flightService.listFlight();
  }

  @Get('search')
  public async searchFlight(@Query('flightNumber') flightNumber: string) {
    return this.flightService.searchFlight(flightNumber);
  }
}
