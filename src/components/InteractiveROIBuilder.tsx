import React, { useState, useEffect, useRef } from 'react';
import { 
  Megaphone, Video, Calendar, Heart, Sparkles, 
  Users, Smile, Briefcase, Terminal, Globe, 
  Share2, Rss, Mail, Laptop, Phone, 
  Play, Download, ThumbsUp, UserCheck, 
  Target, Eye, FileCheck, Coins, 
  ArrowRight, Check, X, Plus, Trash2, 
  Copy, ZoomIn, ZoomOut, Maximize2, 
  AlertCircle, HelpCircle, Sparkle, Link2, Info, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Animated Counter Component for premium numbers transitions
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 600; // fast but ultra-smooth transitions
    const startTime = performance.now();
    
    let animationFrameId: number;
    
    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeProgress;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);
  
  const formatted = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return <span>{prefix}{formatted}{suffix}</span>;
}

// Block Node Definitions
interface BlockDefinition {
  id: string;
  label: string;
  category: 'trigger' | 'audience' | 'channel' | 'action' | 'outcome';
  icon: React.ComponentType<any>;
  desc: string;
  color: string;
  badgeBg: string;
  borderCol: string;
  textCol: string;
}

const BLOCK_LIBRARY: BlockDefinition[] = [
  // Triggers
  { id: 'trigger-product_launch', label: 'Product Launch', category: 'trigger', icon: Megaphone, desc: 'Major release announcement with peak interest.', color: 'indigo', badgeBg: 'bg-primary-50 text-primary-700 border-primary-100', borderCol: 'border-primary-200', textCol: 'text-primary-600' },
  { id: 'trigger-webinar', label: 'Webinar', category: 'trigger', icon: Video, desc: 'Educational panel or live webinar demonstration.', color: 'indigo', badgeBg: 'bg-primary-50 text-primary-700 border-primary-100', borderCol: 'border-primary-200', textCol: 'text-primary-600' },
  { id: 'trigger-event', label: 'Event', category: 'trigger', icon: Calendar, desc: 'Global conference, community summit, or keynotes.', color: 'indigo', badgeBg: 'bg-primary-50 text-primary-700 border-primary-100', borderCol: 'border-primary-200', textCol: 'text-primary-600' },
  { id: 'trigger-csr', label: 'CSR Initiative', category: 'trigger', icon: Heart, desc: 'Environmental, social pledge, or foundation news.', color: 'indigo', badgeBg: 'bg-primary-50 text-primary-700 border-primary-100', borderCol: 'border-primary-200', textCol: 'text-primary-600' },
  { id: 'trigger-product_update', label: 'Product Update', category: 'trigger', icon: Sparkles, desc: 'Incremental cool feature additions or enhancements.', color: 'indigo', badgeBg: 'bg-primary-50 text-primary-700 border-primary-100', borderCol: 'border-primary-200', textCol: 'text-primary-600' },

  // Audience
  { id: 'audience-employees', label: 'Employees', category: 'audience', icon: Users, desc: 'Internal colleagues and staff amplification.', color: 'blue', badgeBg: 'bg-blue-50 text-blue-700 border-blue-100', borderCol: 'border-blue-150', textCol: 'text-blue-600' },
  { id: 'audience-customers', label: 'Customers', category: 'audience', icon: Smile, desc: 'Verified product advocates and premium users.', color: 'blue', badgeBg: 'bg-blue-50 text-blue-700 border-blue-100', borderCol: 'border-blue-150', textCol: 'text-blue-600' },
  { id: 'audience-partners', label: 'Partners', category: 'audience', icon: Briefcase, desc: 'Alliances, distributors, and reseller ecosystem.', color: 'blue', badgeBg: 'bg-blue-50 text-blue-700 border-blue-100', borderCol: 'border-blue-150', textCol: 'text-blue-600' },
  { id: 'audience-developers', label: 'Developers', category: 'audience', icon: Terminal, desc: 'Technical practitioners, engineers, and builders.', color: 'blue', badgeBg: 'bg-blue-50 text-blue-700 border-blue-100', borderCol: 'border-blue-150', textCol: 'text-blue-600' },
  { id: 'audience-community', label: 'Community', category: 'audience', icon: Globe, desc: 'Passionate brand circle, advocates, and champions.', color: 'blue', badgeBg: 'bg-blue-50 text-blue-700 border-blue-100', borderCol: 'border-blue-150', textCol: 'text-blue-600' },

  // Channels
  { id: 'channel-linkedin', label: 'LinkedIn Feed', category: 'channel', icon: Share2, desc: 'Reach premium professional network circles.', color: 'secondary', badgeBg: 'bg-secondary-50 text-secondary-700 border-secondary-100', borderCol: 'border-secondary-200', textCol: 'text-secondary-600' },
  { id: 'channel-twitter', label: 'Twitter / X', category: 'channel', icon: Rss, desc: 'Fast broadcast feeds and tech news updates.', color: 'secondary', badgeBg: 'bg-secondary-50 text-secondary-700 border-secondary-100', borderCol: 'border-secondary-200', textCol: 'text-secondary-600' },
  { id: 'channel-email', label: 'Direct Email', category: 'channel', icon: Mail, desc: 'Personal letters and direct forwarded highlights.', color: 'secondary', badgeBg: 'bg-secondary-50 text-secondary-700 border-secondary-100', borderCol: 'border-secondary-200', textCol: 'text-secondary-600' },
  { id: 'channel-slack', label: 'Slack & Teams', category: 'channel', icon: Laptop, desc: 'Broadcast straight inside corporate workspaces.', color: 'secondary', badgeBg: 'bg-secondary-50 text-secondary-700 border-secondary-100', borderCol: 'border-secondary-200', textCol: 'text-secondary-600' },
  { id: 'channel-whatsapp', label: 'WhatsApp', category: 'channel', icon: Phone, desc: 'Direct secure group chats and high-trust circles.', color: 'secondary', badgeBg: 'bg-secondary-50 text-secondary-700 border-secondary-100', borderCol: 'border-secondary-200', textCol: 'text-secondary-600' },

  // Actions
  { id: 'action-share', label: 'Share Content', category: 'action', icon: ThumbsUp, desc: 'Copy verified templates and post in one click.', color: 'teal', badgeBg: 'bg-teal-50 text-teal-700 border-teal-100', borderCol: 'border-teal-150', textCol: 'text-teal-600' },
  { id: 'action-register', label: 'Register Event', category: 'action', icon: UserCheck, desc: 'RSVP directly for corporate webinars or conferences.', color: 'teal', badgeBg: 'bg-teal-50 text-teal-700 border-teal-100', borderCol: 'border-teal-150', textCol: 'text-teal-600' },
  { id: 'action-download', label: 'Download Guide', category: 'action', icon: Download, desc: 'Access exclusive PDF playbooks and templates.', color: 'teal', badgeBg: 'bg-teal-50 text-teal-700 border-teal-100', borderCol: 'border-teal-150', textCol: 'text-teal-600' },
  { id: 'action-watch', label: 'Watch Demo', category: 'action', icon: Play, desc: 'Direct leads to high-converting interactive videos.', color: 'teal', badgeBg: 'bg-teal-50 text-teal-700 border-teal-100', borderCol: 'border-teal-150', textCol: 'text-teal-600' },

  // Outcomes
  { id: 'outcome-lead_gen', label: 'Lead Generation', category: 'outcome', icon: Target, desc: 'Feed targeted inbound accounts into sales CRM.', color: 'emerald', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', borderCol: 'border-emerald-150', textCol: 'text-emerald-600' },
  { id: 'outcome-awareness', label: 'Brand Awareness', category: 'outcome', icon: Eye, desc: 'Maximize organic impressions and overall reach.', color: 'emerald', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', borderCol: 'border-emerald-150', textCol: 'text-emerald-600' },
  { id: 'outcome-pipeline', label: 'Pipeline Influence', category: 'outcome', icon: Coins, desc: 'Directly attribute deal sizes to advocate shares.', color: 'emerald', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', borderCol: 'border-emerald-150', textCol: 'text-emerald-600' },
  { id: 'outcome-registration', label: 'Registrations', category: 'outcome', icon: FileCheck, desc: 'Boost attendee count and post-event nurture velocity.', color: 'emerald', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100', borderCol: 'border-emerald-150', textCol: 'text-emerald-600' },
];

interface NodeInstance {
  id: string;
  blockId: string;
  x: number;
  y: number;
}

interface Connection {
  id: string;
  fromId: string; // output node id
  toId: string;   // input node id
}

interface DraggingEndpoint {
  connectionId: string;
  type: 'from' | 'to';
  currentX: number;
  currentY: number;
}

export default function InteractiveROIBuilder() {
  // --- STATE ---
  const [nodes, setNodes] = useState<NodeInstance[]>([
    { id: 'node-1', blockId: 'trigger-product_launch', x: 80, y: 150 },
    { id: 'node-2', blockId: 'audience-employees', x: 330, y: 150 },
    { id: 'node-3', blockId: 'channel-linkedin', x: 580, y: 150 },
    { id: 'node-4', blockId: 'action-share', x: 830, y: 150 },
    { id: 'node-5', blockId: 'outcome-lead_gen', x: 1080, y: 150 }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { id: 'conn-1', fromId: 'node-1', toId: 'node-2' },
    { id: 'conn-2', fromId: 'node-2', toId: 'node-3' },
    { id: 'conn-3', fromId: 'node-3', toId: 'node-4' },
    { id: 'conn-4', fromId: 'node-4', toId: 'node-5' }
  ]);

  // UI view state
  const [zoom, setZoom] = useState<number>(0.95);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  
  // Premium category segmented tabs filter
  const [libraryTab, setLibraryTab] = useState<'all' | 'trigger' | 'audience' | 'channel' | 'action' | 'outcome'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Manual connecting state
  const [connectingFromId, setConnectingFromId] = useState<string | null>(null);

  // Dragging connection endpoint state
  const [draggingEndpoint, setDraggingEndpoint] = useState<DraggingEndpoint | null>(null);

  // Dragging state for nodes and workspace panning
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  // --- CAMERA CONTROL & SMART CAMERA AUTOMATION ---
  
  const handleZoomIn = () => setZoom(z => Math.min(1.3, z + 0.05));
  const handleZoomOut = () => setZoom(z => Math.max(0.6, z - 0.05));
  const handleResetView = () => {
    setZoom(0.95);
    setPan({ x: 20, y: 20 });
  };

  // Smart Camera: Auto-center and fit bounds of graph whenever nodes count changes (e.g., added/deleted)
  useEffect(() => {
    if (nodes.length === 0) return;

    // 1. Calculate bounding box of all nodes
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    nodes.forEach(n => {
      if (n.x < minX) minX = n.x;
      if (n.x + 210 > maxX) maxX = n.x + 210;
      if (n.y < minY) minY = n.y;
      if (n.y + 86 > maxY) maxY = n.y + 86;
    });

    // Add healthy padding
    const padding = 80;
    const graphWidth = maxX - minX + padding * 2;
    const graphHeight = maxY - minY + padding * 2;

    // Get viewport measurements
    const canvasWidth = canvasRef.current?.clientWidth || 700;
    const canvasHeight = canvasRef.current?.clientHeight || 600;

    // 2. Calculate optimal zoom factor (keeping bounds elegant)
    const zoomX = canvasWidth / graphWidth;
    const zoomY = canvasHeight / graphHeight;
    const idealZoom = Math.max(0.65, Math.min(1.0, Math.min(zoomX, zoomY)));

    // 3. Center graph center point in the viewport
    const graphCenterX = minX + (maxX - minX) / 2;
    const graphCenterY = minY + (maxY - minY) / 2;

    const targetPanX = canvasWidth / 2 - graphCenterX * idealZoom;
    const targetPanY = canvasHeight / 2 - graphCenterY * idealZoom;

    // Animate view (via standard React state transitions)
    setZoom(idealZoom);
    setPan({ x: targetPanX, y: targetPanY });
  }, [nodes.length]); // Triggers ONLY when nodes are added or removed to preserve active manual node dragging!

  // --- ACTIONS ---

  // Node spawning with Smart Auto-Layout & Auto-Connection
  const spawnNode = (blockId: string) => {
    const block = BLOCK_LIBRARY.find(b => b.id === blockId);
    if (!block) return;
    
    // 1. Determine lane coordinates (X) for clean grid visual placement
    let x = 80;
    if (block.category === 'audience') x = 330;
    else if (block.category === 'channel') x = 580;
    else if (block.category === 'action') x = 830;
    else if (block.category === 'outcome') x = 1080;

    // 2. Avoid overlaps by counting how many blocks of this category already exist
    const sameCategoryNodes = nodes.filter(n => {
      const b = BLOCK_LIBRARY.find(def => def.id === n.blockId);
      return b?.category === block.category;
    });

    // Vertical spacing: start at 150, stack down by 130px each to prevent overlapping
    const y = 150 + sameCategoryNodes.length * 130;

    const newNodeId = `node-${Date.now()}`;
    const newNode: NodeInstance = {
      id: newNodeId,
      blockId,
      x,
      y
    };

    // 3. INTELLIGENT AUTO-CONNECTION
    // Auto-connect to the previous logical predecessor or successor
    let newConnections: Connection[] = [];

    // Predecessor mapping: Trigger -> Audience -> Channel -> Action -> Outcome
    let predCategory: string | null = null;
    if (block.category === 'audience') predCategory = 'trigger';
    else if (block.category === 'channel') predCategory = 'audience';
    else if (block.category === 'action') predCategory = 'channel';
    else if (block.category === 'outcome') predCategory = 'action';

    if (predCategory) {
      const predNodes = nodes.filter(n => {
        const b = BLOCK_LIBRARY.find(def => def.id === n.blockId);
        return b?.category === predCategory;
      });
      if (predNodes.length > 0) {
        // Link from the most recently placed predecessor node to the new node
        const lastPred = predNodes[predNodes.length - 1];
        newConnections.push({
          id: `conn-${Date.now()}-pred`,
          fromId: lastPred.id,
          toId: newNodeId
        });
      }
    }

    // Successor mapping: Trigger -> Audience -> Channel -> Action -> Outcome
    let succCategory: string | null = null;
    if (block.category === 'trigger') succCategory = 'audience';
    else if (block.category === 'audience') succCategory = 'channel';
    else if (block.category === 'channel') succCategory = 'action';
    else if (block.category === 'action') succCategory = 'outcome';

    if (succCategory) {
      const succNodes = nodes.filter(n => {
        const b = BLOCK_LIBRARY.find(def => def.id === n.blockId);
        return b?.category === succCategory;
      });
      if (succNodes.length > 0) {
        // Find first successor node lacking any incoming connections, or default to the most recent
        const targetSucc = succNodes.find(n => !connections.some(c => c.toId === n.id)) || succNodes[succNodes.length - 1];
        newConnections.push({
          id: `conn-${Date.now()}-succ`,
          fromId: newNodeId,
          toId: targetSucc.id
        });
      }
    }

    setNodes(prev => [...prev, newNode]);
    if (newConnections.length > 0) {
      setConnections(prev => [...prev, ...newConnections]);
    }
    setSelectedNodeIds([newNodeId]);
  };

  const handleDuplicateNode = (node: NodeInstance) => {
    const newNodeId = `node-${Date.now()}`;
    const duplicated: NodeInstance = {
      id: newNodeId,
      blockId: node.blockId,
      x: node.x + 40,
      y: node.y + 40
    };
    setNodes(prev => [...prev, duplicated]);
    setSelectedNodeIds([newNodeId]);
  };

  const handleDeleteSelected = () => {
    if (selectedNodeIds.length > 0) {
      setNodes(prev => prev.filter(n => !selectedNodeIds.includes(n.id)));
      setConnections(prev => prev.filter(c => !selectedNodeIds.includes(c.fromId) && !selectedNodeIds.includes(c.toId)));
      setSelectedNodeIds([]);
    }
    if (selectedConnectionId) {
      setConnections(prev => prev.filter(c => c.id !== selectedConnectionId));
      setSelectedConnectionId(null);
    }
  };

  const handleCanvasBgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('dotted-grid')) {
      setSelectedNodeIds([]);
      setSelectedConnectionId(null);
      setConnectingFromId(null);
    }
  };

  // Node Input/Output Click Connections (fallback click mode)
  const handlePortClick = (nodeId: string, isOutput: boolean) => {
    if (isOutput) {
      setConnectingFromId(nodeId);
    } else {
      if (connectingFromId && connectingFromId !== nodeId) {
        const exists = connections.some(c => c.fromId === connectingFromId && c.toId === nodeId);
        if (!exists) {
          const newConn: Connection = {
            id: `conn-${Date.now()}`,
            fromId: connectingFromId,
            toId: nodeId
          };
          setConnections(prev => [...prev, newConn]);
        }
        setConnectingFromId(null);
      }
    }
  };

  // Draggable connection endpoint setup
  const handleEndpointMouseDown = (e: React.MouseEvent, connectionId: string, type: 'from' | 'to') => {
    e.stopPropagation();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    // Convert mouse coordinates to zoom-relative canvas coordinates
    const clickX = (e.clientX - canvasRect.left - pan.x) / zoom;
    const clickY = (e.clientY - canvasRect.top - pan.y) / zoom;

    setDraggingEndpoint({
      connectionId,
      type,
      currentX: clickX,
      currentY: clickY
    });
  };

  // Node Drag Handlers
  const handleNodeMouseDown = (e: React.MouseEvent, node: NodeInstance) => {
    e.stopPropagation();
    setSelectedNodeIds([node.id]);
    setSelectedConnectionId(null);
    setDraggingNodeId(node.id);
    setDragOffset({
      x: e.clientX - node.x * zoom,
      y: e.clientY - node.y * zoom
    });
  };

  // Workspace Panning
  const handleBgMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      });
    }
  };

  // Global mousemove and mouseup handles node dragging, canvas panning, and connection endpoint dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();

      if (draggingNodeId) {
        setNodes(prev => prev.map(n => {
          if (n.id === draggingNodeId) {
            const nx = Math.round((e.clientX - dragOffset.x) / zoom);
            const ny = Math.round((e.clientY - dragOffset.y) / zoom);
            return {
              ...n,
              x: Math.max(10, Math.min(1800, nx)),
              y: Math.max(10, Math.min(1200, ny))
            };
          }
          return n;
        }));
      } else if (draggingEndpoint && canvasRect) {
        // Update coordinates of dragging endpoint line
        const clickX = (e.clientX - canvasRect.left - pan.x) / zoom;
        const clickY = (e.clientY - canvasRect.top - pan.y) / zoom;
        setDraggingEndpoint(prev => prev ? {
          ...prev,
          currentX: clickX,
          currentY: clickY
        } : null);
      } else if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y
        });
      }
    };

    const handleGlobalMouseUp = () => {
      if (draggingEndpoint) {
        const { connectionId, type, currentX, currentY } = draggingEndpoint;
        
        // Find closest valid node port within snapping range
        let closestNodeId: string | null = null;
        let minDistance = 60; // snapping radius in pixels

        nodes.forEach(node => {
          // If we are dragging 'to' endpoint, snap to a node's left input port (node.x, node.y+43)
          // If dragging 'from' endpoint, snap to a node's right output port (node.x+210, node.y+43)
          const targetX = type === 'to' ? node.x : node.x + 210;
          const targetY = node.y + 43;
          const dist = Math.hypot(currentX - targetX, currentY - targetY);

          if (dist < minDistance) {
            minDistance = dist;
            closestNodeId = node.id;
          }
        });

        if (closestNodeId) {
          // Update the connection endpoints to snap onto the new target node
          setConnections(prev => prev.map(c => {
            if (c.id === connectionId) {
              return {
                ...c,
                fromId: type === 'from' ? closestNodeId! : c.fromId,
                toId: type === 'to' ? closestNodeId! : c.toId
              };
            }
            return c;
          }));
        } else {
          // Dropped in empty space: disconnect/remove connection entirely
          setConnections(prev => prev.filter(c => c.id !== connectionId));
          setSelectedConnectionId(null);
        }
        setDraggingEndpoint(null);
      }

      setDraggingNodeId(null);
      setIsPanning(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggingNodeId, dragOffset, isPanning, panStart, zoom, draggingEndpoint, nodes, pan]);

  // Key press listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
          return;
        }
        handleDeleteSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeIds, selectedConnectionId]);

  // --- SOLVER & ROI CALCULATION ---
  const compileActiveCampaigns = () => {
    const adj: Record<string, string[]> = {};
    nodes.forEach(n => { adj[n.id] = []; });
    connections.forEach(c => {
      if (adj[c.fromId]) {
        adj[c.fromId].push(c.toId);
      }
    });

    const triggerNodes = nodes.filter(n => {
      const block = BLOCK_LIBRARY.find(b => b.id === n.blockId);
      return block?.category === 'trigger';
    });

    const completedChains: BlockDefinition[][] = [];

    const explore = (nodeId: string, currentChain: BlockDefinition[]) => {
      const node = nodes.find(n => n.id === nodeId);
      const block = BLOCK_LIBRARY.find(b => b.id === node?.blockId);
      if (!block) return;

      const updatedChain = [...currentChain, block];

      if (block.category === 'outcome') {
        completedChains.push(updatedChain);
        return;
      }

      const nextNodeIds = adj[nodeId] || [];
      if (nextNodeIds.length === 0) {
        completedChains.push(updatedChain);
        return;
      }

      nextNodeIds.forEach(nxt => {
        explore(nxt, updatedChain);
      });
    };

    triggerNodes.forEach(tNode => {
      explore(tNode.id, []);
    });

    if (completedChains.length === 0 && nodes.length > 0) {
      const allActiveBlocks = nodes.map(n => BLOCK_LIBRARY.find(b => b.id === n.blockId)).filter(Boolean) as BlockDefinition[];
      return [allActiveBlocks];
    }

    return completedChains;
  };

  const activeChains = compileActiveCampaigns();

  const calculateAggregateMetrics = () => {
    let totalReach = 0;
    let totalShares = 0;
    let totalLeads = 0;
    let totalSpendSaved = 0;
    let totalRevenue = 0;

    activeChains.forEach(chain => {
      const trigger = chain.find(b => b.category === 'trigger');
      const audience = chain.find(b => b.category === 'audience');
      const channel = chain.find(b => b.category === 'channel');
      const action = chain.find(b => b.category === 'action');
      const outcome = chain.find(b => b.category === 'outcome');

      let baseReach = 15000;
      let advocateCount = 100;
      if (audience) {
        if (audience.id === 'audience-employees') { baseReach = 55000; advocateCount = 150; }
        else if (audience.id === 'audience-customers') { baseReach = 75000; advocateCount = 420; }
        else if (audience.id === 'audience-partners') { baseReach = 120000; advocateCount = 80; }
        else if (audience.id === 'audience-developers') { baseReach = 38000; advocateCount = 120; }
        else if (audience.id === 'audience-community') { baseReach = 95000; advocateCount = 550; }
      }

      let triggerMult = 1.0;
      let triggerEng = 1.0;
      if (trigger) {
        if (trigger.id === 'trigger-product_launch') { triggerMult = 1.9; triggerEng = 1.7; }
        else if (trigger.id === 'trigger-webinar') { triggerMult = 1.25; triggerEng = 1.2; }
        else if (trigger.id === 'trigger-event') { triggerMult = 1.6; triggerEng = 1.35; }
        else if (trigger.id === 'trigger-csr') { triggerMult = 1.45; triggerEng = 1.65; }
        else if (trigger.id === 'trigger-product_update') { triggerMult = 1.15; triggerEng = 1.3; }
      }

      let channelMult = 1.0;
      let channelCtr = 0.045;
      let clickCPC = 3.50;
      if (channel) {
        if (channel.id === 'channel-linkedin') { channelMult = 1.4; channelCtr = 0.054; clickCPC = 4.40; }
        else if (channel.id === 'channel-twitter') { channelMult = 1.7; channelCtr = 0.028; clickCPC = 2.50; }
        else if (channel.id === 'channel-email') { channelMult = 0.85; channelCtr = 0.078; clickCPC = 3.90; }
        else if (channel.id === 'channel-slack') { channelMult = 0.65; channelCtr = 0.155; clickCPC = 5.20; }
        else if (channel.id === 'channel-whatsapp') { channelMult = 0.75; channelCtr = 0.125; clickCPC = 4.10; }
      }

      let actionConv = 0.06;
      let valueMultiplier = 1.0;
      if (action) {
        if (action.id === 'action-share') { actionConv = 0.058; valueMultiplier = 1.15; }
        else if (action.id === 'action-register') { actionConv = 0.152; valueMultiplier = 1.6; }
        else if (action.id === 'action-download') { actionConv = 0.098; valueMultiplier = 0.95; }
        else if (action.id === 'action-watch') { actionConv = 0.082; valueMultiplier = 1.3; }
      }

      let outcomeReachMult = 1.0;
      let outcomeConvMult = 1.0;
      let outcomeValueMult = 1.0;
      if (outcome) {
        if (outcome.id === 'outcome-awareness') { outcomeReachMult = 1.5; }
        else if (outcome.id === 'outcome-registration') { outcomeConvMult = 1.4; }
        else if (outcome.id === 'outcome-lead_gen') { outcomeConvMult = 1.65; }
        else if (outcome.id === 'outcome-pipeline') { outcomeValueMult = 1.75; }
      }

      const chainReach = Math.round(baseReach * triggerMult * channelMult * outcomeReachMult);
      const chainShares = Math.round(advocateCount * triggerEng * channelMult * 2.4);
      const expectedClicks = Math.round(chainReach * channelCtr * triggerEng);
      const chainLeads = Math.round(expectedClicks * actionConv * outcomeConvMult);
      
      const chainCPCValue = Math.round(expectedClicks * clickCPC);
      const chainRevenue = Math.round(chainLeads * 120 * valueMultiplier * outcomeValueMult);

      totalReach += chainReach;
      totalShares += chainShares;
      totalLeads += chainLeads;
      totalSpendSaved += chainCPCValue;
      totalRevenue += chainRevenue;
    });

    if (nodes.length === 0) {
      return { reach: 0, shares: 0, leads: 0, spendSaved: 0, revenue: 0, roi: 0 };
    }

    const calculatedROI = totalRevenue > 0 ? Math.round((totalRevenue / 1500) * 100) : 120;

    return {
      reach: totalReach || 5000,
      shares: totalShares || 25,
      leads: totalLeads || 40,
      spendSaved: totalSpendSaved || 2500,
      revenue: totalRevenue || 18000,
      roi: calculatedROI
    };
  };

  const metrics = calculateAggregateMetrics();

  const getDynamicAIInsight = () => {
    if (nodes.length === 0) {
      return "Your canvas is currently offline. Select card blocks from the Strategy Components panel on the left to spawn them onto the board, then connect them to see live strategic feedback.";
    }

    const triggerNode = nodes.find(n => BLOCK_LIBRARY.find(b => b.id === n.blockId)?.category === 'trigger');
    const audienceNode = nodes.find(n => BLOCK_LIBRARY.find(b => b.id === n.blockId)?.category === 'audience');
    const channelNode = nodes.find(n => BLOCK_LIBRARY.find(b => b.id === n.blockId)?.category === 'channel');

    const triggerLabel = BLOCK_LIBRARY.find(b => b.id === triggerNode?.blockId)?.label || 'Product Launch';
    const audienceLabel = BLOCK_LIBRARY.find(b => b.id === audienceNode?.blockId)?.label || 'Employees';
    const channelLabel = BLOCK_LIBRARY.find(b => b.id === channelNode?.blockId)?.label || 'LinkedIn Feed';

    if (audienceNode?.blockId === 'audience-employees' && channelNode?.blockId === 'channel-linkedin') {
      return `Adding Employees before LinkedIn Feed increases authenticity and expands first-degree reach. This configuration is estimated to generate 42% more engagement than publishing directly through brand-owned channels, saving approximately $${(metrics.spendSaved / 1000).toFixed(1)}K monthly in paid ads.`;
    }
    if (audienceNode?.blockId === 'audience-customers') {
      return `Activating premium ${audienceLabel} transforms passive retention into viral advocacy loops. Based on your active distribution, Wozku estimates customer recommendations gain up to 9.2× higher initial reply density than typical corporate feeds, driving a projected ROI of ${metrics.roi}%.`;
    }
    if (channelNode?.blockId === 'channel-slack' || channelNode?.blockId === 'channel-email') {
      return `Deploying advocacy shares directly inside private channels like ${channelLabel} bypasses algorithmic feed penalties. These high-trust channels enjoy a stellar ${((metrics.leads / (metrics.reach || 1)) * 100).toFixed(1)}% conversion velocity, shielding your marketing budget from rising programmatic ad costs.`;
    }

    return `By establishing this decentralized strategy path during your ${triggerLabel}, Wozku projects a significant decrease in paid customer acquisition cost (CAC). Your custom combination of audience-led advocacy channels turns active stakeholders into high-converting organic distribution media, bypassing competitive paid networks to save approximately $${(metrics.spendSaved / 1000).toFixed(0)}K monthly.`;
  };

  // --- FILTERED BLOCK LIBRARY ---
  const filteredBlocks = BLOCK_LIBRARY.filter(block => {
    const matchesTab = libraryTab === 'all' || block.category === libraryTab;
    const matchesQuery = block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         block.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const CATEGORIES = [
    { id: 'all', label: 'All Blocks', icon: Sparkles, count: BLOCK_LIBRARY.length },
    { id: 'trigger', label: '⚡ Event / Update', icon: Megaphone, count: BLOCK_LIBRARY.filter(b => b.category === 'trigger').length },
    { id: 'audience', label: '👥 People Sharing', icon: Users, count: BLOCK_LIBRARY.filter(b => b.category === 'audience').length },
    { id: 'channel', label: '📢 Where They Share', icon: Share2, count: BLOCK_LIBRARY.filter(b => b.category === 'channel').length },
    { id: 'action', label: '🎯 Action Taken', icon: ThumbsUp, count: BLOCK_LIBRARY.filter(b => b.category === 'action').length },
    { id: 'outcome', label: '📈 Result', icon: Target, count: BLOCK_LIBRARY.filter(b => b.category === 'outcome').length },
  ] as const;

  return (
    <div id="interactive-roi-engine" className="w-full bg-white border border-neutral-150 rounded-[2.5rem] p-5 sm:p-8 lg:p-10 space-y-8 shadow-sm relative overflow-hidden">
      
      {/* Visual Header */}
      <div id="roi-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
        <div>
          <h3 className="font-display font-extrabold text-neutral-900 text-3xl tracking-tight">
            Referral Strategy Workspace
          </h3>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
            Connect blocks below to see how sharing flows from templates to business results in real-time.
          </p>
        </div>

        {/* Info Indicator */}
        <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-150 rounded-2xl p-3 text-xs text-neutral-600">
          <HelpCircle className="h-4 w-4 text-primary-600 shrink-0" />
          <div>
            <span className="font-semibold text-neutral-900 block">Workspace Controls</span>
            <span className="text-[11px] text-neutral-500">
              Select any link line to edit or <strong className="text-neutral-800">drag endpoints</strong> to reconnect nodes.
            </span>
          </div>
        </div>
      </div>

      {/* ================= TOP ROW: STRATEGY COMPONENTS LIBRARY ================= */}
      <div className="bg-neutral-50/75 border border-neutral-150 rounded-3xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkle className="h-3.5 w-3.5 text-primary-500 animate-pulse" />
              Strategy Components Library
            </h4>
            <p className="text-[11px] text-neutral-400">
              Select key templates below to spawn nodes in the workspace. The engine automatically connects compatible building blocks.
            </p>
          </div>

          {/* Quick Search & Category Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick Search */}
            <div className="relative w-full sm:w-60 shrink-0">
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-neutral-200 rounded-xl bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow placeholder:text-neutral-400"
              />
              {searchQuery ? (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>

            {/* Premium Category Filter Pills */}
            <div className="flex flex-wrap gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200/50">
              {CATEGORIES.map((cat) => {
                const isActive = libraryTab === cat.id;
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setLibraryTab(cat.id)}
                    className="relative flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-all focus:outline-none group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryTab"
                        className="absolute inset-0 bg-white rounded-md shadow-2xs border border-neutral-200"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-1 ${isActive ? 'text-primary-600 font-bold' : 'text-neutral-500 group-hover:text-neutral-800'}`}>
                      <IconComp className="h-3 w-3 shrink-0" />
                      {cat.label.replace(/⚡\s|👥\s|📢\s|🎯\s|📈\s/, '')}
                    </span>
                    <span className={`relative z-10 text-[9px] px-1 rounded-sm font-mono ${isActive ? 'bg-primary-50 text-primary-700 font-bold' : 'bg-neutral-200/70 text-neutral-600'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal Track of Available Blocks */}
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin snap-x">
          <AnimatePresence mode="popLayout">
            {filteredBlocks.map((block) => {
              const IconComp = block.icon;
              return (
                <motion.button
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={block.id}
                  onClick={() => spawnNode(block.id)}
                  className="min-w-[170px] max-w-[200px] snap-start bg-white hover:bg-neutral-50/50 border border-neutral-150 rounded-2xl p-3 text-left transition-all duration-200 group hover:shadow-2xs hover:border-primary-200 relative flex flex-col justify-between min-h-[90px] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center border shrink-0 ${block.badgeBg}`}>
                      <IconComp className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-neutral-900 truncate block group-hover:text-primary-600">
                        {block.label}
                      </span>
                      <span className="text-[9px] text-neutral-400 font-mono tracking-wider block uppercase">
                        {block.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-2 leading-snug line-clamp-2">
                    {block.desc}
                  </p>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= MIDDLE ROW: CANVAS & PROJECTIONS SIDEBAR ================= */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* ================= LEFT SIDE: INTERACTIVE STRATEGY CANVAS ================= */}
        <div className="flex-1 min-w-0 flex flex-col space-y-3 h-[600px]">
          
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Interactive Strategy Canvas
              </h4>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-mono">
                Scale: {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-150 p-1.5 rounded-xl z-20">
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-white rounded-lg text-neutral-600 hover:text-neutral-900 cursor-pointer shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-white rounded-lg text-neutral-600 hover:text-neutral-900 cursor-pointer shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={handleResetView}
                className="p-1.5 hover:bg-white rounded-lg text-neutral-600 hover:text-neutral-900 cursor-pointer shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
                title="Fit View"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <div className="w-px h-4 bg-neutral-200 mx-1" />
              <button
                onClick={() => {
                  setNodes([]);
                  setConnections([]);
                  setSelectedNodeIds([]);
                }}
                className="p-1.5 hover:bg-white rounded-lg text-red-500 hover:text-red-700 cursor-pointer shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500"
                title="Clear Workspace"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* INFINITE CANVAS viewport container */}
          <div
            ref={canvasRef}
            onClick={handleCanvasBgClick}
            onMouseDown={handleBgMouseDown}
            className={`flex-1 border border-neutral-150 rounded-[2.2rem] bg-[#fafafb] overflow-hidden relative shadow-inner select-none ${
              isPanning ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Zoomed/Panned Container */}
            <div
              className="absolute inset-0 dotted-grid origin-top-left"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                width: '2400px',
                height: '2400px',
                backgroundImage: 'radial-gradient(var(--canvas-dot-color, #e4e4e7) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
                ['--canvas-dot-color' as any]: 'color-mix(in srgb, var(--bg-white) 75%, var(--primary-500) 12%)',
              }}
              onClick={handleCanvasBgClick}
            >
              
              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full">
                <defs>
                  <linearGradient id="selectedGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'var(--primary-600)' }} />
                    <stop offset="100%" style={{ stopColor: 'var(--primary-400)' }} />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" style={{ fill: 'var(--primary-400)' }} />
                  </marker>
                </defs>

                {connections.map((conn) => {
                  const fromNode = nodes.find(n => n.id === conn.fromId);
                  const toNode = nodes.find(n => n.id === conn.toId);

                  if (!fromNode || !toNode) return null;

                  // Output right port coordinate & Input left port coordinate
                  const x1 = fromNode.x + 210;
                  const y1 = fromNode.y + 43;

                  const x2 = toNode.x;
                  const y2 = toNode.y + 43;

                  const isSelected = selectedConnectionId === conn.id;
                  const isThisEndpointDragging = draggingEndpoint?.connectionId === conn.id;

                  // Hide static line if its endpoint is currently being dragged
                  if (isThisEndpointDragging) return null;

                  return (
                    <g key={conn.id} className="pointer-events-auto cursor-pointer">
                      {/* Thick invisible click trigger target path */}
                      <path
                        d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="20"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedConnectionId(conn.id);
                          setSelectedNodeIds([]);
                        }}
                      />
                      
                      {/* Render elegant bezier connection with shadow */}
                      <path
                        d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                        fill="none"
                        style={{ stroke: isSelected ? 'url(#selectedGlow)' : 'var(--neutral-200)' }}
                        strokeWidth={isSelected ? '4' : '2.5'}
                        className="transition-all duration-200"
                      />

                      {/* Glowing flow dots micro-interaction */}
                      <path
                        d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                        fill="none"
                        style={{ stroke: isSelected ? 'var(--primary-500)' : 'var(--primary-300)', strokeDashoffset: 100, animation: 'dash 3s linear infinite' }}
                        strokeWidth="2"
                        strokeDasharray="8, 12"
                        className="animate-dash-flow opacity-80"
                      />

                      {/* Draggable Endpoint circles displayed if link selected */}
                      {isSelected && (
                        <g>
                          <circle
                            cx={x1}
                            cy={y1}
                            r={7}
                            style={{ fill: 'var(--primary-600)' }}
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="cursor-ew-resize hover:scale-125 transition-transform"
                            onMouseDown={(e) => handleEndpointMouseDown(e, conn.id, 'from')}
                            title="Drag start to reconnect"
                          />
                          <circle
                            cx={x2}
                            cy={y2}
                            r={7}
                            style={{ fill: 'var(--primary-600)' }}
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="cursor-ew-resize hover:scale-125 transition-transform"
                            onMouseDown={(e) => handleEndpointMouseDown(e, conn.id, 'to')}
                            title="Drag end to reconnect"
                          />
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* DYNAMIC ENDPOINT DRAGGING CURVE */}
                {draggingEndpoint && (() => {
                  const conn = connections.find(c => c.id === draggingEndpoint.connectionId);
                  if (!conn) return null;

                  const fromNode = nodes.find(n => n.id === conn.fromId);
                  const toNode = nodes.find(n => n.id === conn.toId);

                  let x1 = 0, y1 = 0, x2 = 0, y2 = 0;

                  if (draggingEndpoint.type === 'to') {
                    // Dragging the target endpoint: from port is static, to is dragging coordinate
                    if (!fromNode) return null;
                    x1 = fromNode.x + 210;
                    y1 = fromNode.y + 43;
                    x2 = draggingEndpoint.currentX;
                    y2 = draggingEndpoint.currentY;
                  } else {
                    // Dragging the source endpoint: to port is static, from is dragging coordinate
                    if (!toNode) return null;
                    x1 = draggingEndpoint.currentX;
                    y1 = draggingEndpoint.currentY;
                    x2 = toNode.x;
                    y2 = toNode.y + 43;
                  }

                  return (
                    <path
                      d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                      fill="none"
                      style={{ stroke: 'var(--primary-600)' }}
                      strokeWidth="3"
                      strokeDasharray="4 4"
                      className="opacity-90"
                    />
                  );
                })()}
              </svg>

              {/* NODE CARDS */}
              <AnimatePresence>
                {nodes.map((node) => {
                  const block = BLOCK_LIBRARY.find(b => b.id === node.blockId);
                  if (!block) return null;

                  const IconComp = block.icon;
                  const isSelected = selectedNodeIds.includes(node.id);
                  const isConnectingSrc = connectingFromId === node.id;
                  const isDragging = draggingNodeId === node.id;

                  // Visual target snapping indicators helper:
                  let showTargetPulse = false;
                  if (connectingFromId && connectingFromId !== node.id) {
                    const srcNode = nodes.find(n => n.id === connectingFromId);
                    const srcBlock = BLOCK_LIBRARY.find(b => b.id === srcNode?.blockId);
                    if (srcBlock) {
                      if (srcBlock.category === 'trigger' && block.category === 'audience') showTargetPulse = true;
                      if (srcBlock.category === 'audience' && block.category === 'channel') showTargetPulse = true;
                      if (srcBlock.category === 'channel' && block.category === 'action') showTargetPulse = true;
                      if (srcBlock.category === 'action' && block.category === 'outcome') showTargetPulse = true;
                    }
                  }

                  return (
                    <div
                      key={node.id}
                      className={`absolute rounded-2xl bg-white border p-3.5 flex flex-col justify-between w-[210px] min-h-[86px] transition-all cursor-grab select-none ${
                        isDragging 
                          ? 'scale-105 -translate-y-1 shadow-2xl z-50 border-primary-500 ring-2 ring-primary-500/15'
                          : isSelected 
                          ? 'border-primary-600 ring-2 ring-primary-600/10 shadow-lg' 
                          : isConnectingSrc 
                          ? 'border-primary-400 ring-1 ring-primary-400/20 shadow-md'
                          : showTargetPulse
                          ? 'border-primary-500 ring-4 ring-primary-500/15 animate-pulse shadow-md'
                          : 'border-neutral-200 hover:border-neutral-300 hover:-translate-y-0.5 shadow-xs hover:shadow-sm'
                      }`}
                      style={{
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                      }}
                      onMouseDown={(e) => handleNodeMouseDown(e, node)}
                    >
                      {/* Left Port Input Dot */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePortClick(node.id, false);
                        }}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-4 w-4 rounded-full border bg-white flex items-center justify-center cursor-pointer group/port ${
                          showTargetPulse 
                            ? 'border-primary-600 bg-primary-50 scale-125'
                            : 'border-neutral-300 hover:border-primary-500 hover:scale-110'
                        }`}
                        title="Connect target here"
                      >
                        <span className={`h-2 w-2 rounded-full ${showTargetPulse ? 'bg-primary-600 animate-ping' : 'bg-neutral-400 group-hover/port:bg-primary-600'}`} />
                      </div>

                      {/* Node Header Row */}
                      <div className="flex items-start gap-2.5">
                        <div className={`h-7.5 w-7.5 rounded-lg flex items-center justify-center border shrink-0 ${block.badgeBg}`}>
                          <IconComp className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-extrabold text-neutral-900 block leading-tight truncate">
                            {block.label}
                          </span>
                          <span className="text-[9px] font-mono uppercase font-bold text-neutral-400 block tracking-wider mt-0.5">
                            {block.category}
                          </span>
                        </div>
                      </div>

                      {/* Block Short Description */}
                      <p className="text-[10px] text-neutral-400 leading-normal mt-2">
                        {block.desc}
                      </p>

                      {/* Selection visual utility control footer */}
                      {isSelected && (
                        <div className="flex items-center justify-end gap-1.5 mt-2 pt-2 border-t border-neutral-100">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateNode(node);
                            }}
                            className="p-1 hover:bg-neutral-50 rounded text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
                            title="Duplicate block"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNodes(prev => prev.filter(n => n.id !== node.id));
                              setConnections(prev => prev.filter(c => c.fromId !== node.id && c.toId !== node.id));
                              setSelectedNodeIds([]);
                            }}
                            className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                            title="Delete block"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}

                      {/* Right Port Output Dot */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePortClick(node.id, true);
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-4 w-4 rounded-full border bg-white flex items-center justify-center cursor-pointer group/port border-neutral-300 hover:border-primary-500 hover:scale-110"
                        title="Link to predecessor"
                      >
                        <span className="h-2 w-2 bg-neutral-400 group-hover/port:bg-primary-600 rounded-full" />
                      </div>

                    </div>
                  );
                })}
              </AnimatePresence>

            </div>

            {/* Connect Mode Top status helper */}
            {connectingFromId && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-30">
                <Sparkle className="h-4 w-4 animate-spin" style={{ animationDuration: '3.5s' }} />
                <span>Manual Link Active: Click target handle port to link nodes</span>
                <button
                  onClick={() => setConnectingFromId(null)}
                  className="hover:bg-white/10 rounded-full p-0.5 ml-1.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Empty Canvas Instructions Layer */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none bg-neutral-50/25">
                <HelpCircle className="h-12 w-12 text-neutral-300 mb-2 animate-pulse" />
                <h5 className="font-display font-bold text-neutral-800 text-base">Workspace Offline</h5>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm leading-relaxed">
                  Click block cards from the horizontal templates above to spawn strategy nodes instantly. They will layout and connect themselves.
                </p>
              </div>
            )}

          </div>

          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest text-center mt-1">
            Grid Canvas Engine • Double-click connections or nodes to focus • Press Del or Backspace to delete selections
          </span>
        </div>

        {/* ================= RIGHT SIDE: STICKY REAL-TIME PROJECTIONS SIDEBAR ================= */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 bg-white border border-neutral-200 rounded-[2rem] p-5 space-y-4 flex flex-col justify-between h-[600px] overflow-y-auto shadow-xs">
          
          <div className="space-y-4 flex-1">
            
            {/* Header section with live signal indicator */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-[10px] font-mono tracking-wider font-extrabold text-neutral-400 uppercase flex items-center gap-1.5">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Real-Time Projections
              </span>
              <span className="text-[10px] text-neutral-400 font-mono bg-neutral-100 px-2 py-0.5 rounded">
                Live Simulator
              </span>
            </div>

            {/* Equivalent Paid Spend Saved Banner */}
            <div className="bg-primary-600 text-white rounded-2xl p-4 text-center shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-primary-200 block font-bold relative z-10">
                Organic Traffic Equivalent
              </span>
              <div className="text-2xl font-display font-black tracking-tight mt-1.5 relative z-10">
                <AnimatedNumber value={metrics.spendSaved} prefix="$" suffix="/mo" />
              </div>
            </div>

            {/* Core Metrics list layout */}
            <div className="space-y-2.5 pt-1">
              
              <div className="flex justify-between items-center bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 font-mono block uppercase">ESTIMATED REACH</span>
                  <span className="text-[11px] font-bold text-neutral-700 block leading-tight">Aggregate reach</span>
                </div>
                <span className="font-mono text-sm font-black text-neutral-900">
                  <AnimatedNumber value={metrics.reach} />
                </span>
              </div>

              <div className="flex justify-between items-center bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 font-mono block uppercase">ADVOCATE SHARES</span>
                  <span className="text-[11px] font-bold text-neutral-700 block leading-tight">Estimated interactions</span>
                </div>
                <span className="font-mono text-sm font-bold text-neutral-800">
                  <AnimatedNumber value={metrics.shares} />
                </span>
              </div>

              <div className="flex justify-between items-center bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 font-mono block uppercase">QUALIFIED LEADS</span>
                  <span className="text-[11px] font-bold text-neutral-700 block leading-tight">Projected MQL count</span>
                </div>
                <span className="font-mono text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md border border-primary-100">
                  <AnimatedNumber value={metrics.leads} />
                </span>
              </div>

              <div className="flex justify-between items-center bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 font-mono block uppercase">PROJECTED REVENUE</span>
                  <span className="text-[11px] font-bold text-neutral-700 block leading-tight">Estimated ROI revenue</span>
                </div>
                <span className="font-mono text-sm font-black text-neutral-900">
                  <AnimatedNumber value={metrics.revenue} prefix="$" />
                </span>
              </div>

              <div className="flex justify-between items-center bg-neutral-50 border border-neutral-100 rounded-xl p-2.5">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-neutral-400 font-mono block uppercase">ESTIMATED ROI</span>
                  <span className="text-[11px] font-bold text-neutral-700 block leading-tight">Percent performance</span>
                </div>
                <span className="font-mono text-sm font-black text-emerald-600">
                  <AnimatedNumber value={metrics.roi} suffix="%" />
                </span>
              </div>

            </div>

            {/* Strategy Paths listing */}
            {activeChains.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                  Active Strategy Paths ({activeChains.length})
                </span>
                <div className="max-h-[85px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                  {activeChains.map((chain, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-150 p-2 rounded-xl text-[9px] text-neutral-600 font-mono leading-none">
                      <span className="bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded text-[8px] font-bold shrink-0">Path {idx + 1}</span>
                      <span className="truncate flex-1">
                        {chain.map(b => b.label).join(' → ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ================= BOTTOM ROW: AI STRATEGY INSIGHTS ================= */}
      <div className="border border-primary-100/80 rounded-3xl p-6 bg-primary-50/30 relative overflow-hidden shadow-2xs">
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary-500/5 blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary-100/40">
          <Sparkles className="h-4.5 w-4.5 text-primary-600 animate-pulse shrink-0" />
          <span className="text-xs font-mono font-extrabold text-primary-900 uppercase tracking-widest">
            Wozku Strategy Copilot • Live AI Strategy Insights
          </span>
          <span className="text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-semibold ml-auto">
            Instant Analysis
          </span>
        </div>

        {/* Smooth dynamic feedback block */}
        <motion.div 
          key={getDynamicAIInsight()}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-sm text-neutral-600 leading-relaxed font-normal"
        >
          "{getDynamicAIInsight()}"
        </motion.div>
      </div>

    </div>
  );
}
