/**
 * Copyright reelyActive 2021-2023
 * We believe in an open Internet of Things
 */


const SIGNATURE_SEPARATOR = '/';
const UNICODE_CODE_POINT_UUID = '496f4944434f4445b73e5554462d3332';
const UNICODE_CODE_POINT_ELIDED_UUID = '496f49445554462d3332';
const DIRACT_ELIDED_UUID = '496f4944446972416374';
const BUTTON_UUID = '496f4944434f4445b73e427574746f6e';
const BUTTON_ELIDED_UUID = '496f4944427574746f6e';
const FILE_MP3_UUID = '496f4944434f4445b73e2e2f2e6d7033';
const FILE_MP3_ELIDED_UUID = '496f49442e2f2e6d7033';
const BLUEUP_SAFETY_UUID = '496f4944434f4445b73e425553616665';
const DIRACT_URI = 'https://sniffypedia.org/Organization/Code_Blue_Communications_Inc/DirAct/';


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
        case DIRACT_ELIDED_UUID:
          interpretDirAct(deviceIdElements, interpretedPacket);
          break;
        case BUTTON_UUID:
        case BUTTON_ELIDED_UUID:
          interpretButton(deviceIdElements, interpretedPacket);
          break;
        case FILE_MP3_UUID:
          interpretFile('.mp3', deviceIdElements, interpretedPacket, false);
          break;
        case FILE_MP3_ELIDED_UUID:
          interpretFile('.mp3', deviceIdElements, interpretedPacket, true);
          break;
        case BLUEUP_SAFETY_UUID:
          interpretBlueUpSafety(deviceIdElements, interpretedPacket);
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
 * Interpret the DirAct data.
 * @param {Array} deviceIdElements The elements of the device identifier.
 * @param {Object} interpretedPacket The partially-interpreted packet.
 */
function interpretDirAct(deviceIdElements, interpretedPacket) {
  interpretedPacket.uri = DIRACT_URI;
}


/**
 * Interpret the button data.
 * @param {Array} deviceIdElements The elements of the device identifier.
 * @param {Object} interpretedPacket The partially-interpreted packet.
 */
function interpretButton(deviceIdElements, interpretedPacket) {
  interpretedPacket.isButtonPressed = [ true ];
}


/**
 * Interpret the file data.
 * @param {String} extension The file extension.
 * @param {Array} deviceIdElements The elements of the device identifier.
 * @param {Object} interpretedPacket The partially-interpreted packet.
 * @param {Boolean} isElided Whether the UUID is elided or not.
 */
function interpretFile(extension, deviceIdElements, interpretedPacket,
                       isElided) {
  let uri = 'file:/';

  if(!isElided && (deviceIdElements.length === 3)) {
    uri += deviceIdElements[1].substring(1) + deviceIdElements[2] + extension;
  }
  else if(isElided && (deviceIdElements.length === 2)) {
    uri += deviceIdElements[1].substring(5) + extension;
  }
  else {
    return;
  }

  interpretedPacket.uri = uri;
}


/**
 * Interpret the BlueUp Safety data (embedded in iBeacon major/minor).
 * @param {Array} deviceIdElements The elements of the device identifier.
 * @param {Object} interpretedPacket The partially-interpreted packet.
 */
function interpretBlueUpSafety(deviceIdElements, interpretedPacket) {
  if(deviceIdElements.length === 3) {
    let batteryVoltage = (parseInt(deviceIdElements[2].substring(0,2), 16) /
                          100) + 1.7;
    let triggerFlags = deviceIdElements[2].substring(2,4);
    let isButtonPressed = [ Boolean(triggerFlags & 0x01),
                            Boolean(triggerFlags & 0x02) ];
    // TODO: include motion detection and man down flags?

    interpretedPacket.batteryVoltage = batteryVoltage;
    interpretedPacket.isButtonPressed = isButtonPressed;
  }
}


module.exports.interpret = interpret;
