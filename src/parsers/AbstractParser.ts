import { Toolpath } from "../interfaces/iToolpath";

/**
 * Abstraction on a parser
 * Implements Open strategy for specific file type and Parse strategy for specific file type
 */
export abstract class AbstractParser {
    /**
     * Opens a file and parses the toolpaths contained within
     * @param path string path to where the file is located
     */
    public async openAndParse(path: string): Promise<Toolpath[]> {
        if (!path || path === '') {
            throw new Error('Empty path or no path passed to parser.');
        }
        const blob = await this.open(path);
        const paths = await this.parse(blob);
        return paths;
    }

    abstract open(path: string): Promise<Buffer>;

    abstract parse(data: Buffer): Promise<Toolpath[]> ;
}
