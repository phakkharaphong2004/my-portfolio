import Image from "next/image";
import ImageMarquee from "../components/ImageMarquee";
import { SpotlightCard } from "../components/ui/spotlight-card";
import WindowBar from "../components/WindowBar";

// แก้ตรงนี้: ข้อมูลการศึกษา
const education = [
  {
    school: "Sripatum University (SPU) · มหาวิทยาลัยศรีปทุม",
    label: "sripatum.ac.th", // ← เพิ่มบรรทัดนี้
    major: "สาขาวิศวกรรมคอมพิวเตอร์ (ชั้นปีที่ 4)",
    gpa: "3.59",
    logo: {
      src: "/logos/spu.png",
      alt: "โลโก้มหาวิทยาลัยศรีปทุม (SPU)",
      plate: true,
    },
    period: "ก.ย. 2023 – ปัจจุบัน",
    points: [
      "โปรเจกต์วิชาการหลายด้าน: Software Development, Hardware/IoT, System Analysis, UX/UI Design",
      "ผ่านกระบวนการพัฒนาครบวงจร ตั้งแต่วางแผน ออกแบบ พัฒนา ทดสอบ จนถึง deployment",
      "มุ่งสร้างผลิตภัณฑ์ดิจิทัลที่เน้นผู้ใช้เป็นศูนย์กลาง",
    ],
  },
  {
    school: "Kandongpittayakhom School · โรงเรียนแคนดงพิทยาคม",
    label: "kandongpittayakhom.school", // ← เพิ่มบรรทัดนี้
    major: "มัธยมปลาย สายวิทย์-คณิต",
    gpa: "3.81",
    logo: {
      src: "/logos/kandong.webp",
      alt: "ตราโรงเรียนแคนดงพิทยาคม",
      plate: false,
    },
    period: "พ.ค. 2020 – มี.ค. 2023",
    points: [
      "ตัวแทนโรงเรียนแข่งขันด้านวิทยาศาสตร์ (Science Intelligence Competition)",
      "แสดงถึงทักษะการคิดวิเคราะห์ การแก้ปัญหา และความสนใจด้านวิทยาศาสตร์และเทคโนโลยี",
    ],
  },
];

// แก้ตรงนี้: เกียรติบัตรช่วงมหาวิทยาลัย (ไฟล์อยู่ใน public/univ/)
const univPhotos = [
  {
    src: "/univ/1.1.jpg",
    title: "AWS Academy",
    caption: "หลักสูตร Machine Learning Foundations ผ่านการอบรมรวม 20 ชั่วโมง ได้เรียนรู้พื้นฐานด้าน Machine Learning และการประยุกต์ใช้ AI ซึ่งเป็นทักษะที่สามารถต่อยอดในการพัฒนาโปรเจกต์ด้านเทคโนโลยีได้",
  },
  {
    pending: true, title: "เกียรติบัตรใหม่", caption: "กำลังรวบรวม เร็ว ๆ นี้"
  },
  {
    pending: true, title: "เกียรติบัตรใหม่", caption: "กำลังรวบรวม เร็ว ๆ นี้"
  },
  {
   pending: true, title: "เกียรติบัตรใหม่", caption: "กำลังรวบรวม เร็ว ๆ นี้"
  },
  {
    pending: true, title: "เกียรติบัตรใหม่", caption: "กำลังรวบรวม เร็ว ๆ นี้"
  },
  {
   pending: true, title: "เกียรติบัตรใหม่", caption: "กำลังรวบรวม เร็ว ๆ นี้"
  },
];

// แก้ตรงนี้: รูปกิจกรรมสมัยมัธยม (ไฟล์อยู่ใน public/school/)
const schoolPhotos = [
  { src: "/school/1.jpg",
    title: "Google", 
    caption: "หัวข้อ Internet Awesome เพื่อเรียนรู้การใช้อินเทอร์เน็ตอย่างปลอดภัย การปกป้องข้อมูลส่วนบุคคล การสร้างรหัสผ่านที่แข็งแกร่ง และการรู้เท่าทันพฤติกรรมที่ไม่เหมาะสมบนโลกออนไลน์" 
  },
  {
    src: "/school/2.jpg",
    title: "เกียรติบัตรมหาวิทยาลัยสงขลานครินทร์ (PSU)",
    caption: "เข้าร่วมการแนะแนวและกิจกรรมพิเศษด้านวิทยาศาสตร์",
  },
  {
    src: "/school/3.jpg",
    title: "เกียรติบัตรมหาวิทยาลัยราชภัฏสวนสุนันทา",
    caption: "เข้าร่วมกิจกรรมบรรยายเรื่องการออกแบบและหุ่นยนต์",
  },
  {
    src: "/school/4.jpg",
    title: "เกียรติบัตรสำนักงานเขตพื้นที่การศึกษามัธยมศึกษาบุรีรัมย์",
    caption: "ผ่านการอบรมออนไลน์โครงการโรงเรียนคุณธรรม สพฐ.",
  },
  {
    src: "/school/5.jpg",
    title: "เกียรติบัตรการแข่งขันคณิตคิดเลขเร็ว",
    caption: "ได้รับรางวัลรองชนะเลิศอันดับ 1 ระดับมัธยมศึกษาตอนปลาย",
  },
  {
    src: "/school/6.jpg",
    title: "เกียรติบัตรการแข่งขันอัจฉริยภาพทางคณิตศาสตร์",
    caption: "ได้รับรางวัลรองชนะเลิศอันดับ 2 ระดับมัธยมศึกษาตอนปลาย",
  },
  {
    src: "/school/7.jpg",
    title: "เกียรติบัตรการแข่งขันอัจฉริยภาพทางวิทยาศาสตร์",
    caption: "ได้รับรางวัลชนะเลิศ ระดับมัธยมศึกษาตอนปลาย",
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
                alt="รูปโปรไฟล์"
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
              กำลังมองหาโอกาสฝึกงาน
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-[#F8FAFC]/70">
              นักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 4 ที่สนใจงาน Full-Stack และ
              UX/UI Design ถนัดการพัฒนาเว็บ แอปมือถือ และระบบ IoT
              โดยดูแลงานตั้งแต่ออกแบบหน้าจอไปจนถึงระบบหลังบ้าน
              ตอนนี้กำลังมองหาโอกาสฝึกงานเพื่อร่วมสร้างผลงานจริงกับทีม
            </p>
          </div>
        </div>

        {/* การศึกษา */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">
            <span className="grad-text">การศึกษา</span>
          </h2>
          <div className="space-y-5">
                        {education.map((e, idx) => (
              <SpotlightCard
                key={e.school}
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
                        <h3 className="font-semibold">{e.school}</h3>
                        <p className="mt-1 text-sm text-[#F8FAFC]/70">
                          {e.major}
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
                      {e.period}
                    </span>
                  </div>
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#F8FAFC]/70 marker:text-[#8B5CF6]">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            ))}

            {/* เกียรติบัตรช่วงมหาวิทยาลัย (อยู่บน) */}
            <h3 className="pt-8 text-xl font-bold">
              <span className="grad-text">เกียรติบัตรช่วงมหาวิทยาลัย</span>
            </h3>
            <ImageMarquee items={univPhotos} reverse />

            {/* เกียรติบัตรช่วงมัธยมปลาย (อยู่ล่าง) */}
            <h3 className="pt-8 text-xl font-bold">
              <span className="grad-text">เกียรติบัตรช่วงมัธยมปลาย</span>
            </h3>
            <ImageMarquee items={schoolPhotos} />
          </div>
        </section>
      </main>
    </div>
  );
}