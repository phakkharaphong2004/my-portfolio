import type { L } from "../components/LangProvider";

export type ProjectLink = {
  label: L;
  url: string;
  type: "video" | "pdf" | "link";
};

export type Project = {
  title: string;
  year: string;
  category: string;
  description: L;
  role?: L;
  highlights?: L[];
  details?: L;
  gallery?: string[];
  links?: ProjectLink[];
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "SPUFOOD",
    year: "2026",
    category: "UX/UI Design",
    description: {
      th: "ออกแบบ UX/UI ของแอปพลิเคชัน SPUFOOD ตั้งแต่ต้นจนจบ เน้นความง่ายในการใช้งานและสอดคล้องกับเป้าหมายของระบบ",
      en: "End-to-end UX/UI design of the SPUFOOD application, focused on ease of use and alignment with the system's goals.",
      zh: "从头到尾负责 SPUFOOD 应用的 UX/UI 设计，注重易用性，并与系统目标保持一致。",
    },
    role: {
      th: "UX/UI Designer",
      en: "UX/UI Designer",
      zh: "UX/UI 设计师",
    },
    highlights: [
      {
        th: "สร้าง wireframe และ prototype เพื่อออกแบบหน้าจอและ user flow ก่อนส่งต่อให้ทีมพัฒนา",
        en: "Created wireframes and prototypes to design screens and user flows before handing off to the development team.",
        zh: "制作线框图和原型，设计界面与用户流程，再交付给开发团队。",
      },
      {
        th: "ทำงานร่วมกับทีม Front-end อย่างใกล้ชิดเพื่อให้การพัฒนาตรงตามดีไซน์ที่ออกแบบไว้",
        en: "Worked closely with the front-end team so the implementation matched the design.",
        zh: "与前端团队紧密合作，确保开发成果与设计一致。",
      },
    ],
    tags: ["Figma", "Canva", "Wireframe", "Prototype", "User Flow"],
    gallery: [
      "/projects/SPU1.png",
      "/projects/SPU2.png",
      "/projects/SPU3.png",
      "/projects/SPU4.png",
      "/projects/SPU5.png",
    ],
    links: [
      {
        label: {
          th: "เอกสารโครงการ (SPUFOOD)",
          en: "Project document (SPUFOOD)",
          zh: "项目文档 (SPUFOOD)",
        },
        url: "https://drive.google.com/file/d/1ZMEa9YhV_LaVZM-qgCrBTYBBWHbG_szQ/view?usp=drive_link",
        type: "pdf",
      },
      {
        label: {
          th: "สไลด์ (SPUFOOD)",
          en: "Slides (SPUFOOD)",
          zh: "演示文稿 (SPUFOOD)",
        },
        url: "https://drive.google.com/file/d/1x_TGueoh3wcOJlnFNl1uJ2__1W6oNbIA/view?usp=drive_link",
        type: "pdf",
      },
      {
        label: {
          th: "วิดีโอสาธิตระบบ SPUFOOD",
          en: "SPUFOOD system demo video",
          zh: "SPUFOOD 系统演示视频",
        },
        url: "https://youtu.be/f0W_PL0vlvA?si=haBN-e2NR6kZkD6v",
        type: "video",
      },
    ],
  },
  {
    title: "Lab-Monitoring",
    year: "2025",
    category: "Full-Stack / IoT",
    description: {
      th: "ระบบตรวจวัดคุณภาพอากาศในห้องแล็บแบบเรียลไทม์ แสดงผลและควบคุมเครื่องปรับอากาศอัตโนมัติ",
      en: "A real-time air quality monitoring system for a lab that displays data and automatically controls the air conditioner.",
      zh: "实验室空气质量实时监测系统，可显示数据并自动控制空调。",
    },
    role: {
      th: "Back-end และ Front-end",
      en: "Back-end & Front-end",
      zh: "后端与前端",
    },
    highlights: [
      {
        th: "พัฒนา Back-end บน Raspberry Pi 5 ด้วย Python เพื่อเก็บและบันทึกข้อมูล AQI แบบเรียลไทม์ลงฐานข้อมูล",
        en: "Developed the back-end on Raspberry Pi 5 with Python to collect and store AQI data in a database in real time.",
        zh: "在 Raspberry Pi 5 上使用 Python 开发后端，实时采集 AQI 数据并存入数据库。",
      },
      {
        th: "ออกแบบและพัฒนา Front-end ของแอปพลิเคชันคู่ใจให้แสดงข้อมูลล่าสุดและควบคุมเครื่องปรับอากาศอัตโนมัติ ได้ประสบการณ์ด้าน data visualization ที่เข้าใจง่าย",
        en: "Designed and built the application's front-end to show the latest data and control the air conditioner automatically, gaining experience in clear, easy-to-understand data visualization.",
        zh: "设计并开发应用前端，用于显示最新数据并自动控制空调，积累了清晰易懂的数据可视化经验。",
      },
    ],
    tags: ["Raspberry Pi 5", "Python", "AQI", "Database", "Data Visualization"],
    gallery: [
      "/projects/LM.1.png",
      "/projects/LM.2.png",
      "/projects/LM.3.png",
    ],
    links: [
      {
        label: {
          th: "เอกสารโครงการ (IOT Environment Monitoring System)",
          en: "Project document (IOT Environment Monitoring System)",
          zh: "项目文档 (IOT Environment Monitoring System)",
        },
        url: "https://drive.google.com/file/d/16PCgEG_Potaj-pZPpJXq0j57KJ_WWsfK/view?usp=drive_link",
        type: "pdf",
      },
      {
        label: {
          th: "วิดีโอสาธิตระบบ 1",
          en: "System demo video 1",
          zh: "系统演示视频 1",
        },
        url: "https://drive.google.com/file/d/1dpW-qLx5E0oBsnKzsjoEsRGqQRMbVvBZ/view?usp=sharing",
        type: "video",
      },
      {
        label: {
          th: "วิดีโอสาธิตระบบ 2 (Screen Recording)",
          en: "System demo video 2 (Screen Recording)",
          zh: "系统演示视频 2（屏幕录制）",
        },
        url: "https://drive.google.com/file/d/1SWs4u7N8c8oZhUw_lHMQ_ZjY53TRv-io/view?usp=drive_link",
        type: "video",
      },
    ],
  },
  {
    title: "Smart Water",
    year: "2025",
    category: "Full-Stack / IoT",
    description: {
      th: "ระบบตรวจวัดคุณภาพน้ำเป็นแบบเรียลไทม์ภายในบ้าน พัฒนาแบบ Full Stack ทั้ง Back-end และจัดเก็บข้อมูลเซนเซอร์",
      en: "A real-time water quality monitoring system for the home, built as a full-stack project covering the back-end and sensor data storage.",
      zh: "家用水质实时监测系统，以全栈方式开发，涵盖后端与传感器数据存储。",
    },
    role: {
      th: "Full-Stack Developer",
      en: "Full-Stack Developer",
      zh: "全栈开发者",
    },
    highlights: [
      {
        th: "พัฒนาระบบ Back-end เก็บข้อมูลเซนเซอร์ พร้อมระบบแจ้งเตือนอัตโนมัติผ่าน Discord Webhook API เมื่อพบค่าผิดปกติ",
        en: "Built the back-end that collects sensor data, with automatic alerts through the Discord Webhook API when abnormal values are detected.",
        zh: "开发采集传感器数据的后端系统，发现异常值时通过 Discord Webhook API 自动发送告警。",
      },
    ],
    tags: ["Full-Stack", "IoT", "Sensor", "Discord Webhook API"],
    gallery: [
      "/projects/water-1.jpg",
      "/projects/water-2.jpg",
      "/projects/water-3.jpg",
    ],
  },
];