import {h} from "./hokeyscript";

const app = document.querySelector('#app');
// const helloJodi = document.createTextNode(greetName('Ellie'))

const helloJodi = h('h1', null, 'Hello Jodi');

const list = h(
    'ul',
    null,
    h('li', {
        style: 'color: red',
        'aria-something': 'something else',
    }, "Jodi"),
    h('li', null, "Ellie"),
    h('li', null,
        h('strong', null, 'Moth')
    ),
);

console.log(typeof list);
console.log(list);

app.append(helloJodi)
app.append(list)
