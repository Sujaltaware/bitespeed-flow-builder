import React from 'react';

const NODE_TYPES = [
  {
    type: 'textNode',
    label: 'Message',
    icon: '💬',
    description: 'Send a text message',
  },

];

function DraggableNode({ type, label, icon, description }) {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="node-item"
      draggable
      onDragStart={onDragStart}
      title={description}
    >
      <div className="node-item__icon">{icon}</div>
      <div className="node-item__label">{label}</div>
    </div>
  );
}


function NodesPanel() {
  return (
    <div className="nodes-panel">
      <div className="panel-header">
        <h3>Nodes</h3>
        <p className="panel-subtitle">Drag nodes onto the canvas</p>
      </div>
      <div className="nodes-grid">
        {NODE_TYPES.map((node) => (
          <DraggableNode key={node.type} {...node} />
        ))}
      </div>
    </div>
  );
}

export default NodesPanel;