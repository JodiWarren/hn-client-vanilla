export interface ICommentBranch {
    id: number,
    parent?: number,
    children?: ICommentBranch[],
}
export function buildBranch(id: number, parentId = 0, ...childIds: number[]): ICommentBranch {
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
