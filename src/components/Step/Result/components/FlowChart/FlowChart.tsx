import ReactFlow, {Edge, Node, Position, ReactFlowProvider} from 'react-flow-renderer';
import React, {useEffect, useMemo, useState} from 'react';
import {IOption, IOptionSummary, IProperty} from "../../../../../store/flow/flowTypes";
import PropertyNodeType from "../NodeTypes/PropertyNodeType";
import OptionNodeType from "../NodeTypes/OptionNodeType";
import WinnerNodeType from "../NodeTypes/WinnerNodeType";

interface FlowChartProps {
    properties: IProperty[],
    summary: IOptionSummary[],
    normalisedData: IOption[],
    winner: IOptionSummary[]
}

const FlowChart = ({properties, summary, normalisedData, winner}: FlowChartProps) => {

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [nodeIds, setNodeIds] = useState<{property: string[], option: string[], winner: string[]}>();

    const nodeTypes = useMemo(() => ({
        property: PropertyNodeType,
        option: OptionNodeType,
        winner: WinnerNodeType
    }), []);

    useEffect(() => {
        let propertyXPosition = -220;
        const propertyNodes = properties.map((item) => {
            propertyXPosition = propertyXPosition + 240;
            return {
                id: `property-${item.id}`,
                type: 'property',
                data: item,
                position: {x: propertyXPosition, y: 0},
                sourcePosition: Position.Bottom
            }
        });
        let optionXPosition = -220;
        const optionNodes = normalisedData.map((item) => {
            optionXPosition = optionXPosition + 240;
            const data = {
                option: item,
                finalScore: summary.find(summary => summary.id === item.id)?.valueSum
            }
            return {
                id: `option-${item.id}`,
                type: 'option',
                data: data,
                position: {x: optionXPosition, y: 250},
                targetPosition: Position.Top,
                sourcePosition: Position.Bottom
            }
        });
        let winnerXPosition = -220;
        const winnerNodes = winner.map((item) => {
            winnerXPosition = winnerXPosition + 240;
            return {
                id: `winner-${item.id}`,
                type: 'winner',
                data: item,
                position: {x: winnerXPosition, y: 700},
                targetPosition: Position.Top
            }
        });

        const ids = {
            property: propertyNodes.map(item => item.id),
            option: optionNodes.map(item => item.id),
            winner: winnerNodes.map(item => item.id)
        }

        setNodeIds(() => ids);
        setNodes(prevArray => [...prevArray, ...propertyNodes, ...optionNodes, ...winnerNodes]);
    }, [winner, summary, properties, normalisedData])

    useEffect(() => {
        if (!nodeIds) return;
        const propertyToOptionsEdges = nodeIds.property.map(propertyId => {
            return nodeIds.option.map(optionId => {
                return {
                    id: `${propertyId}-${optionId}-target`,
                    source: propertyId,
                    target: optionId,
                    sourceHandle: propertyId,
                    targetHandle: optionId,
                    style: { stroke: '#fff' }
                }
            })
        }).flat();
        setEdges(prevArray => [...prevArray, ...propertyToOptionsEdges.flat()]);

        const optionsToWinnersEdges = nodeIds.option.map(optionId => {
            return nodeIds.winner.map(winnerId => {
                return {
                    id: `${optionId}-${winnerId}-source`,
                    source: optionId,
                    target: winnerId,
                    sourceHandle: optionId,
                    targetHandle: winnerId,
                    style: { stroke: '#fff' }
                }
            })
        }).flat()
        setEdges(prevArray => [...prevArray, ...optionsToWinnersEdges.flat()]);
    }, [nodeIds])

    return (
        <ReactFlowProvider>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
            />
        </ReactFlowProvider>
    )

}

export default FlowChart;