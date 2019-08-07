import {greetName} from "./greetName";

const app = document.querySelector('#app');
const helloJodi = document.createTextNode(greetName('Ellie'))

app.append(helloJodi)
