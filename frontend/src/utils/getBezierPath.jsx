import { BaseEdge, getStraightPath } from '@xyflow/react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  // Adjust the source and target positions for the edge path
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY: sourceY + 10, // Adjust for source handle offset
    targetX,
    targetY: targetY - 10, // Adjust for target handle offset
  });

  return <BaseEdge id={id} path={edgePath} />;
}
