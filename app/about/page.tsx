import Image from "next/image";
import ImageMarquee from "../components/ImageMarquee";
import { SpotlightCard } from "../components/ui/spotlight-card";
import WindowBar from "../components/WindowBar";
import { T, type L } from "../components/LangProvider";

// ข้อความที่เหมือนกันทุกภาษา (เช่น ชื่อที่ไม่ต้องแปล)
const same = (s: string): L => ({ th: s, en: s, zh: s });

// แก้ตรงนี้: ข้อมูลการศึกษา
const education: {
  school: L;
  label: string;
  major: L;
  gpa: string;
  logo: { src: string; alt: string; plate: boolean };
  period: L;
  points: L[];
}[] = [
  {
    school: {
      th: "Sripatum University (SPU) · มหาวิทยาลัยศรีปทุม",
      en: "Sripatum University (SPU)",
      zh: "诗巴吞大学 (SPU)",
    },
    label: "sripatum.ac.th",
    major: {
      th: "สาขาวิศวกรรมคอมพิวเตอร์ (ชั้นปีที่ 4)",
      en: "Computer Engineering (4th year)",
      zh: "计算机工程专业（大四）",
    },
    gpa: "3.59",
    logo: {
      src: "/logos/spu.png",
      alt: "โลโก้มหาวิทยาลัยศรีปทุม (SPU)",
      plate: true,
    },
    period: {
      th: "ก.ย. 2023 – ปัจจุบัน",
      en: "Sep 2023 – Present",
      zh: "2023年9月 – 至今",
    },
    points: [
      {
        th: "โปรเจกต์วิชาการหลายด้าน: Software Development, Hardware/IoT, System Analysis, UX/UI Design",
        en: "Academic projects across several areas: Software Development, Hardware/IoT, System Analysis, UX/UI Design",
        zh: "参与多个方向的学术项目：软件开发、硬件/物联网、系统分析、UX/UI 设计",
      },
      {
        th: "ผ่านกระบวนการพัฒนาครบวงจร ตั้งแต่วางแผน ออกแบบ พัฒนา ทดสอบ จนถึง deployment",
        en: "Experienced the full development cycle: planning, design, development, testing and deployment",
        zh: "经历完整的开发流程：规划、设计、开发、测试直至部署",
      },
      {
        th: "มุ่งสร้างผลิตภัณฑ์ดิจิทัลที่เน้นผู้ใช้เป็นศูนย์กลาง",
        en: "Focused on building user-centered digital products",
        zh: "致力于打造以用户为中心的数字产品",
      },
    ],
  },
  {
    school: {
      th: "Kandongpittayakhom School · โรงเรียนแคนดงพิทยาคม",
      en: "Kandongpittayakhom School",
      zh: "坎东皮塔亚空学校",
    },
    label: "kandongpittayakhom.school",
    major: {
      th: "มัธยมปลาย สายวิทย์-คณิต",
      en: "High school, Science–Mathematics track",
      zh: "高中，理科（科学-数学）方向",
    },
    gpa: "3.81",
    logo: {
      src: "/logos/kandong.webp",
      alt: "ตราโรงเรียนแคนดงพิทยาคม",
      plate: false,
    },
    period: {
      th: "พ.ค. 2020 – มี.ค. 2023",
      en: "May 2020 – Mar 2023",
      zh: "2020年5月 – 2023年3月",
    },
    points: [
      {
        th: "ตัวแทนโรงเรียนแข่งขันด้านวิทยาศาสตร์ (Science Intelligence Competition)",
        en: "School representative in a science competition (Science Intelligence Competition)",
        zh: "代表学校参加科学竞赛（Science Intelligence Competition）",
      },
      {
        th: "แสดงถึงทักษะการคิดวิเคราะห์ การแก้ปัญหา และความสนใจด้านวิทยาศาสตร์และเทคโนโลยี",
        en: "Shows analytical thinking, problem-solving skills and a strong interest in science and technology",
        zh: "体现了分析思维、解决问题的能力，以及对科学与技术的兴趣",
      },
    ],
  },
];

const PENDING_TITLE: L = {
  th: "เกียรติบัตรใหม่",
  en: "New certificate",
  zh: "新证书",
};
const PENDING_CAPTION: L = {
  th: "กำลังรวบรวม เร็ว ๆ นี้",
  en: "Being collected, coming soon",
  zh: "整理中，敬请期待",
};
const pending = { pending: true, title: PENDING_TITLE, caption: PENDING_CAPTION };

// แก้ตรงนี้: เกียรติบัตรช่วงมหาวิทยาลัย (ไฟล์อยู่ใน public/univ/)
const univPhotos = [
  {
    src: "/univ/1.1.jpg",
    title: same("AWS Academy"),
    caption: {
      th: "หลักสูตร Machine Learning Foundations ผ่านการอบรมรวม 20 ชั่วโมง ได้เรียนรู้พื้นฐานด้าน Machine Learning และการประยุกต์ใช้ AI ซึ่งเป็นทักษะที่สามารถต่อยอดในการพัฒนาโปรเจกต์ด้านเทคโนโลยีได้",
      en: "Completed the Machine Learning Foundations course (20 hours in total), learning the basics of machine learning and AI applications, skills that can be built on in technology projects.",
      zh: "完成 Machine Learning Foundations 课程（共 20 小时），学习了机器学习基础和 AI 应用，这些技能可用于后续的技术项目开发。",
    },
  },
  pending,
  pending,
  pending,
  pending,
  pending,
];

// แก้ตรงนี้: รูปกิจกรรมสมัยมัธยม (ไฟล์อยู่ใน public/school/)
const schoolPhotos = [
  {
    src: "/school/1.jpg",
    title: same("Google"),
    caption: {
      th: "หัวข้อ Internet Awesome เพื่อเรียนรู้การใช้อินเทอร์เน็ตอย่างปลอดภัย การปกป้องข้อมูลส่วนบุคคล การสร้างรหัสผ่านที่แข็งแกร่ง และการรู้เท่าทันพฤติกรรมที่ไม่เหมาะสมบนโลกออนไลน์",
      en: "Internet Awesome program on safe internet use, protecting personal information, creating strong passwords and recognizing inappropriate behavior online.",
      zh: "Internet Awesome 课程：学习安全上网、保护个人信息、设置高强度密码，以及识别网络上的不当行为。",
    },
  },
  {
    src: "/school/2.jpg",
    title: {
      th: "เกียรติบัตรมหาวิทยาลัยสงขลานครินทร์ (PSU)",
      en: "Certificate – Prince of Songkla University (PSU)",
      zh: "宋卡王子大学 (PSU) 证书",
    },
    caption: {
      th: "เข้าร่วมการแนะแนวและกิจกรรมพิเศษด้านวิทยาศาสตร์",
      en: "Took part in a guidance session and special science activities",
      zh: "参加了升学指导和科学特别活动",
    },
  },
  {
    src: "/school/3.jpg",
    title: {
      th: "เกียรติบัตรมหาวิทยาลัยราชภัฏสวนสุนันทา",
      en: "Certificate – Suan Sunandha Rajabhat University",
      zh: "苏安速那陀皇家大学证书",
    },
    caption: {
      th: "เข้าร่วมกิจกรรมบรรยายเรื่องการออกแบบและหุ่นยนต์",
      en: "Attended a lecture activity on design and robotics",
      zh: "参加了设计与机器人主题讲座活动",
    },
  },
  {
    src: "/school/4.jpg",
    title: {
      th: "เกียรติบัตรสำนักงานเขตพื้นที่การศึกษามัธยมศึกษาบุรีรัมย์",
      en: "Certificate – Buriram Secondary Educational Service Area Office",
      zh: "武里南中等教育区办公室证书",
    },
    caption: {
      th: "ผ่านการอบรมออนไลน์โครงการโรงเรียนคุณธรรม สพฐ.",
      en: "Completed the online training for the OBEC Moral School project",
      zh: "完成基础教育委员会办公室（OBEC）“道德学校”项目的在线培训",
    },
  },
  {
    src: "/school/5.jpg",
    title: {
      th: "เกียรติบัตรการแข่งขันคณิตคิดเลขเร็ว",
      en: "Certificate – Speed Mental Math Competition",
      zh: "速算比赛证书",
    },
    caption: {
      th: "ได้รับรางวัลรองชนะเลิศอันดับ 1 ระดับมัธยมศึกษาตอนปลาย",
      en: "First runner-up, upper secondary level",
      zh: "获高中组亚军",
    },
  },
  {
    src: "/school/6.jpg",
    title: {
      th: "เกียรติบัตรการแข่งขันอัจฉริยภาพทางคณิตศาสตร์",
      en: "Certificate – Mathematical Genius Competition",
      zh: "数学天才竞赛证书",
    },
    caption: {
      th: "ได้รับรางวัลรองชนะเลิศอันดับ 2 ระดับมัธยมศึกษาตอนปลาย",
      en: "Second runner-up, upper secondary level",
      zh: "获高中组季军",
    },
  },
  {
    src: "/school/7.jpg",
    title: {
      th: "เกียรติบัตรการแข่งขันอัจฉริยภาพทางวิทยาศาสตร์",
      en: "Certificate – Science Genius Competition",
      zh: "科学天才竞赛证书",
    },
    caption: {
      th: "ได้รับรางวัลชนะเลิศ ระดับมัธยมศึกษาตอนปลาย",
      en: "Winner, upper secondary level",
      zh: "获高中组冠军",
    },
  },
];

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#F8FAFC]">
      {/* พื้นหลังเรืองแสง */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[520px] h-[420px] w-[420px] rounded-full bg-[#3B82F6]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-[1100px] h-[420px] w-[420px] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      <div className="dot-grid pointer-events-none absolute inset-0 h-[900px]" />

      <main className="relative mx-auto max-w-5xl px-8 pb-24 pt-36">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-14 lg:gap-16">
          <div
            className="photo-frame w-48 shrink-0 sm:w-60 lg:w-72"
            style={{
              animation: "none",
              padding: 2,
              boxShadow: "0 0 18px rgba(139, 92, 246, 0.12)",
            }}
          >
            <div
              className="photo-inner aspect-[4/5]"
              style={{ background: "#12141d" }}
            >
              <Image
                src="/profile.webp"
                alt="Profile photo"
                width={900}
                height={1260}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 sm:self-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a78bfa]">
              About Me
            </p>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Phakkharaphong Sarang-ngam
            </h1>
            <p className="mt-2 text-lg font-semibold">
              <span className="grad-text">
                Full-Stack Developer · UX/UI Design
              </span>
            </p>
            <p className="mt-1 text-sm text-[#F8FAFC]/50">
              <T
                v={{
                  th: "กำลังมองหาโอกาสฝึกงาน",
                  en: "Looking for an internship",
                  zh: "正在寻找实习机会",
                }}
              />
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-[#F8FAFC]/70">
              <T
                v={{
                  th: "นักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 4 ที่สนใจงาน Full-Stack และ UX/UI Design ถนัดการพัฒนาเว็บ แอปมือถือ และระบบ IoT โดยดูแลงานตั้งแต่ออกแบบหน้าจอไปจนถึงระบบหลังบ้าน ตอนนี้กำลังมองหาโอกาสฝึกงานเพื่อร่วมสร้างผลงานจริงกับทีม",
                  en: "A 4th-year computer engineering student interested in Full-Stack and UX/UI Design. Skilled in web, mobile apps and IoT systems, handling everything from screen design to the back-end. Currently looking for an internship to build real-world projects with a team.",
                  zh: "计算机工程专业大四学生，对全栈开发和 UX/UI 设计感兴趣，擅长网页、移动应用和物联网系统，能负责从界面设计到后端系统的全流程工作。目前正在寻找实习机会，与团队一起打造真实作品。",
                }}
              />
            </p>
          </div>
        </div>

        {/* การศึกษา */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">
            <span className="grad-text">
              <T v={{ th: "การศึกษา", en: "Education", zh: "教育背景" }} />
            </span>
          </h2>
          <div className="space-y-5">
            {education.map((e, idx) => (
              <SpotlightCard
                key={e.school.en}
                className={idx % 2 === 0 ? "float-slow" : "float"}
              >
                <WindowBar label={e.label} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <div
                        className={`relative h-16 w-16 shrink-0 sm:h-20 sm:w-20 ${
                          e.logo.plate
                            ? "overflow-hidden rounded-xl border border-white/20 bg-white shadow-[0_0_18px_rgba(139,92,246,0.25)]"
                            : "drop-shadow-[0_0_10px_rgba(139,92,246,0.35)]"
                        }`}
                      >
                        <Image
                          src={e.logo.src}
                          alt={e.logo.alt}
                          fill
                          sizes="80px"
                          className={
                            e.logo.plate
                              ? "object-contain p-1.5"
                              : "object-contain"
                          }
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold">
                          <T v={e.school} />
                        </h3>
                        <p className="mt-1 text-sm text-[#F8FAFC]/70">
                          <T v={e.major} />
                        </p>
                        <span className="mt-2.5 inline-flex items-center gap-2 rounded-lg border border-[#8B5CF6]/60 bg-[#8B5CF6]/10 px-3 py-1 shadow-[0_0_14px_rgba(139,92,246,0.25)]">
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#F8FAFC]/60">
                            GPA
                          </span>
                          <span className="grad-text text-base font-extrabold">
                            {e.gpa}
                          </span>
                          <span className="text-xs text-[#F8FAFC]/40">
                            / 4.00
                          </span>
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-right text-sm text-[#F8FAFC]/60 sm:whitespace-nowrap">
                      <T v={e.period} />
                    </span>
                  </div>
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#F8FAFC]/70 marker:text-[#8B5CF6]">
                    {e.points.map((p) => (
                      <li key={p.en}>
                        <T v={p} />
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            ))}

            {/* เกียรติบัตรช่วงมหาวิทยาลัย (อยู่บน) */}
            <h3 className="pt-8 text-xl font-bold">
              <span className="grad-text">
                <T
                  v={{
                    th: "เกียรติบัตรช่วงมหาวิทยาลัย",
                    en: "University Certificates",
                    zh: "大学阶段证书",
                  }}
                />
              </span>
            </h3>
            <ImageMarquee items={univPhotos} reverse />

            {/* เกียรติบัตรช่วงมัธยมปลาย (อยู่ล่าง) */}
            <h3 className="pt-8 text-xl font-bold">
              <span className="grad-text">
                <T
                  v={{
                    th: "เกียรติบัตรช่วงมัธยมปลาย",
                    en: "High School Certificates",
                    zh: "高中阶段证书",
                  }}
                />
              </span>
            </h3>
            <ImageMarquee items={schoolPhotos} />
          </div>
        </section>
      </main>
    </div>
  );
}