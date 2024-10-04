import {IsDateString, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateConferenceInput {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @IsNumber()
    @IsNotEmpty()
    seats: number;

}

export class UpdateConferenceSeats {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @IsNumber()
    @IsNotEmpty()
    seats: number;
}

export class UpdateConferenceDate {

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

}

