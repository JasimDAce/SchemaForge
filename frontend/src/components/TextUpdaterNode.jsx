import { Handle, Position } from "@xyflow/react";

const handleStyle = { width: 10, height: 10, backgroundColor: "#555" };

function TextUpdaterNode({ data, isConnectable }) {
  return (
    <div className="border-2 rounded-lg bg-gray-900 p-4 shadow-lg text-white">
      {/* Handle for the top connection point */}
      <Handle
        type="target"
        position={Position.Top}
        style={handleStyle}
        isConnectable={isConnectable}
      />
      
      {/* Table Name */}
      <h2 className="text-lg font-bold mb-2 text-green-400">
        {data.name}
      </h2>
      
      {/* Fields */}
      {data.fields.map(({ name, type }) => (
        <div key={name} className="flex justify-between items-center mb-1">
          <label className="text-gray-300 text-sm" htmlFor="text">
            {name}
          </label>
          <label className="pl-4 text-gray-400 text-sm" htmlFor="text">
            {type}
          </label>
        </div>
      ))}
      
      {/* Handle for the bottom connection point */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={handleStyle}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
