const Loading = () => {
  return (
    <div className="min-h-screen px-6 pt-32 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">

        {/* Left */}
        <div className="lg:col-span-7 space-y-6">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-12 w-full bg-gray-200 rounded" />
          <div className="h-6 w-60 bg-gray-200 rounded" />

          <div className="aspect-video bg-gray-200 rounded-3xl" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-32 bg-gray-200 rounded-3xl" />
            <div className="h-32 bg-gray-200 rounded-3xl" />
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-5 space-y-6">
          <div className="h-[400px] bg-gray-200 rounded-3xl" />
          <div className="h-14 bg-gray-200 rounded-2xl" />
        </div>

      </div>
    </div>
  );
};

export default Loading;