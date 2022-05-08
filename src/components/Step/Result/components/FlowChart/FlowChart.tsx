import ReactFlow, {MarkerType} from 'react-flow-renderer';
import React, { useMemo } from 'react';
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

    const nodeTypes = useMemo(() => ({
        property: PropertyNodeType,
        option: OptionNodeType,
        winner: WinnerNodeType
    }), []);

    let propertyXPosition = 0;
    const propertyNodes = properties.map((item) => {
        propertyXPosition = propertyXPosition + 240;
        return {
            id: `property-${item.id}`,
            type: 'property',
            data: item,
            position: {x: propertyXPosition, y: 0},
        }
    });

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
            position: {x: optionXPosition, y: 250}
        }
    });

    let winnerXPosition = 0;
    const winnerNodes = winner.map((item) => {
        winnerXPosition = winnerXPosition + 240;
        return {
            id: `winner-${item.id}`,
            type: 'winner',
            data: item,
            position: {x: winnerXPosition, y: 1000}
        }
    });

    const edges = [
        {id: 'e1-2', source: '1', target: '2', label: 'this is an edge label'},
        {id: 'e1-3', source: '1', target: '3', label: 'loool'},
        {
            id: 'e3-4',
            source: '3',
            target: '4',
            animated: true,
            label: 'animated edge',
        },
        {
            id: 'e4-5',
            source: '4',
            target: '5',
            label: 'edge with arrow head',
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
        },
        {
            id: 'e5-6',
            source: '5',
            target: '6',
            type: 'smoothstep',
            label: 'smooth step edge',
        },
        {
            id: 'e5-7',
            source: '5',
            target: '7',
            type: 'step',
            style: {stroke: '#f6ab6c'},
            label: 'a step edge',
            animated: true,
            labelStyle: {fill: '#f6ab6c', fontWeight: 700},
        },
    ];

    return (
        <ReactFlow className={styles.flowChart} nodeTypes={nodeTypes} nodes={[...propertyNodes, ...optionNodes, ...winnerNodes]} edges={edges}/>
    )

}

export default FlowChart;