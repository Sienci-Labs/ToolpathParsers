import {AbstractParser} from "../parsers/AbstractParser";

export interface ParserExtensions {
    parser: AbstractParser;
    extensions: string[]
}
