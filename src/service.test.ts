import {buildCommentTree} from "./service";

describe('building a comment tree', function () {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('should return a constructed comment tree', function () {
        fetchMock
            .once(JSON.stringify({
                data: {
                    "id": 20622411,
                    "kids": [20622516, 20622503],
                    "parent": 20620545,
                }
            }))
            .once(JSON.stringify({
                data: {
                    "id": 20622516,
                    "parent": 20622411,
                }
            }))
            .once(JSON.stringify({
                data: {
                    "id": 20622503,
                    "kids": [20622918],
                    "parent": 20622411,
                }
            }));

        const startingCommentTree = {
            id: 1,
            children: [
                {
                    id: 20622411
                }
            ],
        }

        const commentTree = buildCommentTree(startingCommentTree);
        console.log(commentTree);
    });
});
