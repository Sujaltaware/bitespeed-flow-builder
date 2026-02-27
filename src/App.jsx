import FlowBuilder from "./components/FlowBuilder";
import ReactFlow, {
  ReactFlowProvider
} from 'reactflow';

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <FlowBuilder />
      </div>
    </ReactFlowProvider>
  );
}