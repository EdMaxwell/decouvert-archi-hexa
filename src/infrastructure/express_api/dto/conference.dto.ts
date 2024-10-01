import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateConferenceInput {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsNumber()
    @IsNotEmpty()
    seats: number;
    
}