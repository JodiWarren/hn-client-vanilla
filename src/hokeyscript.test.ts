import {h} from "./hokeyscript";

it('should return a Node', function () {
  const helloJodi = h('h1', null, 'Hello Jodi');

  expect(typeof helloJodi).toBe("object");
  expect(helloJodi.nodeName).toBe("H1");
  expect(helloJodi.textContent).toBe("Hello Jodi");
});

describe('elements can contain children', function () {
  const list = h(
      'ul',
      null,
      h('li', {
        style: 'color: red',
        'aria-something': 'something else',
      }, "Jodi"),
      h('li', {
        onclick: function() { alert('hello!') }
      }, "Ellie"),
      h('li', null,
          h('strong', null, 'Moth')
      ),
  );

  it('should be the declared element', function () {
    expect(list instanceof HTMLUListElement).toBe(true);
    expect(list.nodeName).toBe('UL');
  });

  it('should have the correct number and type of child nodes', function () {
    expect(list.children.length).toBe(3);
    expect(list.children[0].nodeName).toBe('LI')
    expect(list.children[0].textContent).toBe('Jodi')
    expect(list.children[0].attributes[0].nodeName).toBe('style')
    expect(list.children[0].attributes[0].nodeValue).toBe('color: red')
    expect(list.children[1].nodeName).toBe('LI')
    expect(list.children[1].textContent).toBe('Ellie')
    expect(list.children[2].nodeName).toBe('LI')
    expect(list.children[2].children[0].nodeName).toBe('STRONG')
    expect(list.children[2].children[0].textContent).toBe('Moth')
  });
});
