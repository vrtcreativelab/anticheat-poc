const SimpleCrypto = require("simple-crypto-js").default;

const checkKey = async (score, key) => {
  const secret = "bananenzijnkrom";
  const crypto = new SimpleCrypto(secret);
  try {
    const decrypted = crypto.decrypt(key);
    if (decrypted.length) {
      const [timestamp, keyScore] = decrypted.split("::");
      const timediff = Math.abs(timestamp - new Date().getTime());

      if (timediff > 60000) {
        return { status: "TIMESTAMP_FAIL " };
      } else {
        if (keyScore === score) {
          return { status: "OK", timediff, score, keyScore };
        } else {
          return { status: "SCORE_FAIL", timediff, score, keyScore };
        }
      }
    } else {
      return { status: "DECRYPT_FAIL" };
    }
  } catch (e) {}
};

module.exports = checkKey;
