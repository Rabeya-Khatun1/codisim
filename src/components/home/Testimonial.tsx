import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

const Testimonial = () => {
 const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Frontend Developer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5,
    content: "The curriculum is world-class. I landed my dream job within months."
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UI/UX Designer",
    company: "Meta",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    content: "Hands-on projects gave me confidence to build real products."
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Data Scientist",
    company: "Amazon",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 4,
    content: "Mentors are supportive and the learning path is very clear."
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Full Stack Engineer",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    content: "The community here is amazing. I never felt alone during my coding journey."
  }
];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="pb-20 ">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Students Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real feedback from learners who transformed their careers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border-2 border-transparent hover:border-amber-300 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(t.rating)}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 italic text-sm leading-relaxed">
                "{t.content}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
  <Image
    src={t.image}
    alt={t.name}
    width={48}
    height={48}
    className="rounded-full object-cover"
  />
  <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;