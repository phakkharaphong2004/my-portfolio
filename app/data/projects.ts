export type Project = {
  title: string;
  year: string;
  category: string;
  description: string;
  role?: string;
  highlights?: string[];
  tags: string[];
  image?: string; // เช่น "/projects/spufood.jpg" ถ้าไม่มีจะแสดงช่อง "รออัปเดต"
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
  },
];