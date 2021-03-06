import {IItem} from "hacker-news-api-types";
import {itemUrl, STORIES_URL} from './constants';
import {buildBranch, ICommentBranch} from "./utils";

interface ICache {
    storyIds: number[];
    items: {
        [id: number]: IItem;
    };
}

const cache: ICache = {
    storyIds: [],
    items: {},
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

export async function fetchItem(id: number): Promise<IItem> {
    if (cache.items[id]) {
        return cache.items[id];
    }

    try {
        const itemDetails = await fetch(itemUrl(id))
        cache.items[id] = await itemDetails.json();
        return cache.items[id];
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchLatestStories(offset: number) {
    const storyIds = await fetchStoryIds();
    const selectedStories = storyIds
        .slice(offset, offset + 20)
        .map(fetchItem)

    return Promise.all(selectedStories);
}
