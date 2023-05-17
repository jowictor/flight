// General import
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { AllExceptionsFilter } from '../shared/all-exception.filter';

// Module import
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseModule } from '../database/database.module';
import { FlightController } from './flight/flight.controller';
import { FlightModule } from './flight/flight.module';

@Module({
	imports: [
		FlightModule,
		DatabaseModule.forRoot(),
		ConfigModule,
    LoggerModule,
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
		ScheduleModule.forRoot(),
	],
	controllers: [FlightController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
