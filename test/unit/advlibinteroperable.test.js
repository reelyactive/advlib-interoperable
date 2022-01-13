/**
 * Copyright reelyActive 2021-2022
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
const INPUT_DATA_BUTTON_EDDYSTONE = {
    deviceIds: [ "496f4944427574746f6e/000000000000" ]
};
const INPUT_DATA_BUTTON_IBEACON = {
    deviceIds: [ "496f4944434f4445b73e427574746f6e/0000/0000" ]
};
const INPUT_DATA_BLUEUP_SAFETY = {
    deviceIds: [ "496f4944434f4445b73e425553616665/1234/8001" ]
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
const EXPECTED_DATA_BUTTON_EDDYSTONE = {
    deviceIds: [ "496f4944427574746f6e/000000000000" ],
    isButtonPressed: [ true ]
};
const EXPECTED_DATA_BUTTON_IBEACON = {
    deviceIds: [ "496f4944434f4445b73e427574746f6e/0000/0000" ],
    isButtonPressed: [ true ]
};
const EXPECTED_DATA_BLUEUP_SAFETY = {
    deviceIds: [ "496f4944434f4445b73e425553616665/1234/8001" ],
    batteryVoltage: 2.98,
    isButtonPressed: [ true, false ]
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

  // Test the interpret function with button as Eddystone
  it('should handle a button press as Eddystone', function() {
    let buttonEddystone = Object.assign({}, INPUT_DATA_BUTTON_EDDYSTONE);
    interpreter.interpret(buttonEddystone);
    assert.deepEqual(buttonEddystone, EXPECTED_DATA_BUTTON_EDDYSTONE);
  });

  // Test the interpret function with button as iBeacon
  it('should handle a button press as iBeacon', function() {
    let buttonIBeacon = Object.assign({}, INPUT_DATA_BUTTON_IBEACON);
    interpreter.interpret(buttonIBeacon);
    assert.deepEqual(buttonIBeacon, EXPECTED_DATA_BUTTON_IBEACON);
  });

  // Test the interpret function with BlueUp Safety iBeacon data
  it('should handle a BlueUp Safety iBeacon packet', function() {
    let safetyIBeacon = Object.assign({}, INPUT_DATA_BLUEUP_SAFETY);
    interpreter.interpret(safetyIBeacon);
    assert.deepEqual(safetyIBeacon, EXPECTED_DATA_BLUEUP_SAFETY);
  });

});