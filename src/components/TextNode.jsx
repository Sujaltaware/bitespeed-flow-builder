import React from 'react';
import { Handle, Position } from 'reactflow';


function TextNode({ data, selected }) {
  return (
    <div className={`text-node ${selected ? 'text-node--selected' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="handle handle--target"
      />

    
      <div className="text-node__header">
        <span className="text-node__icon">💬</span>
        <span className="text-node__title">Send Message</span>
      </div>

  
      <div className="text-node__body">
        <p className="text-node__label">{data.label || 'Click to edit...'}</p>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="handle handle--source"
      />
    </div>
  );
}

export default TextNode;