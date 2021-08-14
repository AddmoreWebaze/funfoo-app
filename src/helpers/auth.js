import axios from 'axios';

// this library is to bypass Google encryption.
// So we do not send plain passwords to the backend.
const encrypt = (salt, text) => {
  console.log(salt, text)
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

const login = (email, password) => new Promise((resolve, reject) => {
  axios.post(`${process.env.VUE_APP_APIURL}/login`, {
    email,
    password: encrypt(process.env.VUE_APP_SALT, password),
  })
  .then((response) => {
    resolve(response.data)
  })
  .catch((e) => {
    reject(e)
  })
})



export default {
  login,
};
