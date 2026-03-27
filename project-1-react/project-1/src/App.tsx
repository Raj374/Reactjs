import CircleGallery from "./components/CircleGallery";

function App() {
  const images = [
    "/car1.jpg",
    "/car2.jpg",
    "/car3.jpg",
    "/car4.jpeg",
    "/car5.jpg"
  ];

  return <CircleGallery images={images} />;
}

export default App;