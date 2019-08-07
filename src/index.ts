import {h} from "./hokeyscript";
import {renderStory} from "./renderStory";
import {fetchLatestStories} from './service';
import {IItem} from "hacker-news-api-types";

const app = document.querySelector('#app');

interface AppState {
    storyOffset: number;
    storiesData: Array<IItem>;
}

let state: AppState = {
    storyOffset: 0,
    storiesData: [],
}

let oldStories : Element | null = null;

function render() {
    const newStories = h(
        'ol',
        {
            class: 'story-list'
        },
        ...state.storiesData.map(renderStory)
    )

    if (oldStories) {
        app.replaceChild(newStories, oldStories)
    } else {
        app.append(newStories)
    }

    oldStories = newStories;
}

fetchLatestStories(state.storyOffset).then(data => {
        console.log(data);
        state = {
            ...state,
            storiesData: data
        };
        render();
    }
)
