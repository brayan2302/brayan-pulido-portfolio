"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Code2,
  Maximize2,
  Video,
  Layers,
} from "lucide-react";

// Authentic n8n Workflow Data for Elevate Group / WideStep
interface N8nNode {
  id: string;
  name: string;
  action: string;
  type: "trigger" | "action" | "agent" | "sub-model" | "output";
  iconType: "webhook" | "supabase" | "ai" | "claude" | "code" | "storage" | "nextjs";
  x: number; // percentage in canvas
  y: number; // percentage in canvas
  inputHandle?: boolean;
  outputHandle?: boolean;
  details: string;
  codeSnippet: string;
}

const N8N_NODES: N8nNode[] = [
  {
    id: "node-webhook",
    name: "When research JSON uploaded",
    action: "Webhook: POST /generate-listicle",
    type: "trigger",
    iconType: "webhook",
    x: 8,
    y: 44,
    inputHandle: false,
    outputHandle: true,
    details: "Disparador HTTP POST desde el dashboard administrativo de Elevate Group al subir el archivo de investigación de marketing.",
    codeSnippet: `// Webhook Payload Inbound
{
  "product": "WideStep Shoes",
  "official_url": "https://widestepshoe.com",
  "research_json": { "market_angles": 5, "pain_points": ["joint_pain", "comfort"] }
}`,
  },
  {
    id: "node-supabase-init",
    name: "Set status to In-Progress",
    action: "Supabase: update status",
    type: "action",
    iconType: "supabase",
    x: 29,
    y: 44,
    inputHandle: true,
    outputHandle: true,
    details: "Actualiza el registro en la base de datos de Supabase cambiando el estado de 'Pending' a 'In-Progress'.",
    codeSnippet: `await supabase
  .from('listicles')
  .update({ status: 'In-Progress', started_at: new Date() })
  .eq('id', payload.listicle_id);`,
  },
  {
    id: "node-agent",
    name: "Generate Listicle Landing",
    action: "AI Agent: Compile HTML",
    type: "agent",
    iconType: "ai",
    x: 52,
    y: 44,
    inputHandle: true,
    outputHandle: true,
    details: "Agente principal que procesa la investigación, redacta los titulares de alta conversión y estructura el HTML semántico.",
    codeSnippet: `// Agent Prompt & Compilation
const prompt = "Actúa como copywriter B2B experto en pre-landings...";
const htmlResult = await llm.invoke(prompt, payload.research_json);`,
  },
  {
    id: "node-claude",
    name: "Claude 3.5 Sonnet",
    action: "Chat Model: sub-node",
    type: "sub-model",
    iconType: "claude",
    x: 52,
    y: 84,
    inputHandle: true,
    outputHandle: false,
    details: "Modelo LLM conectado como sub-nodo al agente de n8n para generación de lenguaje natural y código.",
    codeSnippet: `provider: "Anthropic",
model: "claude-3-5-sonnet-20241022",
temperature: 0.3,
max_tokens: 4000`,
  },
  {
    id: "node-utf8",
    name: "Doble Blindaje UTF-8",
    action: "Code: Buffer binario estricto",
    type: "action",
    iconType: "code",
    x: 74,
    y: 44,
    inputHandle: true,
    outputHandle: true,
    details: "Convierte el string HTML en un Buffer binario estricto UTF-8 para evitar distorsión de tildes y caracteres (★, ✓, ’, —).",
    codeSnippet: `// Doble Blindaje UTF-8
const cleanBuffer = Buffer.from(htmlResult, 'utf-8');
return [{ json: { sizeBytes: cleanBuffer.length, buffer: cleanBuffer } }];`,
  },
  {
    id: "node-storage",
    name: "Supabase Storage",
    action: "Storage: listicles-bucket",
    type: "output",
    iconType: "storage",
    x: 93,
    y: 24,
    inputHandle: true,
    outputHandle: false,
    details: "Sube el archivo HTML estático compilado al bucket permanente 'listicles-bucket' en Supabase Storage.",
    codeSnippet: `await supabase.storage
  .from('listicles-bucket')
  .upload(\`\${id}/index.html\`, cleanBuffer, {
    contentType: 'text/html; charset=utf-8'
  });`,
  },
  {
    id: "node-callback",
    name: "Callback /api/callback",
    action: "HTTP: Mark as Completed",
    type: "output",
    iconType: "nextjs",
    x: 93,
    y: 64,
    inputHandle: true,
    outputHandle: false,
    details: "Notifica al endpoint /api/callback de la aplicación Next.js para actualizar la base de datos a 'Completed' y activar el proxy /api/preview.",
    codeSnippet: `POST /api/callback
{
  "listicle_id": "ls_98f4a1",
  "status": "Completed",
  "storage_path": "listicles-bucket/ls_98f4a1.html"
}`,
  },
];

// Exact SVG connections between nodes
const CONNECTIONS = [
  { from: "node-webhook", to: "node-supabase-init" },
  { from: "node-supabase-init", to: "node-agent" },
  { from: "node-agent", to: "node-claude", isSubNode: true },
  { from: "node-agent", to: "node-utf8" },
  { from: "node-utf8", to: "node-storage" },
  { from: "node-utf8", to: "node-callback" },
];

// Sequence of execution for simulation
const SIMULATION_SEQUENCE = [
  "node-webhook",
  "node-supabase-init",
  "node-claude",
  "node-agent",
  "node-utf8",
  "node-storage",
  "node-callback",
];

export function Pipeline() {
  const [viewMode, setViewMode] = useState<"canvas" | "video" | "all">("canvas");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedNode, setSelectedNode] = useState<N8nNode>(N8N_NODES[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setCompletedNodeIds([]);
    setActiveStep(0);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setActiveStep(null);
    setCompletedNodeIds([]);
  };

  useEffect(() => {
    if (!isSimulating || activeStep === null) return;

    if (activeStep >= SIMULATION_SEQUENCE.length) {
      const stopTimer = setTimeout(() => {
        setIsSimulating(false);
        setActiveStep(null);
      }, 0);
      return () => clearTimeout(stopTimer);
    }

    const currentNodeId = SIMULATION_SEQUENCE[activeStep];
    const nodeObj = N8N_NODES.find((n) => n.id === currentNodeId);
    if (nodeObj) {
      // Defer to avoid cascading renders
      setTimeout(() => setSelectedNode(nodeObj), 0);
    }

    const timer = setTimeout(() => {
      setCompletedNodeIds((prev) =>
        prev.includes(currentNodeId) ? prev : [...prev, currentNodeId]
      );
      if (activeStep + 1 < SIMULATION_SEQUENCE.length) {
        setActiveStep(activeStep + 1);
      } else {
        setIsSimulating(false);
        setActiveStep(null);
      }
    }, 1100);

    return () => clearTimeout(timer);
  }, [isSimulating, activeStep]);

  // Node Icon Renderer matching n8n aesthetic
  const renderNodeIcon = (iconType: N8nNode["iconType"]) => {
    switch (iconType) {
      case "webhook":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#ea4b71]/15 text-[#ea4b71]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11a2 2 0 0 0 2 2h1.5a4 4 0 1 1 0 2H16a4 4 0 0 1-4-4v-1.5A4 4 0 0 1 12 2zm6 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8 15a4 4 0 1 1 0-8 4 4 0 0 1 3.5 2.05A4 4 0 0 0 8 13v2zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </div>
        );
      case "supabase":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#3ecf8e]/15 text-[#3ecf8e]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.16.222a.396.396 0 0 0 .319.636h9.362v8.958c0 .324.368.51.616.3l9.08-12.261.16-.222a.396.396 0 0 0-.318-.697z" />
            </svg>
          </div>
        );
      case "ai":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-purple-500/15 text-purple-400">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
              <rect x="3" y="4" width="18" height="16" rx="4" />
              <path d="M8 10h.01M16 10h.01M9 15c1 1 5 1 6 0" />
            </svg>
          </div>
        );
      case "claude":
        return (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#d97757]/15 text-[#d97757]">
            {/* Anthropic / Claude Sunburst */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2l1.6 4.8L18 8l-3.2 3.6 1.2 5-4-2.8-4 2.8 1.2-5L6 8l4.4-1.2L12 2z" />
            </svg>
          </div>
        );
      case "code":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-400/15 text-amber-400">
            <Code2 className="w-5 h-5" />
          </div>
        );
      case "storage":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-cyan-400/15 text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
        );
      case "nextjs":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 text-white">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 17.584l-5.06-7.332V17h-1.5V7.416h1.5l5.06 7.332V7.416h1.5V17.584h-1.5z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* View Switcher: n8n Canvas / Video Walkthrough / Vista Completa */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewMode("canvas")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "canvas"
                ? "bg-[#ea4b71] text-white shadow-md shadow-[#ea4b71]/30"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <span>⚡ Flujo n8n en Vivo</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("video")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "video"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>🎬 Video Explicativo</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("all")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === "all"
                ? "bg-white/15 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <span>Ver Ambos</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline px-2">
          Elevate Group &bull; Listicle Admin Tool
        </span>
      </div>

      {/* 1. Authentic n8n Workflow Canvas */}
      {(viewMode === "canvas" || viewMode === "all") && (
        <div
          className={`relative rounded-2xl overflow-hidden border border-[#2d2d3d] bg-[#121218] shadow-2xl transition-all ${
            isFullscreen ? "fixed inset-4 z-50 max-h-[92vh] overflow-y-auto" : "w-full"
          }`}
        >
        {/* n8n Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[#252533] bg-[#181822]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#ea4b71] flex items-center justify-center shadow-md">
              <span className="font-bold text-xs text-white">n8n</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-100 font-sans tracking-tight">
                  Listicle-Admin-AI-Pipeline
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Elevate Group &bull; Webhook &rarr; Supabase &rarr; Claude 3.5 Sonnet &rarr; Buffer UTF-8
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSimulating
                  ? "bg-[#ea4b71]/25 text-[#ea4b71] border border-[#ea4b71]/40 cursor-not-allowed"
                  : "bg-[#ea4b71] hover:bg-[#d63f63] text-white shadow-[0_0_15px_rgba(234,75,113,0.4)]"
              }`}
            >
              <Play className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Ejecutando..." : "Test Workflow"}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Reiniciar canvas"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Maximizar canvas"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer hidden sm:block"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Canvas Area with Dot Grid */}
        <div className="relative w-full h-[480px] sm:h-[420px] overflow-hidden bg-[#101016] select-none">
          {/* Subtle Dot Grid Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <defs>
              <pattern id="n8n-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#3a3a4d" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#n8n-dots)" />
          </svg>

          {/* SVG Bezier Curves for Nodes Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea4b71" />
                <stop offset="50%" stopColor="#8a5cff" />
                <stop offset="100%" stopColor="#00ffd1" />
              </linearGradient>
            </defs>

            {CONNECTIONS.map((conn, idx) => {
              const fromNode = N8N_NODES.find((n) => n.id === conn.from)!;
              const toNode = N8N_NODES.find((n) => n.id === conn.to)!;

              // Compute approximate coordinates in percentage converted to curve
              const startX = fromNode.x + 4.5;
              const startY = fromNode.y;
              const endX = toNode.x - 4.5;
              const endY = toNode.y;

              const isCompleted =
                completedNodeIds.includes(conn.from) && completedNodeIds.includes(conn.to);
              const isActive = activeStep !== null && SIMULATION_SEQUENCE[activeStep] === conn.to;

              return (
                <g key={idx}>
                  {/* Background base wire */}
                  <path
                    d={`M ${startX}% ${startY}% C ${startX + (endX - startX) * 0.5}% ${startY}%, ${
                      endX - (endX - startX) * 0.5
                    }% ${endY}%, ${endX}% ${endY}%`}
                    fill="none"
                    stroke={conn.isSubNode ? "#3d3d52" : "#2e2e40"}
                    strokeWidth="2.5"
                    strokeDasharray={conn.isSubNode ? "4 4" : undefined}
                  />

                  {/* Flowing animated light wire */}
                  {(isCompleted || isActive) && (
                    <motion.path
                      d={`M ${startX}% ${startY}% C ${startX + (endX - startX) * 0.5}% ${startY}%, ${
                        endX - (endX - startX) * 0.5
                      }% ${endY}%, ${endX}% ${endY}%`}
                      fill="none"
                      stroke={conn.isSubNode ? "#d97757" : "url(#curve-gradient)"}
                      strokeWidth={isActive ? "3.5" : "2.5"}
                      strokeDasharray={conn.isSubNode ? "4 4" : undefined}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Render Nodes */}
          {N8N_NODES.map((node) => {
            const isTrigger = node.type === "trigger";
            const isSubNode = node.type === "sub-model";
            const isSelected = selectedNode.id === node.id;
            const isDone = completedNodeIds.includes(node.id);
            const isActive = activeStep !== null && SIMULATION_SEQUENCE[activeStep] === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute z-20 flex flex-col items-center group cursor-pointer transition-transform ${
                  isSubNode ? "w-28" : "w-36 sm:w-40"
                }`}
              >
                {/* Node Box */}
                <div
                  className={`relative flex items-center justify-center p-3 border transition-all ${
                    isTrigger
                      ? "rounded-l-full rounded-r-2xl pl-4 pr-3"
                      : isSubNode
                      ? "rounded-full w-14 h-14"
                      : "rounded-2xl w-full h-[62px]"
                  } ${
                    isSelected
                      ? "bg-[#232332] border-[#ea4b71] shadow-[0_0_20px_rgba(234,75,113,0.35)] scale-105"
                      : isActive
                      ? "bg-[#252538] border-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.5)] scale-105"
                      : isDone
                      ? "bg-[#1c1c28] border-emerald-500/60 shadow-[0_0_15px_rgba(62,207,142,0.2)]"
                      : "bg-[#1a1a24] hover:bg-[#20202e] border-[#2e2e42]"
                  }`}
                >
                  {/* Input Port (Left circle handle) */}
                  {node.inputHandle && !isSubNode && (
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#3d3d54] border border-[#5a5a78] group-hover:bg-[#ea4b71] transition-colors" />
                  )}

                  {/* Output Port (Right circle handle) */}
                  {node.outputHandle && !isSubNode && (
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#3d3d54] border border-[#5a5a78] group-hover:bg-[#ea4b71] transition-colors" />
                  )}

                  {/* Subnode Input Port (Top circle handle) */}
                  {isSubNode && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#d97757] border border-white/20" />
                  )}

                  {/* Node Icon */}
                  <div className="relative">
                    {renderNodeIcon(node.iconType)}
                    {/* Status Pill Badge */}
                    {isDone && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea4b71] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#ea4b71]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Node Title & Action Caption */}
                <div className="mt-2 text-center max-w-[150px]">
                  <p className="text-xs font-medium text-slate-200 truncate leading-tight group-hover:text-white">
                    {node.name}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                    {node.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Node Inspector Drawer */}
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 sm:p-5 border-t border-[#252533] bg-[#14141e] space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {renderNodeIcon(selectedNode.iconType)}
                  <div>
                    <h5 className="text-sm font-bold text-white">{selectedNode.name}</h5>
                    <p className="text-xs font-mono text-purple-400">{selectedNode.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {completedNodeIds.includes(selectedNode.id) ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Executed (200 OK)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-400">
                      <Clock className="w-3 h-3" />
                      Ready to Run
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedNode.details}
              </p>

              <div className="rounded-xl bg-[#0b0b10] border border-white/5 p-3 overflow-x-auto font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px] text-slate-500">
                  <span>Input / Output Data Payload</span>
                  <span>JSON / TypeScript</span>
                </div>
                <pre>
                  <code>{selectedNode.codeSnippet}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}

      {/* 2. Video Walkthrough Explanation Player Container */}
      {(viewMode === "video" || viewMode === "all") && (
        <div className="rounded-2xl border border-purple-500/30 bg-[#0c0c14] overflow-hidden p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-white">
                  Video Explicativo de la Arquitectura
                </h4>
                <p className="text-xs text-slate-400">
                  Walkthrough técnico paso a paso por Brayan Pulido
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 self-start sm:self-auto">
              ImageKit CDN Hosted
            </span>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black/80 border border-white/10 shadow-inner group">
            <video
              controls
              preload="metadata"
              poster="https://ik.imagekit.io/ns9uknww8b/Logo%20Wide%20Step.jpg"
              className="w-full h-full object-cover"
            >
              {/* Generic placeholder video URL from ImageKit */}
              <source
                src="https://ik.imagekit.io/ns9uknww8b/sample-video.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          <p className="text-xs text-slate-400 mt-3 text-center">
            Demostración del panel de administración, la conexión con webhooks de n8n, el doble blindaje UTF-8 y el proxy de previsualización sin CORS.
          </p>
        </div>
      )}
    </div>
  );
}

export default Pipeline;
