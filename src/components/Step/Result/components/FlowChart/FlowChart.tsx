import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import ReactFlow, {
    ReactFlowProvider,
    Node,
    applyNodeChanges,
    useNodesState, useEdgesState
} from "react-flow-renderer";
import PropertyNodeType from "../NodeTypes/PropertyNodeType";
import OptionNodeType from "../NodeTypes/OptionNodeType";
import WinnerNodeType from "../NodeTypes/WinnerNodeType";
import {getLayoutedElements} from "../../../../../utils/getLayoutedElements";
import {useAppSelector} from "../../../../../store/store";
import {IOption, IOptionSummary} from "../../../../../store/flow/flowTypes";
import {winnerCalculation} from "../../../../../utils/calculations";
import {getNodes} from "../../../../../utils/getNodes";
import {getEdges} from "../../../../../utils/getEdges";
import sharedStyles from "../../../../../styles/shared.module.scss";
import CustomMotionDiv from "../../../../CustomMotionDiv/CustomMotionDiv";

const nodeTypes = {
    property: PropertyNodeType,
    option: OptionNodeType,
    winner: WinnerNodeType
};

const nodeHasDimension = (el: Node) => el.width && el.height;

const FlowChart = () => {
    const [nodes, setNodes, onNodeChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const [shouldLayout, setShouldLayout] = useState(true);
    const flow = useAppSelector((state) => state.flow.current);

    const [result, setResult] = useState<{
        normalisedData: IOption[],
        summary: IOptionSummary[],
        winner: IOptionSummary[]
    }>()

    useEffect(() => {
        /*
            Calculate results
         */
        if (!flow) return;
        const data = winnerCalculation(flow);
        setResult(() => data);
    }, [flow])

    useEffect(() => {
        /*
            Get nodes and edges
         */
        if (!flow || !result || !result.normalisedData || !result.summary || !result.winner) return;

        const updateOptions = result.normalisedData.map(item => {
            return {
                ...item,
                score: result.summary.find(summary => summary.id === item.id)?.valueSum
            }
        })

        const propertyNodes = getNodes(flow.properties, 'property');
        const optionNodes = getNodes(updateOptions, 'option');
        const winnerNodes = getNodes(result.winner, 'winner');

        const ids = {
            property: propertyNodes.map(item => item.id),
            option: optionNodes.map(item => item.id),
            winner: winnerNodes.map(item => item.id)
        }

        const propertyToOptionsEdges = getEdges(ids.property, ids.option);
        const optionsToWinnersEdges = getEdges(ids.option, ids.winner);

        const nodes = [...propertyNodes, ...optionNodes, ...winnerNodes];
        const edges = [...propertyToOptionsEdges.flat(), ...optionsToWinnersEdges.flat()]

        setNodes(() => nodes);
        setEdges(() => edges);
        setShouldLayout(() => true);
    }, [result])

    useLayoutEffect(() => {
        if (shouldLayout && nodes && nodes.length && nodes.length > 0 && nodes.every(nodeHasDimension)) {
            const elementsWithLayout = getLayoutedElements({nodes, edges});
            setNodes(elementsWithLayout.nodes)
            setShouldLayout(() => false);
        }
    }, [nodes]);

    useEffect(() => {
        console.log('shouldLayout', shouldLayout)
    }, [shouldLayout])

    return (
        <CustomMotionDiv className={sharedStyles.page}>
            <ReactFlowProvider>
                <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodeChange}/>
            </ReactFlowProvider>
        </CustomMotionDiv>
    )
};

export default FlowChart;





