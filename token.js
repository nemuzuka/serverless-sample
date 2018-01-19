'use strict';

const jwt = require('jsonwebtoken')
const jwtjson = require('./conf/jwks.json');

module.exports.verify = (accessToken) => {
  const decoded = jwt.decode(accessToken, { complete: true });
  if (!decoded){
    return false;
  }
  var kid = decoded.header.kid;
  var n, e;
  for (var i = 0; i < jwtjson.keys.length; i++) {
    var row = jwtjson.keys[i];
    if (kid == row['kid']) {
      n = row['n'];
      e = row['e'];
      break;
    }
  }
  try {
    const pem = rsaPublicKeyPem(n, e);
    jwt.verify(accessToken, pem, { algorithms: ['RS256'] });
    return true;
  } catch (err) {
    console.log("verify error:" + err);
    return false;
  }
};

// Create PEM from RSA public key
// http://stackoverflow.com/questions/18835132/xml-to-pem-in-node-js
function rsaPublicKeyPem(modulus_b64, exponent_b64) {

  function prepadSigned(hexStr) {
    var msb = hexStr[0]
    if (
      (msb >= '8' && msb <= '9') ||
      (msb >= 'a' && msb <= 'f') ||
      (msb >= 'A' && msb <= 'F')) {
      return '00' + hexStr;
    } else {
      return hexStr;
    }
  }

  function toHex(number) {
    var nstr = number.toString(16)
    if (nstr.length % 2 == 0) return nstr
    return '0' + nstr
  }

  // encode ASN.1 DER length field
  // if <=127, short form
  // if >=128, long form
  function encodeLengthHex(n) {
    if (n <= 127) return toHex(n)
    else {
      const n_hex = toHex(n)
      const length_of_length_byte = 128 + n_hex.length / 2 // 0x80+numbytes
      return toHex(length_of_length_byte) + n_hex
    }
  }

  var modulus = new Buffer(modulus_b64, 'base64');
  var exponent = new Buffer(exponent_b64, 'base64');

  var modulus_hex = modulus.toString('hex')
  var exponent_hex = exponent.toString('hex')

  modulus_hex = prepadSigned(modulus_hex)
  exponent_hex = prepadSigned(exponent_hex)

  var modlen = modulus_hex.length / 2
  var explen = exponent_hex.length / 2

  var encoded_modlen = encodeLengthHex(modlen)
  var encoded_explen = encodeLengthHex(explen)
  var encoded_pubkey = '30' +
    encodeLengthHex(
      modlen +
      explen +
      encoded_modlen.length / 2 +
      encoded_explen.length / 2 + 2
    ) +
    '02' + encoded_modlen + modulus_hex +
    '02' + encoded_explen + exponent_hex;

  var seq2 =
    '30 0d ' +
    '06 09 2a 86 48 86 f7 0d 01 01 01' +
    '05 00 ' +
    '03' + encodeLengthHex(encoded_pubkey.length / 2 + 1) +
    '00' + encoded_pubkey;

  seq2 = seq2.replace(/ /g, '');

  var der_hex = '30' + encodeLengthHex(seq2.length / 2) + seq2;

  der_hex = der_hex.replace(/ /g, '');

  var der = new Buffer(der_hex, 'hex');
  var der_b64 = der.toString('base64');

  var pem = '-----BEGIN PUBLIC KEY-----\n'
    + der_b64.match(/.{1,64}/g).join('\n')
    + '\n-----END PUBLIC KEY-----\n';

  return pem
}
