import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Aes256Encryption = () => {
  const [inputText, setInputText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const encrypt = () => {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
    const encrypted = CryptoJS.AES.encrypt(inputText, CryptoJS.enc.Utf8.parse(encryptionKey), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    setEncryptedText(iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64)); // Concatenate IV and ciphertext
  };

  const decrypt = () => {
    const data = CryptoJS.enc.Base64.parse(encryptedText);
    const iv = CryptoJS.lib.WordArray.create(data.words.slice(0, 4), 16); // Extract the IV from the encrypted text
    const ciphertext = CryptoJS.lib.WordArray.create(data.words.slice(4), data.sigBytes - 16);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext }, CryptoJS.enc.Utf8.parse(encryptionKey), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    setDecryptedText(decrypted.toString(CryptoJS.enc.Utf8));
  };

  // Handle input changes and enforce 32-character limit
  const handleKeyChange = (e) => {
    const value = e.target.value;
    if (value.length <= 32) {
      setEncryptionKey(value);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f4f4f9', height: '100vh' }}>
      <h2>Nur Faizal Basri - 23.51.1450</h2>
      <h2>Tugas Cyber Security : AES-256 Encryption and Decryption</h2>
      <input
        type="text"
        placeholder="Masukkan Text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        required
        style={{ margin: '10px 0', padding: '10px', width: '300px' }}
      />
      <input
        type="text"
        placeholder="Kunci Enkripsi (32 Karakter)"
        value={encryptionKey}
        onChange={handleKeyChange}
        required
        style={{ margin: '10px 0', padding: '10px', width: '300px' }}
      />
      <small>{encryptionKey.length}/32 characters</small>
      <button
        onClick={encrypt}
        disabled={encryptionKey.length !== 32} // Button only enabled when key length is 32
        style={{
          margin: '10px 0',
          padding: '10px 20px',
          backgroundColor: encryptionKey.length === 32 ? '#4a90e2' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: encryptionKey.length === 32 ? 'pointer' : 'not-allowed',
        }}
      >
        Encrypt
      </button>
      {encryptedText && (
        <>
          <h3>Encrypted Text:</h3>
          <textarea readOnly value={encryptedText} rows="4" style={{ width: '300px', margin: '10px 0' }} />
          <button
            onClick={decrypt}
            style={{ margin: '10px 0', padding: '10px 20px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Decrypt
          </button>
        </>
      )}
      {decryptedText && (
        <>
          <h3>Decrypted Text:</h3>
          <textarea readOnly value={decryptedText} rows="4" style={{ width: '300px', margin: '10px 0' }} />
        </>
      )}
    </div>
  );
};

export default Aes256Encryption;
