export type ProjectLink = {
  label: string;
  url: string;
  type: "video" | "pdf" | "link";
};

export type Project = {
  title: string;
  year: string;
  category: string;
  description: string;
  role?: string;
  highlights?: string[];
  details?: string;
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
    description:
      "ออกแบบ UX/UI ของแอปพลิเคชัน SPUFOOD ตั้งแต่ต้นจนจบ เน้นความง่ายในการใช้งานและสอดคล้องกับเป้าหมายของระบบ",
    role: "UX/UI Designer",
    highlights: [
      "สร้าง wireframe และ prototype เพื่อออกแบบหน้าจอและ user flow ก่อนส่งต่อให้ทีมพัฒนา",
      "ทำงานร่วมกับทีม Front-end อย่างใกล้ชิดเพื่อให้การพัฒนาตรงตามดีไซน์ที่ออกแบบไว้",
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
        label: "เอกสารโครงการ (SPUFOOD)",
        url: "https://drive.google.com/file/d/1ZMEa9YhV_LaVZM-qgCrBTYBBWHbG_szQ/view?usp=drive_link",
        type: "pdf",
      },
      {
        label: "สไลด์ (SPUFOOD)",
        url: "https://drive.google.com/file/d/1x_TGueoh3wcOJlnFNl1uJ2__1W6oNbIA/view?usp=drive_link",
        type: "pdf",
      },
      {
        label: "วิดีโอสาธิตระบบ SPUFOOD ",
        url: "https://youtu.be/f0W_PL0vlvA?si=haBN-e2NR6kZkD6v",
        type: "video",
      },
    ],
    
  },
  {
    title: "Lab-Monitoring",
    year: "2025",
    category: "Full-Stack / IoT",
    description:
      "ระบบตรวจวัดคุณภาพอากาศในห้องแล็บแบบเรียลไทม์ แสดงผลและควบคุมเครื่องปรับอากาศอัตโนมัติ",
    role: "Back-end และ Front-end",
    highlights: [
      "พัฒนา Back-end บน Raspberry Pi 5 ด้วย Python เพื่อเก็บและบันทึกข้อมูล AQI แบบเรียลไทม์ลงฐานข้อมูล",
      "ออกแบบและพัฒนา Front-end ของแอปพลิเคชันคู่ใจให้แสดงข้อมูลล่าสุดและควบคุมเครื่องปรับอากาศอัตโนมัติ ได้ประสบการณ์ด้าน data visualization ที่เข้าใจง่าย",
    ],
    tags: ["Raspberry Pi 5", "Python", "AQI", "Database", "Data Visualization"],
    gallery: [
      "/projects/LM.1.png",
      "/projects/LM.2.png",
      "/projects/LM.3.png",
    ],
     links: [
      {
        label: "เอกสารโครงการ (IOT Environment Monitoring System)",
        url: "https://drive.google.com/file/d/16PCgEG_Potaj-pZPpJXq0j57KJ_WWsfK/view?usp=drive_link",
        type: "pdf",
      },
      {
        label: "วิดีโอสาธิตระบบ 1",
        url: "https://drive.google.com/file/d/1dpW-qLx5E0oBsnKzsjoEsRGqQRMbVvBZ/view?usp=sharing",
        type: "video",
      },
      {
        label: "วิดีโอสาธิตระบบ 2 (Screen Recording)",
        url: "https://drive.google.com/file/d/1SWs4u7N8c8oZhUw_lHMQ_ZjY53TRv-io/view?usp=drive_link",
        type: "video",
      },
    ],
    
  },
  {
    title: "Smart Water",
    year: "2025",
    category: "Full-Stack / IoT",
    description:
      "ระบบตรวจวัดคุณภาพน้ำเป็นแบบเรียลไทม์ภายในบ้าน พัฒนาแบบ Full Stack ทั้ง Back-end และจัดเก็บข้อมูลเซนเซอร์",
    role: "Full-Stack Developer",
    highlights: [
      "พัฒนาระบบ Back-end เก็บข้อมูลเซนเซอร์ พร้อมระบบแจ้งเตือนอัตโนมัติผ่าน Discord Webhook API เมื่อพบค่าผิดปกติ",
    ],
    tags: ["Full-Stack", "IoT", "Sensor", "Discord Webhook API"],
    gallery: [
      "/projects/water-1.jpg",
      "/projects/water-2.jpg",
      "/projects/water-3.jpg",
    ],
  },
];