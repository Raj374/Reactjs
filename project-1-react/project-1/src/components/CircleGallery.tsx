import { useState } from "react";

type Props = {
  images: string[];
};

const CircleGallery = ({ images }: Props) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div
      className="gallery"
      style={{
        backgroundImage: `url(${activeImage})`,
      }}
    >
  
      <div className="overlay"></div>


      <div className="center">
  <img src={activeImage} alt="car" />
</div>

      <div className="circle">
        {images.map((img, i) => {
          const angle = (i / images.length) * 2 * Math.PI;
          const radius = 160;

          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={i}
              className="item"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <img
                src={img}
                onClick={() => setActiveImage(img)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircleGallery;