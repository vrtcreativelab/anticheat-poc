# Simple POC for anti-cheat protection

- Client sends score + an encrypted key (timestamp::score) to server
- Server checks decrypted timestamp and decrypted score against sent score

Note: this POC uses an insecure implementation of AES: https://www.npmjs.com/advisories/1220
