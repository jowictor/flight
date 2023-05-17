import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { Flight, FlightSchema } from './flight.model';
import { FlightRepository } from './flight.repository';
import { CreateFlight } from './domain/create-flight';
import { ListFlight } from './domain/list-flight';
import { SearchFlight } from './domain/search-flight';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  providers: [FlightService, FlightRepository, CreateFlight, ListFlight, SearchFlight],
  controllers: [FlightController],
  exports: [FlightService],
})
export class FlightModule { }
