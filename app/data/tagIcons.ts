import type { ComponentType, CSSProperties } from "react";
import { FaFigma, FaPython, FaNodeJs, FaDiscord } from "react-icons/fa";
import { SiCanvas } from "react-icons/si";
import {
  PenTool,
  MousePointerClick,
  Workflow,
  Cpu,
  Wifi,
  Wind,
  Database,
  BarChart3,
  Layers,
  Radio,
  Tag,
} from "lucide-react";

type TagIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

const L = "#a78bfa";

export const tagIcons: Record<string, { icon: TagIcon; color: string }> = {
  Figma: { icon: FaFigma, color: "#F24E1E" },
  Canva: { icon: SiCanvas, color: "#00C4CC" },
  Wireframe: { icon: PenTool, color: L },
  Prototype: { icon: MousePointerClick, color: L },
  "User Flow": { icon: Workflow, color: L },
  "Raspberry Pi 5": { icon: Cpu, color: "#C51A4A" },
  Python: { icon: FaPython, color: "#4B8BBE" },
  "Node.js": { icon: FaNodeJs, color: "#68A063" },
  AQI: { icon: Wind, color: "#22c55e" },
  Database: { icon: Database, color: L },
  "Data Visualization": { icon: BarChart3, color: L },
  "Full-Stack": { icon: Layers, color: L },
  IoT: { icon: Wifi, color: L },
  Sensor: { icon: Radio, color: L },
  ESP32: { icon: Cpu, color: L },
  MQTT: { icon: Wifi, color: L },
  "Discord Webhook API": { icon: FaDiscord, color: "#5865F2" },
};

export const fallbackTag = { icon: Tag as TagIcon, color: L };