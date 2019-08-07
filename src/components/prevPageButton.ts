import {h} from "../hokeyscript";
import {IAppState} from "../index";
import {PAGINATE_LENGTH} from "../constants";

export const prevPage = (
    appState: IAppState,
    attributes: any
) => {
    function paginatePrev() {
        appState.setState((appState) => {
            return {
                ...appState,
                storyOffset: appState.storyOffset - PAGINATE_LENGTH
            };
        })
    }

    const buttonAttrs: any = {
        class: 'stories__page stories__prev-page',
        onclick: function () {
            paginatePrev();
            attributes.fetchStories();
        }
    };
    if (appState.storyOffset === 0) {
        buttonAttrs.disabled = 'true';
    }

    return h(
        'button',
        buttonAttrs,
        'Previous Page'
    )
}
