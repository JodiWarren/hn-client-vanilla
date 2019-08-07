interface Hokeyattr {
    [key: string]: (() => void) | string;
}

interface Hokeyscript {
    (tag: string, attributes: Hokeyattr | null, ...children: Array<string | Element>): Element
}

function removeOnFromBeginningOfString(string: string) {
    const regex = /^(?:on)([\S]+)/;
    return regex.exec(string)[1];
}

/**
 * Jodi's own hokey hyperscript-compatible clone
 */
export const h: Hokeyscript = function (tag, attributes, ...children): Element {
    const element = document.createElement(tag);

    if (attributes) {
        for (let [key, value] of Object.entries(attributes)) {
            if (typeof value === 'function') {
                // remove "on" from beginning of event
                const eventName = removeOnFromBeginningOfString(key);
                // Need to create a list of events to later deregister
                element.addEventListener(eventName, value, false);
            } else {
                element.setAttribute(key, value)
            }
        }
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    })

    return element;
}
