import { ChevronRight, Clock, PlayCircle, Star, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BookOpen, Globe, TrendingUp, Briefcase, Shield } from 'lucide-react';

// Types
interface Course {
  id: number;
  title: string;
  price: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  category: string;
}


const Courses = () => {
 const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});

  // Animation on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

     const courses: Course[] = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp 2024",
      price: "$49",
      instructor: "Jhankar Mahbub",
      rating: 4.8,
      students: 12500,
      duration: "42 hours",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      category: "development"
    },
    {
      id: 2,
      title: "UI/UX Design Mastery: From Zero to Hero",
      price: "$39",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 8400,
      duration: "28 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
      category: "design"
    },
    {
      id: 3,
      title: "Digital Marketing Excellence",
      price: "$29",
      instructor: "Michael Chen",
      rating: 4.7,
      students: 15600,
      duration: "35 hours",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      category: "marketing"
    },
    {
      id: 4,
      title: "Data Science & Machine Learning",
      price: "$79",
      instructor: "Dr. Emily Rodriguez",
      rating: 4.9,
      students: 6700,
      duration: "56 hours",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      category: "data-science"
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      price: "$59",
      instructor: "Alex Turner",
      rating: 4.8,
      students: 9300,
      duration: "38 hours",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
      category: "development"
    },
    {
      id: 6,
      title: "Cloud Computing & AWS Certification",
      price: "$89",
      instructor: "David Kumar",
      rating: 4.9,
      students: 5200,
      duration: "48 hours",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
      category: "cloud"
    }
  ];

     const categories = [
    { id: 'all', name: 'সব কোর্স', icon: BookOpen },
    { id: 'development', name: 'ওয়েব ডেভেলপমেন্ট', icon: Globe },
    { id: 'design', name: 'ডিজাইন', icon: TrendingUp },
    { id: 'marketing', name: 'মার্কেটিং', icon: Briefcase },
    { id: 'data-science', name: 'ডাটা সায়েন্স', icon: Shield }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };


    return (
  <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 animate-on-scroll" id="courses-header">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">জনপ্রিয় কোর্সসমূহ</h2>
              <p className="text-gray-600">ইন্ডাস্ট্রি এক্সপার্টদের সাথে শিখুন লেটেস্ট টেকনোলজি</p>
            </div>
            <button className="text-blue-600 font-bold flex items-center gap-2 group hover:gap-3 transition-all">
              সবগুলো দেখুন 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10 animate-on-scroll" id="categories">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <category.icon size={18} />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id} 
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-on-scroll`}
                id={`course-${course.id}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Best Seller
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(course.rating)}
                    <span className="text-sm text-gray-600 ml-2">({course.rating})</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{course.instructor}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Users size={16} />
                    <span>{course.students.toLocaleString()} শিক্ষার্থী</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4">
                    <div>
                      <span className="text-2xl font-black text-gray-900">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">$99</span>
                    </div>
                    <button className="bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-600 transition flex items-center gap-2">
                      <PlayCircle size={18} />
                      এনরোল করুন
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Courses;