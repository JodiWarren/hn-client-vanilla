import {IItem} from "hacker-news-api-types";
import {itemUrl, STORIES_URL} from './constants';

interface ICache {
    storyIds: number[];
    stories: {
        [id: number]: IItem;
    };
}

const cache: ICache = {
    storyIds: [],
    stories: {},
}

export async function fetchStoryIds() {
    if (cache.storyIds.length) {
        return cache.storyIds;
    }

    try {
        const latestStories = await fetch(STORIES_URL);
        cache.storyIds = await latestStories.json();
        return cache.storyIds;
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchStory(id: number) {
    if (cache.stories[id]) {
        return cache.stories[id];
    }

    try {
        const storyDetails = await fetch(itemUrl(id))
        cache.stories[id] = await storyDetails.json();
        return cache.stories[id];
    } catch (error) {
        console.error(error.message);
    }

}

export async function fetchLatestStories(offset: number) {
    const storyIds = await fetchStoryIds();
    const selectedStories = storyIds
        .slice(offset, offset + 20)
        .map(fetchStory)

    return Promise.all(selectedStories);
}
