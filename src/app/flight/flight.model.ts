import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Flight', minimize: false })
export class Flight {
  @Prop({ type: String })
  departure_location: String;

  @Prop({ type: String })
  arrival_location: String;

  @Prop({ type: String })
  operant_company: String;

  @Prop({ type: Number })
  qnt_escale: Number;

  @Prop({ type: String })
  flight_number: String;

  @Prop({ type: Date })
  departure_time: Date;

  @Prop({ type: Date })
  arrival_time: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;
}

export type FlightDocument = Flight & Document;
export const FlightSchema = SchemaFactory.createForClass(Flight);

FlightSchema.index({ departure_location: 1, arrival_location: 1 });
FlightSchema.index({ operant_company: 1 });
