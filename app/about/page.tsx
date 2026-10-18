import Image from "next/image";

export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-8 pb-16 pt-36">
      <div className="flex items-start gap-6">
        {/* รูปโปรไฟล์ มุมบนซ้าย (ปรับขนาดที่ w-28 / sm:w-32) */}
        <div className="photo-frame w-28 shrink-0 sm:w-32" style={{ animation: "none" }}>
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
            นักศึกษาวิศวกรรมคอมพิวเตอร์ปี 4 สนใจด้าน UX/UI Design มีประสบการณ์ user research, wireframing และ prototyping ด้วย Figma/Canva ผสานกับพื้นฐาน Full Stack Development ทำให้ออกแบบงานที่สวยงามและใช้งานได้จริงในเชิงเทคนิค ใส่ใจรายละเอียด เปิดรับฟีดแบ็ก และพร้อมเรียนรู้เสมอ
          </p>
        </div>
      </div>
    </main>
  );
}