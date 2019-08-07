import {h} from "../hokeyscript";
import {story} from "./story";
import {fetchStories, IAppState} from "../index";
import {nextPage} from "./nextPageButton";
import {prevPage} from "./prevPageButton";

function loading(appState: IAppState): Element {
    return h(
        'p',
        null,
        appState.loading ? 'Loading' : ''
    )
}

export function stories(appState: IAppState): Element {
  return h(
    'div',
    {
      class: 'stories',
    },
    prevPage(appState, {fetchStories}),
    nextPage(appState, {fetchStories}),
    loading(appState),
    h(
      'ol',
      {
        class: 'story-list'
      },
      ...appState.storiesData.map(story)
    )
  )
}
