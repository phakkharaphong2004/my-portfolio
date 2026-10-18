import Image from "next/image";

// แก้ตรงนี้: ข้อมูลการศึกษา
const education = [
  {
    school: "Sripatum University (SPU) / มหาวิทยาลัยศรีปทุม",
    period: "กันยายน 2023 – ปัจจุบัน",
    detail:
      "นักศึกษาวิศวกรรมคอมพิวเตอร์ปี 4 (GPA 3.59) มีประสบการณ์จากโปรเจกต์วิชาการหลากหลายด้าน ทั้ง Software Development, Hardware/IoT, System Analysis และ UX/UI Design ผ่านกระบวนการพัฒนาซอฟต์แวร์ครบวงจร ตั้งแต่วางแผน ออกแบบ พัฒนา ทดสอบ จนถึง deployment มุ่งมั่นสร้างสรรค์ผลิตภัณฑ์ดิจิทัลที่เน้นผู้ใช้เป็นศูนย์กลาง พร้อมพัฒนาทักษะทั้งด้านเทคนิคและการออกแบบอย่างต่อเนื่อง",
  },
  {
    school: "Kandongpittayakhom School / โรงเรียนแคนดงพิทยาคม",
    period: "พฤษภาคม 2020 – มีนาคม 2023",
    detail:
      "จบมัธยมปลายสายวิทย์-คณิต GPA 3.81 เป็นตัวแทนโรงเรียนแข่งขันด้านวิทยาศาสตร์ (Science Intelligence Competition) แสดงให้เห็นถึงทักษะการคิดวิเคราะห์ การแก้ปัญหา และความสนใจในสายวิทยาศาสตร์และเทคโนโลยี",
  },
];

export default function About() {
  return (
    <main className="mx-auto max-w-5xl px-8 pb-16 pt-36">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
        {/* รูปโปรไฟล์ มุมบนซ้าย (ปรับขนาดที่ w-48 / sm:w-60 / lg:w-72) */}
        <div className="photo-frame w-48 shrink-0 sm:w-60 lg:w-72" style={{ animation: "none" }}>
          <div className="photo-inner aspect-[4/5]">
            <Image
              src="/profile.webp"
              alt="รูปโปรไฟล์"
              width={900}
              height={1260}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="mb-6 text-3xl font-bold">About Me</h1>
          <p>
            เขียนแนะนำตัวตรงนี้ 2-3 ประโยค เช่น เรียนอะไร ถนัดอะไร
            และกำลังมองหาโอกาสแบบไหน
          </p>
        </div>
      </div>

      {/* การศึกษา */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">
          <span className="grad-text">การศึกษา</span>
        </h2>
        <div className="space-y-5">
          {education.map((e) => (
            <div
              key={e.school}
              className="rounded-2xl border border-[#202530] bg-[#12141d]/70 p-6 backdrop-blur transition hover:border-[#8B5CF6]/50"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-semibold">{e.school}</h3>
                <span className="shrink-0 text-sm text-[#F8FAFC]/60">
                  {e.period}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#F8FAFC]/70">
                {e.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}