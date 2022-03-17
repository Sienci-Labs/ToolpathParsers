import {Toolpath} from "./interfaces/iToolpath";
import {AbstractParser} from "./parsers/AbstractParser";
import {CarbideParser} from "./parsers/CarbideParser";

export class ToolpathParser {
    public async parseFile(path: string): Promise<Toolpath[]> {
        const parser = this.matchParserToExtension(path);
        if (!parser) {
            throw new Error('No parser associated with this file extension');
        }
        return await parser.openAndParse(path);
    }

    /**
     * Determines which parser strategy to use for this file if any
     * @param path string location of the file to be parsed
     * @private
     */
    private matchParserToExtension(path: string): AbstractParser {
        const extension = this.getFileExtension(path);
        if (extension === 'c2d') {
            return new CarbideParser();
        }
        throw new Error('Extension not recognized');
    };

    /**
     * Returns file extension of the specified file path if it exists
     * @param path string location of the file to be parsed
     * @private
     */
    private getFileExtension(path: string): string {
        return path.split('.').pop() || '';
    }
}
