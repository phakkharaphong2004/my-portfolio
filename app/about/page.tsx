import Image from "next/image";

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
    </main>
  );
}