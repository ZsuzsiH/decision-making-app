
const type = 'smoothstep';

export const getEdges = (source: string[], target: string[]) => {
    return source.map((sourceId) => {
        return target.map((targetId) => {
            return {
                id: `${sourceId}-${targetId}-target`,
                source: sourceId,
                target: targetId,
                sourceHandle: sourceId,
                targetHandle: targetId,
                type,
                style: {stroke: '#fff'}
            }
        })
    }).flat();
}