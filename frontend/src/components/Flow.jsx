"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  ReactFlow,
  useEdgesState,
  useNodesState,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";
import CustomEdge from "./CustomEdge";

const edgeTypes = {
  'custom-edge': CustomEdge
};

const nodeTypes = { textUpdater: TextUpdaterNode };

const Flow = ({ schemaData }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Persistent storage for node positions
  const nodePositions = useRef({});

  const generateNodes = () => {
    return schemaData.map((schema, index) => {
      const position = nodePositions.current[schema.name] || { x: index * 50, y: 0 };
      return {
        id: schema.name,
        type: "textUpdater",
        position,
        data: schema,
      };
    });
  };

  const generateEdges = () => {
    const edges = [];
    schemaData.forEach((schema) => {
      schema.fields.forEach((field) => {
        if (field.ref) {
          edges.push({
            id: `${schema.name}-${field.ref}`,
            source: field.ref,
            target: schema.name,
            type: "custom-edge",
            animated: true,
            style: { stroke: "#FF4136" },
          });
        }
      });
    });
    return edges;
  };

  useEffect(() => {
    setNodes(generateNodes());
    setEdges(generateEdges());
  }, [schemaData]);

  const handleNodeChanges = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
        
        // Update positions in the ref
        updatedNodes.forEach(node => {
          nodePositions.current[node.id] = node.position;
        });

        return updatedNodes;
      });
    },
    [setNodes]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="bg-white h-screen w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodeChanges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        style={{ backgroundColor: "#121212" }}
      >
        <Background
          id="1"
          gap={20}
          color="#FF4136"
          variant={BackgroundVariant.Circle}
        />
      </ReactFlow>
    </div>
  );
};

export default Flow;
