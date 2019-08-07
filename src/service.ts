import {IItem} from "hacker-news-api-types";
import {itemUrl, STORIES_URL} from './constants';

export async function fetchStoryIds() {
    try {
        const latestStories = await fetch(STORIES_URL)
        return await latestStories.json();
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchStory(id: number) {
    try {
        const storyDetails = await fetch(itemUrl(id))
        return await storyDetails.json();
    } catch (error) {
        console.error(error.message);
    }

}

let storyIds: number[] | null;
export async function fetchLatestStories(offset: number) {
    if (!storyIds) {
        storyIds = await fetchStoryIds();
    }
    const firstStories = storyIds
        .slice(offset, offset + 20)
        .map(fetchStory)

    return Promise.all(firstStories);
}
