/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const interpreter = require('../../lib/advlibinteroperable.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_UNICODE_EDDYSTONE = {
    deviceIds: [ "496f49445554462d3332/00000001f989" ]
};
const INPUT_DATA_UNICODE_BOTH = {
    deviceIds: [ "496f4944434f4445b73e5554462d3332/0001/f44b",
                 "496f49445554462d3332/00000001f30e" ]
};


// Expected outputs for the scenario
const EXPECTED_DATA_UNICODE_EDDYSTONE = {
    deviceIds: [ "496f49445554462d3332/00000001f989" ],
    unicodeCodePoints: [ 129417 ]
};
const EXPECTED_DATA_UNICODE_BOTH = {
    deviceIds: [ "496f4944434f4445b73e5554462d3332/0001/f44b",
                 "496f49445554462d3332/00000001f30e" ],
    unicodeCodePoints: [ 128075, 127758 ]
};


// Describe the scenario
describe('advlib-interoperable', function() {

  // Test the interpret function with Unicode as Eddystone
  it('should handle a Unicode code point as Eddystone', function() {
    let unicodeEddystone = Object.assign({}, INPUT_DATA_UNICODE_EDDYSTONE);
    interpreter.interpret(unicodeEddystone);
    assert.deepEqual(unicodeEddystone, EXPECTED_DATA_UNICODE_EDDYSTONE);
  });

  // Test the interpret function with Unicode as both Eddystone and iBeacon
  it('should handle Unicode code points as Eddystone and iBeacon', function() {
    let unicodeBoth = Object.assign({}, INPUT_DATA_UNICODE_BOTH);
    interpreter.interpret(unicodeBoth);
    assert.deepEqual(unicodeBoth, EXPECTED_DATA_UNICODE_BOTH);
  });

});