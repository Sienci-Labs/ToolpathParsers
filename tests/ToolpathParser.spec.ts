import chai, { expect, assert } from 'chai';
import { ToolpathParser } from "../src/ToolpathParser";
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);


describe('ToolpathParser Class', async () => {
    const parser = new ToolpathParser();
    const carbideFixture = __dirname + '/fixtures/two-drawer-box.c2d';
    const invalidExtensionFixture = '/fixtures/nope.gcc';
    const nonExistentFixture = '/fixtures/missing.c2d';
    const carbideResult = await parser.parseFile(carbideFixture);

    it('Should return an array of 3 toolpaths for the carbide fixture', async () => {
        expect(carbideResult).to.be.a('array').of.length(3);
    });

    it('Should throw an error if invalid file extension passed', async () => {
        await expect(parser.parseFile(invalidExtensionFixture)).to.be.rejectedWith(Error);
    })
});
