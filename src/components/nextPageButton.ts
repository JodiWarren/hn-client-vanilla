import {h} from "../hokeyscript";
import {PAGINATE_LENGTH} from "../constants";
import {IAppState} from "../index";

export const nextPage = (
    appState: IAppState,
    attributes: any
) => {

    function paginateNext() {
        appState.setState((appState) => {
            return {
                ...appState,
                storyOffset: appState.storyOffset + PAGINATE_LENGTH
            };
        })
    }

    return h(
        'button',
        {
            class: 'stories__page stories__next-page',
            onclick: function () {
                paginateNext();
                attributes.fetchStories();
            }
        },
        'Next Page'
    )
}
