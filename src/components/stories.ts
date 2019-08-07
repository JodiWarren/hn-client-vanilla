import {h} from "../hokeyscript";
import {story} from "./story";
import {fetchStories, IAppState} from "../index";
import {nextPage} from "./nextPageButton";
import {prevPage} from "./prevPageButton";

export function stories(appState: IAppState) {
  return h(
    'div',
    {
      class: 'stories',
    },
    prevPage(appState, {fetchStories}),
    nextPage(appState, {fetchStories}),

    h(
      'ol',
      {
        class: 'story-list'
      },
      ...appState.storiesData.map(story)
    )
  )
}
