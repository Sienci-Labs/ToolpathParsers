import {CarbideParser} from "../src/parsers/CarbideParser";
import { expect, assert } from 'chai';

describe('OpenAndParse Method',  async () => {
    const parser = new CarbideParser();
    const fixture = __dirname + '/fixtures/two-drawer-box.c2d';
    const result = await parser.openAndParse(fixture);

    it('Should return an array', async () => {
        expect(result).to.be.a('array');
    });

    it('Should return 3 toolpaths', async () => {
        expect(result).length(3);
    });

    it('Should have a plungerates of (293.37, 762, 762)', () => {
        expect(result[0]).to.include({plungerate: 293.37});
        expect(result[1]).to.include({plungerate: 762});
        expect(result[2]).to.include({plungerate: 762});
    })

    it('Should contain all Toolpath type keys across all toolpaths', () =>{
        expect(result[0]).to.have.all.keys('label', 'bit', 'stepDown', 'stepOver', 'feedrate', 'plungerate');
        expect(result[1]).to.have.all.keys('label', 'bit', 'stepDown', 'stepOver', 'feedrate', 'plungerate');
        expect(result[2]).to.have.all.keys('label', 'bit', 'stepDown', 'stepOver', 'feedrate', 'plungerate');
    });

    it('Should not have any undefined values', () => {
        expect(Object.values(result[0])).to.not.include(undefined);
        expect(Object.values(result[1])).to.not.include(undefined);
        expect(Object.values(result[2])).to.not.include(undefined);
    })
});
