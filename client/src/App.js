import React, { useState } from "react";
import "./App.css";

import SimpleCrypto from "simple-crypto-js";

const BACKEND_URL = "http://localhost:3001/";

const getSecret = () => {
  const _0xd738 = ["\x69\x6a\x6e\x6b", "\x62\x61\x6e\x61", "\x72\x6f\x6d"];
  (function (_0x465361, _0xd7388e) {
    const _0x5f5ea = function (_0x22ed9c) {
      while (--_0x22ed9c) {
        _0x465361["push"](_0x465361["shift"]());
      }
    };
    _0x5f5ea(++_0xd7388e);
  })(_0xd738, 0x18b);
  const _0x5f5e = function (_0x465361, _0xd7388e) {
    _0x465361 = _0x465361 - 0x0;
    let _0x5f5ea = _0xd738[_0x465361];
    return _0x5f5ea;
  };
  return (
    _0x5f5e("\x30\x78\x32") +
    "\x6e\x65\x6e\x7a" +
    _0x5f5e("\x30\x78\x31") +
    _0x5f5e("\x30\x78\x30")
  );
};

const createKey = (score) => {
  // secret: bananenzijnkrom
  const secret = getSecret();
  const crypto = new SimpleCrypto(secret);
  // send timestamp::score to server
  const str = `${new Date().getTime()}::${score}`;

  return crypto.encrypt(str);
};

function App() {
  const [response, setResponse] = useState({});
  const [key, setKey] = useState("");
  const [score, setScore] = useState("");

  const submit = async () => {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score, key }),
    });

    const json = await res.json();

    setResponse(json);
  };

  return (
    <div className="App">
      <div>
        <label>Score:</label>
        <input
          type="text"
          onChange={(e) => {
            setScore(e.currentTarget.value);
            setKey(createKey(e.currentTarget.value));
          }}
          value={score}
        />
      </div>
      <div>
        <label>Key:</label>
        <input
          type="text"
          onChange={(e) => {
            setKey(e.currentTarget.value);
          }}
          value={key}
        />
      </div>

      <input type="submit" value="Submit" onClick={(e) => submit()} />

      <p>Response: {JSON.stringify(response)}</p>
    </div>
  );
}

export default App;
