import {fetchLatestStories} from './service';
import {IItem} from "hacker-news-api-types";
import {stories} from "./components/stories";

export interface IAppState {
    storyOffset: number;
    storiesData: Array<IItem>;
    loading: boolean;
    setState: (callback: (appState: IAppState) => IAppState, rerender?: boolean) => void;
}

let appState: IAppState = {
    setState: (callback, rerender = false) => {
        appState = callback(appState);
        if (rerender) {
            render();
        }
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

function setLoadingOn(appState: IAppState) {
    console.log('Loading: ON');
    appState.setState(appState => {
        return {
            ...appState,
            loading: true,
        }
    }, true)
}

function setLoadingOff(appState: IAppState) {
    console.log('Loading: OFF');
    appState.setState(appState => {
        return {
            ...appState,
            loading: false,
        }
    }, true)
}

export function fetchStories() {

    setLoadingOn(appState)
    fetchLatestStories(appState.storyOffset)
    .then(data => {
            setLoadingOff(appState);
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
