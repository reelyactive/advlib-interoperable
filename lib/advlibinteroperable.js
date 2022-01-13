/**
 * Copyright reelyActive 2021-2022
 * We believe in an open Internet of Things
 */


const SIGNATURE_SEPARATOR = '/';
const UNICODE_CODE_POINT_UUID = '496f4944434f4445b73e5554462d3332';
const UNICODE_CODE_POINT_ELIDED_UUID = '496f49445554462d3332';
const BUTTON_UUID = '496f4944434f4445b73e427574746f6e';
const BUTTON_ELIDED_UUID = '496f4944427574746f6e';


/**
 * Interpret the InteroperaBLE identifiers in an advlib-standard packet by
 * updating the original packet.
 * @param {Object} packet An advlib-standard processed packet to interpret.
 */
function interpret(packet) {
  interpretDeviceIds(packet.deviceIds, packet);
}


/**
 * Interpret the InteroperaBLE deviceIds in an advlib-standard packet,
 * appending properties to the given partially-interpreted packet.
 * @param {Array} deviceIds The deviceIds of the advlib-standard packet.
 * @param {Object} interpretedPacket The partially-interpreted packet.
 */
function interpretDeviceIds(deviceIds, interpretedPacket) {
  if(Array.isArray(deviceIds)) {
    for(const deviceId of deviceIds) {
      let deviceIdElements = deviceId.split(SIGNATURE_SEPARATOR);

      switch(deviceIdElements[0]) {
        case UNICODE_CODE_POINT_UUID:
          interpretUnicodeCodePoint(deviceIdElements, interpretedPacket, false);
          break;
        case UNICODE_CODE_POINT_ELIDED_UUID:
          interpretUnicodeCodePoint(deviceIdElements, interpretedPacket, true);
          break;
        case BUTTON_UUID:
        case BUTTON_ELIDED_UUID:
          interpretButton(deviceIdElements, interpretedPacket);
          break;
      }
    }
  }
}


/**
 * Interpret the unicode code point data.
 * @param {Array} deviceIdElements The elements of the device identifier.
 * @param {Object} interpretedPacket The partially-interpreted packet.
 * @param {Boolean} isElided Whether the UUID is elided or not.
 */
function interpretUnicodeCodePoint(deviceIdElements, interpretedPacket,
                                   isElided) {
  let codePoint = null;

  if(!isElided && (deviceIdElements.length === 3)) {
    codePoint = parseInt(deviceIdElements[1] + deviceIdElements[2], 16);
  }
  else if(isElided && (deviceIdElements.length === 2)) {
    codePoint = parseInt(deviceIdElements[1].substring(4), 16);
  }

  if(codePoint) {
    if(!Array.isArray(interpretedPacket.unicodeCodePoints)) {
      interpretedPacket.unicodeCodePoints = [];
    }
    interpretedPacket.unicodeCodePoints.push(codePoint);
  }
}



/**
 * Interpret the button data.
 * @param {Array} deviceIdElements The elements of the device identifier.
 * @param {Object} interpretedPacket The partially-interpreted packet.
 */
function interpretButton(deviceIdElements, interpretedPacket) {
  interpretedPacket.isButtonPressed = [ true ];
}


module.exports.interpret = interpret;