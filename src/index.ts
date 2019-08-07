import {fetchLatestStories} from './service';
import {IItem} from "hacker-news-api-types";
import {stories} from "./components/stories";

export interface IAppState {
    storyOffset: number;
    storiesData: Array<IItem>;
    loading: boolean;
    setState: (callback: (appState: IAppState) => IAppState) => void;
}

let appState: IAppState = {
    setState: callback => {
        appState = callback(appState)
    },

    storyOffset: 0,
    storiesData: [],
    loading: false,
}

const app = document.querySelector('#app');
let oldStories: Element | null = null;

function render() {
    const newStories = stories(appState);

    if (oldStories) {
        app.replaceChild(newStories, oldStories)
    } else {
        app.append(newStories)
    }

    oldStories = newStories;
}

export function fetchStories() {
    fetchLatestStories(appState.storyOffset)
        .then(data => {
                appState.setState(appState => {
                    return {
                        ...appState,
                        storiesData: data
                    }
                });
                render();
            }
        )
}

fetchStories()
