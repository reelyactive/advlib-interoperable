/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const SIGNATURE_SEPARATOR = '/';
const UNICODE_CODE_POINT_UUID = '496f4944434f4445b73e5554462d3332';
const UNICODE_CODE_POINT_ELIDED_UUID = '496f49445554462d3332';


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
      if(deviceIdElements[0] === UNICODE_CODE_POINT_UUID) {
        let codePoint = parseInt(deviceIdElements[1] + deviceIdElements[2], 16);
        if(!Array.isArray(interpretedPacket.unicodeCodePoints)) {
          interpretedPacket.unicodeCodePoints = [];
        }
        interpretedPacket.unicodeCodePoints.push(codePoint);
      }
      else if(deviceIdElements[0] === UNICODE_CODE_POINT_ELIDED_UUID) {
        let codePoint = parseInt(deviceIdElements[1].substring(4), 16);
        if(!Array.isArray(interpretedPacket.unicodeCodePoints)) {
          interpretedPacket.unicodeCodePoints = [];
        }
        interpretedPacket.unicodeCodePoints.push(codePoint);
      }
    }
  }
}


module.exports.interpret = interpret;