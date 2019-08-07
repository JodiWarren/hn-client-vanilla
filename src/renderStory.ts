import {IItem} from "hacker-news-api-types";
import {h} from "./hokeyscript";

export function renderStory(story: IItem): Element {
    const hasComments = story.kids && story.kids.length > 0;
    return h(
        'li',
        {
            class: 'story'
        },
        h(
            'div',
            {
                class: 'story__score'
            },
            `${story.score}`
        ),
        h(
            'h2',
            {
                class: 'story__title'
            },
            h(
                'a',
                {
                    href: story.url
                },
                `${story.title}`
            )
        ),
        h(
            'span',
            {
                class: 'story__comments'
            },
            `${story.kids.length} comments`
        )
    )
}
