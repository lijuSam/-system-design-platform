'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Sparkles, 
  Plus, 
  Trash2, 
  Sliders, 
  DollarSign, 
  Gauge, 
  Activity, 
  Server, 
  Database, 
  Globe, 
  Cpu, 
  Radio, 
  Layers 
} from 'lucide-react';
import { SimulatorNode, SimulatorConnection, SimulationResult } from '@/types';
import { SIMULATOR_PRESETS, ArchitecturePreset } from '@/data/simulatorPresets';

export default function ArchitectureSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<ArchitecturePreset>(SIMULATOR_PRESETS[0]);
  const [nodes, setNodes] = useState<SimulatorNode[]>(SIMULATOR_PRESETS[0].nodes);
  const [connections, setConnections] = useState<SimulatorConnection[]>(SIMULATOR_PRESETS[0].connections);
  const [qps, setQps] = useState<number>(SIMULATOR_PRESETS[0].targetQps);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [evalResult, setEvalResult] = useState<SimulationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Evaluate whenever nodes, connections, or QPS change
  const runEvaluation = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/simulator/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, connections, qps })
      });
      const data = await res.json();
      if (data.success) {
        setEvalResult(data.data);
      }
    } catch {
      // fallback local calculation
    } finally {
      setIsEvaluating(false);
    }
  };

  useEffect(() => {
    runEvaluation();
  }, [nodes, connections, qps]);

  const handleSelectPreset = (preset: ArchitecturePreset) => {
    setSelectedPreset(preset);
    setNodes(preset.nodes);
    setConnections(preset.connections);
    setQps(preset.targetQps);
    setSelectedNodeId(null);
  };

  const handleUpdateRedundancy = (nodeId: string, delta: number) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          const nextVal = Math.max(1, (n.redundancy || 1) + delta);
          return { ...n, redundancy: nextVal };
        }
        return n;
      })
    );
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const getNodeIcon = (type: SimulatorNode['type']) => {
    switch (type) {
      case 'client': return Globe;
      case 'cdn': return Globe;
      case 'load_balancer': return Activity;
      case 'api_gateway': return Layers;
      case 'service': return Cpu;
      case 'cache': return Sparkles;
      case 'queue': return Radio;
      case 'database': return Database;
      case 'worker': return Server;
      default: return Server;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%'
      }}
    >
      {/* Top Controls Bar */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 24px'
        }}
      >
        {/* Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Preset Architectures:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SIMULATOR_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedPreset.id === p.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                  background: selectedPreset.id === p.id ? 'var(--accent-light)' : 'var(--bg-surface)',
                  color: selectedPreset.id === p.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Traffic QPS Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '280px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>
              Simulated Load
            </span>
            <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {qps.toLocaleString()} QPS
            </span>
          </div>
          <input
            type="range"
            min="2000"
            max="180000"
            step="2000"
            value={qps}
            onChange={(e) => setQps(Number(e.target.value))}
            style={{
              flex: 1,
              accentColor: 'var(--accent-primary)',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>

      {/* Real-Time Metrics Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {/* KPI 1: Latency */}
        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Gauge size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Est. E2E Latency
            </div>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: evalResult?.bottlenecks.length ? 'var(--accent-rose)' : 'var(--text-primary)' }}>
              {evalResult ? `${evalResult.estimatedLatencyMs} ms` : 'Calculating...'}
            </div>
          </div>
        </div>

        {/* KPI 2: Infrastructure Cost */}
        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-emerald-light)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <DollarSign size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Monthly Infra Cost
            </div>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {evalResult ? `$${evalResult.estimatedCostPerMonth.toLocaleString()} / mo` : 'Calculating...'}
            </div>
          </div>
        </div>

        {/* KPI 3: System Health */}
        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: evalResult?.status === 'optimal' 
                ? 'var(--accent-emerald-light)' 
                : evalResult?.status === 'warning' 
                ? 'var(--accent-amber-light)' 
                : 'var(--accent-rose-light)',
              color: evalResult?.status === 'optimal' 
                ? 'var(--accent-emerald)' 
                : evalResult?.status === 'warning' 
                ? 'var(--accent-amber)' 
                : 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {evalResult?.status === 'optimal' ? (
              <CheckCircle size={22} />
            ) : (
              <AlertTriangle size={22} />
            )}
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              System Health
            </div>
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                textTransform: 'capitalize',
                color: evalResult?.status === 'optimal' 
                  ? 'var(--accent-emerald)' 
                  : evalResult?.status === 'warning' 
                  ? 'var(--accent-amber)' 
                  : 'var(--accent-rose)'
              }}
            >
              {evalResult?.status === 'optimal' ? 'Optimal Architecture' : evalResult?.status === 'warning' ? 'Degraded / SPOF Risk' : 'Capacity Critical!'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Architecture Interactive Canvas */}
      <div
        className="card"
        style={{
          padding: '24px',
          position: 'relative',
          overflowX: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          minHeight: '440px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Live Architecture Topology & Request Flow
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            💡 Tip: Click any node to scale instances (+/-) or inspect latency metrics
          </span>
        </div>

        {/* Node Layout Canvas */}
        <div
          style={{
            position: 'relative',
            minWidth: '950px',
            height: '340px',
            background: 'radial-gradient(circle, var(--canvas-grid) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}
        >
          {/* Animated Connecting Lines SVG */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {connections.map((conn) => {
              const source = nodes.find((n) => n.id === conn.from);
              const target = nodes.find((n) => n.id === conn.to);
              if (!source || !target) return null;

              const x1 = source.x + 90;
              const y1 = source.y + 40;
              const x2 = target.x;
              const y2 = target.y + 40;
              const dx = (x2 - x1) * 0.5;

              return (
                <g key={conn.id}>
                  {/* Base path */}
                  <path
                    d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke="var(--border-medium)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Flowing animated packet */}
                  <path
                    d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="3"
                    strokeDasharray="8 12"
                    style={{
                      animation: 'dash 1.8s linear infinite'
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Render Interactive Nodes */}
          {nodes.map((node) => {
            const Icon = getNodeIcon(node.type);
            const isSelected = selectedNodeId === node.id;
            const effectiveCapacity = node.capacityQPS * (node.redundancy || 1);
            const isOverloaded = qps > effectiveCapacity;
            const isSpof = node.type !== 'client' && (node.redundancy || 1) <= 1;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: '180px',
                  backgroundColor: isSelected ? 'var(--bg-surface)' : 'var(--bg-surface)',
                  border: isSelected
                    ? '2px solid var(--accent-primary)'
                    : isOverloaded
                    ? '2px solid var(--accent-rose)'
                    : isSpof
                    ? '1.5px solid var(--accent-amber)'
                    : '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                  padding: '12px',
                  cursor: 'pointer',
                  zIndex: isSelected ? 20 : 10,
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Node Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-light)',
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {node.type.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Redundancy Count badge */}
                  {node.type !== 'client' && (
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        backgroundColor: node.redundancy > 1 ? 'var(--accent-emerald-light)' : 'var(--accent-amber-light)',
                        color: node.redundancy > 1 ? 'var(--accent-emerald)' : 'var(--accent-amber)'
                      }}
                    >
                      x{node.redundancy}
                    </span>
                  )}
                </div>

                {/* Node Name */}
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {node.name}
                </div>

                {/* Subtext info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  <span>{node.baseLatencyMs}ms lat</span>
                  <span style={{ color: isOverloaded ? 'var(--accent-rose)' : 'inherit', fontWeight: isOverloaded ? 700 : 500 }}>
                    {Math.round(effectiveCapacity / 1000)}k QPS
                  </span>
                </div>

                {/* Warning flags */}
                {isOverloaded && (
                  <div style={{ marginTop: '6px', fontSize: '0.6875rem', color: 'var(--accent-rose)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={12} />
                    <span>Bottlenecked!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details & Redundancy Scaler */}
      {selectedNode && selectedNode.type !== 'client' && (
        <div
          className="card"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            padding: '20px 24px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-border)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {selectedNode.name}
              </span>
              <span className="badge badge-blue">{selectedNode.type}</span>
              {selectedNode.technology && (
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ({selectedNode.technology})
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <span>Base Latency: <strong>{selectedNode.baseLatencyMs} ms</strong></span>
              <span>Unit Capacity: <strong>{selectedNode.capacityQPS.toLocaleString()} QPS</strong></span>
              <span>Unit Cost: <strong>${selectedNode.costPerMonth}/mo</strong></span>
            </div>
          </div>

          {/* Instance Redundancy Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Replica Fleet:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => handleUpdateRedundancy(selectedNode.id, -1)}
                disabled={selectedNode.redundancy <= 1}
                className="btn btn-secondary btn-sm"
                style={{ width: '32px', height: '32px', padding: 0 }}
              >
                -
              </button>
              <span
                style={{
                  minWidth: '40px',
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--text-primary)'
                }}
              >
                {selectedNode.redundancy}
              </span>
              <button
                onClick={() => handleUpdateRedundancy(selectedNode.id, 1)}
                className="btn btn-secondary btn-sm"
                style={{ width: '32px', height: '32px', padding: 0 }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warnings & Architectural Recommendations Panel */}
      {evalResult && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px'
          }}
        >
          {/* Bottlenecks & SPOFs */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldAlert size={18} style={{ color: evalResult.spofWarnings.length || evalResult.bottlenecks.length ? 'var(--accent-rose)' : 'var(--accent-emerald)' }} />
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>
                Failure Risk & Capacity Analysis
              </h4>
            </div>

            {evalResult.bottlenecks.length === 0 && evalResult.spofWarnings.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '0.875rem' }}>
                <CheckCircle size={16} />
                <span>Zero single points of failure. All nodes are scaled within safe operational margins.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {evalResult.bottlenecks.map((b, i) => (
                  <div
                    key={`b-${i}`}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--accent-rose-light)',
                      border: '1px solid rgba(244, 63, 94, 0.2)',
                      fontSize: '0.8125rem',
                      color: 'var(--accent-rose)',
                      lineHeight: 1.5
                    }}
                  >
                    🚨 {b}
                  </div>
                ))}
                {evalResult.spofWarnings.map((w, i) => (
                  <div
                    key={`w-${i}`}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--accent-amber-light)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      fontSize: '0.8125rem',
                      color: 'var(--accent-amber)',
                      lineHeight: 1.5
                    }}
                  >
                    ⚠️ {w}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Architectural Insights */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>
                Staff Architect Recommendations
              </h4>
            </div>

            {evalResult.recommendations.length === 0 ? (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Topology adheres to high-availability distributed architecture standards.
              </p>
            ) : (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '18px', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {evalResult.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>
    </div>
  );
}
