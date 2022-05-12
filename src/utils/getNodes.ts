import {Position} from "react-flow-renderer";

const position = {x: 0, y: 0};

export const getNodes = (items: any[], type: string) => {
    return items.map((item) => {
        return {
            id: `${type}-${item.id}`,
            type: type,
            data: item,
            position,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top
        }
    });
}