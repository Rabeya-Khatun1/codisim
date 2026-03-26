import Image from "next/image";
import { 
 Star, Clock, Globe, ShieldCheck, 
  ChevronRight, Play, Download
} from "lucide-react";
import { getSingleCourse } from "@/lib/db/courses";

interface Props {
  params: { id: string };
}

const CourseDetails = async ({ params }: Props) => {
  const { id } = await params;
  const course = await getSingleCourse(id);

  if (!course) return <div className="text-center py-20">Course not found</div>;

  return (
    <div className=" min-h-screen bg-white dark:bg-[#08090a] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Course Content (8/12) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Badge & Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
                <Globe className="w-3 h-3" /> New Release • {course.category}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                {course.title}
              </h1>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#08090a] bg-slate-200 dark:bg-slate-800" />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#08090a] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    +{course.students}
                  </div>
                </div>
                <p className="text-sm font-medium opacity-70">Joined by 12,000+ creators globally</p>
              </div>
            </div>

            {/* Video Preview (Cinematic Style) */}
            <div className="group relative aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900 shadow-2xl">
              <Image 
                src={course.image} 
                alt="preview" 
                fill 
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95">
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            </div>

            {/* Features (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" /> Duration</h4>
                <p className="text-sm opacity-70">{course.duration} of high-quality cinematic video lessons.</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Certification</h4>
                <p className="text-sm opacity-70">Earn a verified certificate upon completion to showcase.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Card (5/12) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111214] border border-slate-200 dark:border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm font-medium opacity-50 uppercase tracking-tighter">Full Access</p>
                    <h2 className="text-4xl font-bold">{course.price}</h2>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-2 py-1 rounded-lg text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" /> {course.rating}
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98]">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Enroll Today <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <p className="text-center text-[10px] opacity-40 font-bold uppercase tracking-widest">Secure Checkout Powered by Stripe</p>
                </div>

                <hr className="my-8 border-slate-100 dark:border-slate-800" />

                <div className="space-y-4">
                  <h4 className="text-sm font-bold opacity-80 italic">Curriculum Highlights:</h4>
                  {[
                    "Mastering the Core Tools",
                    "Advanced Workflow Secrets",
                    "Building Your First Pro Project",
                    "Final Portfolio Review"
                  ].map((lesson, idx) => (
                    <div key={idx} className="flex items-center gap-3 group cursor-default">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Action */}
              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-sm font-bold">
                <Download className="w-4 h-4" /> Download Syllabus (PDF)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;