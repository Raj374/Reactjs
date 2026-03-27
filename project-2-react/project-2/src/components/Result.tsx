function Results() {
  const images = [
    "/public/trans1.jpg",
    "/public/trans2.jpg",
    "/public/trans3.JPEG", 
    "/public/trans2.jpg",
  ];

  return (
    <section className="py-16 bg-black text-white overflow-hidden">
      <h2 className="text-4xl md:text-5xl text-center text-red-600 mb-10 tracking-wider"
    style={{ fontFamily: "Bebas Neue, sans-serif" }}>
  Real Transformation 
</h2>


      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll gap-6 px-6">
          
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-80 w-[300px] object-cover rounded-2xl flex-shrink-0"
            />
          ))}
          {images.map((img, i) => (
            <img
              key={`dup-${i}`}
              src={img}
              className="h-80 w-[300px] object-cover rounded-2xl flex-shrink-0"
            />
          ))}

        </div>
      </div>
    </section>
  );
}

export default Results;