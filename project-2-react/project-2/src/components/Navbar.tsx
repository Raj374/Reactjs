
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/30 shadow-md z-50">
      
      <h1 className="text-2xl font-bold text-red-600">Workout Hub</h1>

      <div className="space-x-6">
        <a href="#programs" className="hover:text-red-500">Programs</a>
        <a href="#nutrition" className="hover:text-red-500">Nutrition</a>
        <a href="#contact" className="hover:text-red-500">Contact</a>
      </div>

    </nav>
  );
}




export default Navbar;