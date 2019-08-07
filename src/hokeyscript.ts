interface Hokeyattr {
    [key: string]: string;
}

interface Hokeyscript {
    (tag: string, attributes: Hokeyattr | null, ...children: Array<string | Element>): Element
}

/**
 * Jodi's own hokey hyperscript-compatible clone
 */
export const h: Hokeyscript = function (tag, attributes, ...children): Element {
    const element = document.createElement(tag);

    if (attributes) {
        for (let [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value)
        }
    }

    children.forEach(child => {
        let thisChild;
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    })

    return element;
}
