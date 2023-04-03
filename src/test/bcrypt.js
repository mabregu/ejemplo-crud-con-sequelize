// bcrypt es una librería que nos permite encriptar contraseñas
const bcrypt = require('bcrypt');
// saltRounds es la cantidad de veces que se va a encriptar la contraseña
const saltRounds = 10;
// myPlaintextPassword es la contraseña que se va a encriptar
const myPlaintextPassword = '123456';
const otherPlaintextPassword = '1234567';
// hash es la contraseña encriptada
let hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
// compareSync es un método que nos permite comparar la contraseña encriptada con la contraseña que se va a comparar
let result = bcrypt.compareSync(myPlaintextPassword, hash);

if (result) {
    console.log('Las contraseñas coinciden');
} else {
    console.log('Las contraseñas no coinciden');
}