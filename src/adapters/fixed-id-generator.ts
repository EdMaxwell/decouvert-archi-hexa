import {IIdGeneratorInterface} from "../ports/id-generator.interface";

export class FixedIdGenerator implements IIdGeneratorInterface {

    generate(): string {
        return `id-1`;
    }
}