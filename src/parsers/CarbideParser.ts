import {AbstractParser} from "./AbstractParser";
import {Toolpath} from "../interfaces/iToolpath";
import * as fs from 'fs';
import {Bit} from "../interfaces/iBit";

export class CarbideParser extends AbstractParser {
    open(path: string): Promise<Buffer> {
        if (!path || path === '') {
            throw new Error('Empty path or no path passed to parser.');
        }
        const data: Buffer = fs.readFileSync(path);
        return Promise.resolve(data);
    }

    parse(data: Buffer): Promise<Toolpath[]> {
        const toolpaths: Toolpath[] = [];

        const carbideFile = JSON.parse(data.toString());
        const { TOOLPATH_OBJECTS } = carbideFile || [];
        for (let toolpath of TOOLPATH_OBJECTS) {
                toolpaths.push({
                    label: toolpath.name,
                    stepDown: toolpath.stepdown,
                    stepOver: toolpath.stepover,
                    bit: this.parseBit(toolpath),
                    feedrate: toolpath.speeds.feedrate,
                    plungerate: toolpath.speeds.plungerate
                });
        }
        return Promise.resolve(toolpaths);
    }

    private parseBit(toolpath: any): Bit {
        const { tool } = toolpath;
        return {
            diameter: tool.diameter,
            length: tool.length,
            angle: tool.angle
        };
    }
}
