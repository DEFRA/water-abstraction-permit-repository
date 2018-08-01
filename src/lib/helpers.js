/**
 * Reduces the resolution of grid references in the supplied string
 * @param {String} str - contains National Grid references
 * @return {String} - with references in form AB 123 123
 */
function reduceGridReferenceResolution (str) {
  const r = /(HO|HP|HT|HU|HW|HX|HY|HZ|NA|NB|NC|ND|NE|NF|NG|NH|NJ|NK|NL|NM|NN|NO|NP|NR|NS|NT|NU|NW|NX|NY|NZ|OV|SC|SD|SE|TA|SH|SJ|SK|TF|TG|SM|SN|SO|SP|TL|TM|SR|SS|ST|SU|TQ|TR|SV|SW|SX|SY|SZ|TV) ?([0-9]{3,5}) ?([0-9]{3,5})/g;
  let match;
  let newStr = str;
  while ((match = r.exec(str)) !== null) {
    const newRef = `${match[1]} ${match[2].substr(0, 3)} ${match[3].substr(0, 3)}`;
    newStr = newStr.replace(match[0], newRef);
  }
  return newStr;
}

module.exports = {
  reduceGridReferenceResolution
};
