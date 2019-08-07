import {h} from "./hokeyscript";

import {IItem} from 'hacker-news-api-types';
import {renderStory} from "./renderStory";

const app = document.querySelector('#app');

const storiesData: Array<IItem> = [
    {
        "by": "admerox",
        "descendants": 11,
        "id": 20634409,
        "kids": [20635085, 20635212, 20635249, 20635477, 20635001],
        "score": 62,
        "time": 1565183901,
        "title": "Show HN: Data Structures and Algorithms in JavaScript",
        "type": "story",
        "url": "https://github.com/amejiarosario/dsa.js-data-structures-algorithms-javascript"
    },
    {
        "by": "dsgerard",
        "descendants": 60,
        "id": 20634546,
        "kids": [20635566, 20635026, 20635458, 20635262, 20635408, 20634804, 20635080, 20634979, 20635059],
        "score": 90,
        "time": 1565184993,
        "title": "FedEx Ends Ground-Delivery Deal with Amazon",
        "type": "story",
        "url": "https://www.bloomberg.com/news/articles/2019-08-07/fedex-deepens-pullback-from-amazon-as-ground-delivery-deal-ends"
    },
    {
        "by": "pjmlp",
        "descendants": 3,
        "id": 20634100,
        "kids": [20635380, 20635370],
        "score": 41,
        "time": 1565181455,
        "title": "Technical Vision for Qt 6",
        "type": "story",
        "url": "https://blog.qt.io/blog/2019/08/07/technical-vision-qt-6/"
    }
];

const stories = h(
    'ol',
    null,
    ...storiesData.map(renderStory)
)

console.log(stories);

app.append(stories)
