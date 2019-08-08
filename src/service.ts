import {IItem} from "hacker-news-api-types";
import {itemUrl, STORIES_URL} from './constants';

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

export async function fetchItem(id: number) {
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

export function fetchStoryComments(id: number) {
    const commentIds = cache.items[id].kids;
    if (!commentIds) {
        return;
    }

    const commentTree: ICommentBranch = {
        id,
        children: commentIds.map(id => ({id})),
    };
    return buildCommentTree(commentTree);
}

interface ICommentBranch {
    id: number,
    parent?: number,
    children?: ICommentBranch[],
}

// const commentTree = {
//     id: 1,
//     children: [
//         {
//             id: 4,
//             parent: 1
//             children: [
//                 {
//                     id: 10,
//                     parent: 4
//                 },
//                 {
//                     id: 14,
//                     parent: 4
//                 }
//             ]
//         }
//     ]
// }

/*
step 1:
{
    id: 4
}

step 2:
{
    id: 4,
    parent: 1
    children: [
        {
            id: 10,
            parent: 4
        },
        {
            id: 14,
            parent: 4
        }
    ]
}

step 3:
{
    id: 4,
    parent: 1
    children: [
        {
            id: 10,
            parent: 4
            children: [
                {
                    id: 20,
                    parent: 10
                },
                {
                    id: 21,
                    parent: 10
                }
            ]
        },
        {
            id: 14,
            parent: 4
        }
    ]
}

 */

function buildBranch(id: number, parentId: number, ...childIds: number[]): ICommentBranch {
    const branch: ICommentBranch = {
        id: id,
        parent: parentId,
    }

    if (!childIds.length) {
        return branch
    }

    branch.children = childIds.map(childId => ({
        id: childId,
        parent: id
    }))

    return branch;
}


export async function buildCommentTree(commentBranch: ICommentBranch) {
    if (!commentBranch.children) {
        return commentBranch;
    }
    const children = commentBranch.children
        .map(async child => {
            const item = await fetchItem(child.id);
            return buildBranch(child.id, commentBranch.id, ...item.kids);
        });

    Promise.all(children)
        .then(children => {
            console.log('children: ' + JSON.stringify(children, null, 2));
        })

}

export async function fetchLatestStories(offset: number) {
    const storyIds = await fetchStoryIds();
    const selectedStories = storyIds
        .slice(offset, offset + 20)
        .map(fetchItem)

    return Promise.all(selectedStories);
}
