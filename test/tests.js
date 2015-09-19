/**
 * @author Bilal Cinarli
 */

var expect = chai.expect;

describe('Testing UX Rocket Accordion', function() {
    describe('Properties', function() {
        it('should have version property', function() {
            expect($.uxrcollapsible).to.have.property('version');
        });
    });
});