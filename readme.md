# Basic Hacker News client

## Getting started

To install dependencies and start a webpack-dev-server, run the below commands. 
```sh
npm install
npm run start
```

## Tech
 - TypeScript
 - Webpack
 - Jest
 
## Spec

Build a Hacker News client using the [normal API](https://github.com/HackerNews/API), and ideally vanilla JavaScript.

## Explanation

I interpreted the request for vanilla JavaScript as executing the request without a common library like React, Vue, or jQuery.

That said, I still wanted to build a DOM declaratively, so I wrote a quick and dirty Hyperscript-style implemention. I called it Hokeyscript, because it's very hokey.

I chose to use TypeScript for it's developer friendliness.

Async requests were made using Promises, via the fetch API.

The overall architecture was inspired by common React patterns. However, most of the code is lot more specific and thus less reusable.

## Todo

- Styling! Despite it being one of my strong points, due to time constraints, I elected to bypass any CSS.
- More thorough a11y considerations.
- Add comments. This was briefly attempted, but discarded due to available time.
