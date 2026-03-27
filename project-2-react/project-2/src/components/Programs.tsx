import ProgramCard from "./Programcard";


function Programs() {
  return (
    <div id="programs" className="py-12 px-6 bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-600">Our Programs</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <ProgramCard
          title="Weight Loss"
          desc="Burn fat with HIIT, cardio, and structured diet plans."
          img="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
        />

        <ProgramCard
          title="Muscle Gain"
          desc="Build muscle with strength training and protein-rich diet."
          img="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
        />

        <ProgramCard
          title="Yoga"
          desc="Improve flexibility, balance and reduce stress daily."
          img="https://images.unsplash.com/photo-1552196563-55cd4e45efb3"
        />
      </div>
    </div>
  );
}

export default Programs;