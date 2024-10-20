"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const ClassButton = ({
  setClassFunc,
  classId,
  className,
}: {
  setClassFunc: Function;
  classId: number;
  className: string;
}) => {
  return (
    <button
      onClick={() => {
        setClassFunc(classId);
      }}
    >
      {className}
    </button>
  );
};

const ChangeFeatureComponent = ({
  featureStateHook,
  currentFeatureId,
  featureName,
  amountOfFeatures,
}: {
  featureStateHook: Function;
  currentFeatureId: number;
  featureName: string;
  amountOfFeatures: number;
}) => {
  const handleIncrement = () => {
    featureStateHook((currentFeatureId + 1) % amountOfFeatures);
  };

  const handleDecrement = () => {
    featureStateHook(
      currentFeatureId - 1 < 0 ? amountOfFeatures : currentFeatureId - 1
    );
  };

  return (
    <>
      <h3>{featureName}</h3>
      <button onClick={handleDecrement}>Prev</button>
      <p>{currentFeatureId}</p>
      <button onClick={handleIncrement}>Next</button>
    </>
  );
};

export default function CharacterCustomizer() {
  const [bodyId, setBodyId] = useState(0);
  const [classId, setClassId] = useState(0);

  const [hairId, setHairId] = useState(0);
  const [hairColorId, setHairColorId] = useState(0);

  const [skinColorId, setSkinColorId] = useState(0);

  const [eyeId, setEyeId] = useState(0);
  const [eyeColorId, setEyeColorId] = useState(0);

  const [imagesList, setImagesList] = useState<HTMLImageElement[]>([]);
  // const [imagesLoaded, setImagesLoaded] = useState(false);
  // let imagesLoaded: HTMLImageElement[] = [];

  const handleBodyTypeA = () => {
    setBodyId(0);
  };

  const handleBodyTypeB = () => {
    setBodyId(1);
  };

  const createImages = (imgSources: string[]) => {
    const images: HTMLImageElement[] = [];

    const loadImage = (imgSrc: string) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imgSrc;
        image.onload = function () {
          images.push(image);
          console.log(images);
          resolve(imgSrc);
        };

        image.onerror = function (err) {
          reject(err);
        };
      });
    };

    Promise.all(imgSources.map((imgSrc) => loadImage(imgSrc))).then(() => {
      setImagesList(images);
    });
  };

  const drawImage = (image: HTMLImageElement) => {
    const GRAYSCALE_SPRITES = ["Hair", "Pupil", "Body"];

    const canvas = document.querySelector("#glcanvas") as HTMLCanvasElement;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 1.0;

    if (!image.complete) {
      console.log(`${image.src} IS NOT LOADED`);
    }
    context.drawImage(image, 100, 100);

    //   Create colored mask

    const isGrayscale = GRAYSCALE_SPRITES.find((spriteType) =>
      image.src.includes(spriteType)
    );

    if (isGrayscale) {
      //   console.log("GRAYSCALE");
      //   console.log(image.src);
      //   context.globalAlpha = 0.8;
      //   context.globalCompositeOperation = "source-in";
      //   console.log(context.globalCompositeOperation);
      //   context.fillStyle = "blue";
      //   context.fillRect(0, 0, 500, 500);

      context.globalAlpha = 1.0;

      // Multiply mask by original image to get final colored image
      // context.globalCompositeOperation = "multiply";
      // context.drawImage(image, 100, 100);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");

    document.body.appendChild(script);

    const bodyImgSrc =
      bodyId === 0
        ? "../characterCreator/BodyA.png"
        : "../characterCreator/BodyB.png";

    let className;
    switch (classId) {
      case 0:
        className = "Alchemist";
        break;
      case 1:
        className = "Blacksmith";
        break;
      case 2:
        className = "Woodworker";
        break;
      default:
        className = "Alchemist";
        break;
    }

    const clothingImgSrc = `../characterCreator/clothing/${className}${
      bodyId === 0 ? "A" : "B"
    }.png`;

    const eyeBaseImgSrc = `../characterCreator/eyes/EyeBase${eyeId}.png`;
    const pupilImgSrc = `../characterCreator/eyes/Pupil${eyeId}.png`;

    const hairImgSrc = `../characterCreator/hair/Hair${hairId}.png`;

    createImages([
      bodyImgSrc,
      clothingImgSrc,
      eyeBaseImgSrc,
      pupilImgSrc,
      hairImgSrc,
    ]);

    return () => {
      document.body.removeChild(script);
    };
  }, [bodyId, eyeId, hairId, classId]);

  useEffect(() => {
    console.log("second effect");
    console.log(imagesList);

    const script = document.createElement("script");

    document.body.appendChild(script);

    if (imagesList.length >= 5) {
      const canvas = document.querySelector("#glcanvas") as HTMLCanvasElement;

      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.globalCompositeOperation = "source-over";

      context.clearRect(0, 0, canvas.width, canvas.height);
      imagesList.forEach((image: HTMLImageElement) => {
        drawImage(image);
      });
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [imagesList]);

  return (
    <>
      <img
        id="BodyA"
        src="/characterCreator/BodyA.png"
        alt="Pixel Sprite of Feminine Body for Character Customization"
        width={100}
        height={200}
        style={{ display: "none" }}
      ></img>
      <canvas id="glcanvas" width={500} height={500}></canvas>
      <Script src="/scripts/characterCreator.js"></Script>
      <h3>Body Type</h3>
      <button onClick={handleBodyTypeA}>A</button>
      <button onClick={handleBodyTypeB}>B</button>
      <h3>Class</h3>
      <ClassButton
        setClassFunc={setClassId}
        classId={0}
        className="Alchemist"
      ></ClassButton>
      <ClassButton
        setClassFunc={setClassId}
        classId={1}
        className="Blacksmith"
      ></ClassButton>
      <ClassButton
        setClassFunc={setClassId}
        classId={2}
        className="Woodworker"
      ></ClassButton>
      <ChangeFeatureComponent
        featureStateHook={setEyeId}
        currentFeatureId={eyeId}
        featureName="Eye Shape"
        amountOfFeatures={16}
      ></ChangeFeatureComponent>
      <ChangeFeatureComponent
        featureStateHook={setHairId}
        currentFeatureId={hairId}
        featureName="Hair Style"
        amountOfFeatures={39}
      ></ChangeFeatureComponent>
    </>
  );
}
