import {getChildComments} from "./service";

describe('building a comment tree', function () {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('should return a constructed comment tree', function () {
        fetchMock
            .once(JSON.stringify({
                data: {
                    "id": 10,
                    "kids": [20, 30],
                    "parent": 20620545,
                }
            }))
            .once(JSON.stringify({
                data: {
                    "id": 20,
                    "parent": 10,
                }
            }))
            .once(JSON.stringify({
                data: {
                    "id": 30,
                    "kids": [40],
                    "parent": 10,
                }
            }))
            .once(JSON.stringify({
                data: {
                    "id": 40,
                    "parent": 30,
                }
            }));

        const comments = getChildComments(20622411);
        console.log(JSON.stringify(comments, null, 2));
    });
});
