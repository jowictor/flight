import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Flight, FlightDocument } from './flight.model';

@Injectable()
export class FlightRepository {
  constructor(@InjectModel(Flight.name) private flightModel: Model<FlightDocument>) { }

  public async create(data: object) {
    return this.flightModel.insertMany(data);
  }

  public async list() {
    return this.flightModel.find();
  }

  public async searchByFlightNumber(flightNumber: string) {
    return this.flightModel.find({ flight_number: flightNumber });
  }
}
