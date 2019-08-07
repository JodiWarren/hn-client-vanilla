import {IItem} from "hacker-news-api-types";
import {h} from "../hokeyscript";

export function story(story: IItem): Element {
    const commentsLength = story.kids && story.kids.length ? story.kids.length : 'No';

    const postedTime = new Date(story.time * 1000);

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
            `${story.score} votes`
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
            'time',
            {
                class: 'story__date',
                datetime: postedTime.toISOString()
            },
            `${postedTime.toLocaleDateString()}`
        ),
        h(
            'span',
            {
                class: 'story__comments',
            },
            `${commentsLength} comments`
        )
    )
}
