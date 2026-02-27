import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import '../App.css';

const nodeTypes = {
  textNode: TextNode,
};

let nodeId = 1; 

function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null); 
  const [saveStatus, setSaveStatus] = useState(null); 


  const onConnect = useCallback(
    (params) => {
      
      const sourceAlreadyConnected = edges.some(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );
      if (sourceAlreadyConnected) return; 

      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${nodeId++}`,
        type: nodeType,
        position,
        data: { label: 'Text Message' }, 
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

 
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

 
  const onLabelChange = useCallback(
    (newLabel) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === selectedNode.id
            ? { ...n, data: { ...n.data, label: newLabel } }
            : n
        )
      );
      setSelectedNode((prev) => ({ ...prev, data: { ...prev.data, label: newLabel } }));
    },
    [selectedNode, setNodes]
  );

  const onSave = useCallback(() => {
    if (nodes.length <= 1) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    const nodesWithIncomingEdge = new Set(edges.map((e) => e.target));
    const nodesWithNoIncoming = nodes.filter((n) => !nodesWithIncomingEdge.has(n.id));

    if (nodesWithNoIncoming.length > 1) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    setSaveStatus('success');
    setTimeout(() => setSaveStatus(null), 3000);
  }, [nodes, edges]);

  return (
    <div className="flow-builder">
      {/* Top Header */}
      <header className="header">
        <div className="header-brand">⚡ BiteSpeed Flow Builder</div>
        {saveStatus === 'error' && (
          <div className="save-error">Cannot save Flow</div>
        )}
        {saveStatus === 'success' && (
          <div className="save-success">Flow saved!</div>
        )}
        <button className="save-btn" onClick={onSave}>
          Save Changes
        </button>
      </header>

      <div className="builder-body">
        
        <div className="canvas-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={16} size={1} />
          </ReactFlow>
        </div>

        <aside className="sidebar">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onLabelChange={onLabelChange}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </aside>
      </div>
    </div>
  );
}

export default FlowBuilder;