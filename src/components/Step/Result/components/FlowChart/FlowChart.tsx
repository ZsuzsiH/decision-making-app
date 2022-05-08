import ReactFlow, {Edge, Node, Position, ReactFlowProvider} from 'react-flow-renderer';
import React, {useEffect, useMemo, useState} from 'react';
import {IOption, IOptionSummary, IProperty} from "../../../../../store/user/userTypes";
import PropertyNodeType from "../NodeTypes/PropertyNodeType";
import styles from './FlowChart.module.scss';
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
    const [propertyNodeIds, setPropertyNodeIds] = useState<string[]>([]);
    const [optionNodeIds, setOptionNodeIds] = useState<string[]>([]);
    const [winnerNodeIds, setWinnerNodeIds] = useState<string[]>([]);

    const nodeTypes = useMemo(() => ({
        property: PropertyNodeType,
        option: OptionNodeType,
        winner: WinnerNodeType
    }), []);

    useEffect(() => {
        let propertyXPosition = 0;
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
        setPropertyNodeIds(() => propertyNodes.map(item => item.id));
        setNodes(prevArray => [...prevArray, ...propertyNodes]);
    }, [properties])

    useEffect(() => {
        let optionXPosition = 0;
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
        setOptionNodeIds(() => optionNodes.map(item => item.id));
        setNodes((prev) => [...prev, ...optionNodes])
    }, [summary, normalisedData])

    useEffect(() => {
        let winnerXPosition = 0;
        const winnerNodes = winner.map((item) => {
            winnerXPosition = winnerXPosition + 240;
            return {
                id: `winner-${item.id}`,
                type: 'winner',
                data: item,
                position: {x: winnerXPosition, y: 800},
                targetPosition: Position.Top
            }
        });
        setWinnerNodeIds(() => winnerNodes.map(item => item.id));
        setNodes((prev) => [...prev, ...winnerNodes])
    }, [winner])

    useEffect(() => {
        const propertyToOptionsEdges = propertyNodeIds.map(propertyId => {
            return optionNodeIds.map(optionId => {
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
    }, [propertyNodeIds, optionNodeIds])

    useEffect(() => {
        const optionsToWinnersEdges = optionNodeIds.map(optionId => {
            return winnerNodeIds.map(winnerId => {
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
    }, [optionNodeIds, winnerNodeIds])

    return (
        <ReactFlowProvider>
            <ReactFlow
                className={styles.flowChart}
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
            />
        </ReactFlowProvider>
    )

}

export default FlowChart;