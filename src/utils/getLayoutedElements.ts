import dagre from "dagre";
import {Edge, isNode, Node, Position} from "react-flow-renderer";
const defaultNodeWidth = 300;
const defaultNodeHeight = 200;

interface Elements {
    nodes: Node[],
    edges: Edge[]
}

export const getLayoutedElements = (elements: Elements): Elements => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: "TB" });

    elements.nodes.forEach((element) => {
        if (isNode(element)) {
            dagreGraph.setNode(element.id, {width: element.width, height: element.height});
        }
    });

    elements.edges.forEach((element) => {
        dagreGraph.setEdge(element.source, element.target);
    })

    dagre.layout(dagreGraph);

    return {
        edges: elements.edges,
        nodes: elements.nodes.map((element) => {
            if (isNode(element)) {
                const nodeWithPosition = dagreGraph.node(element.id);
                const width = element.width ? element.width : defaultNodeWidth;
                const height = element.height ? element.height : defaultNodeHeight;
                element.targetPosition = Position.Left
                element.sourcePosition = Position.Right
                element.position = {
                    x: nodeWithPosition.x - width  / 2 + Math.random() / 1000,
                    y: nodeWithPosition.y - height / 2,
                };
            }
            return element;
        })
    }
};