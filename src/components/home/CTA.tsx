import { ArrowRight } from "lucide-react";

const MinimalCTA = () => {
  return (
    <section className="pb-20">
      <div className="max-w-5xl mx-auto ">
        <div className="bg-primary border border-slate-200 rounded-2xl p-4 md:p-4 text-center shadow-sm">

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Begin Your Learning Journey
          </h2>

          <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of students and get a <span className="text-slate-900 font-semibold">7-day free trial</span>. No credit card required, cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Action */}
            <button className="w-full sm:w-auto bg-slate-950 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
              Start Free Trial
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Secondary Action */}
            <button className="w-full sm:w-auto bg-transparent text-slate-500 px-10 py-4 rounded-2xl font-semibold hover:bg-slate-100 hover:text-slate-900 transition-all">
              View Curriculum
            </button>
          </div>

          {/* Trust Note */}
          <p className="mt-8 text-slate-600 text-sm">
            Trusted by 10,000+ learners worldwide
          </p>

        </div>
      </div>
    </section>
  );
};

export default MinimalCTA;