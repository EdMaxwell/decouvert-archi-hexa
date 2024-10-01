import {IDateGeneratorInterface} from "../ports/date-generator.interface";

export class CurrentDateGenerator implements IDateGeneratorInterface {
    generate() {
        return new Date();
    }
}