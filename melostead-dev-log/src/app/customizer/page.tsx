"use client";

import Script from "next/script";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import variables from "../../../styles/variables.module.scss";

const ClassButton = ({
  setClassFunc,
  classId,
  playerClassName,
}: {
  setClassFunc: Function;
  classId: number;
  playerClassName: string;
}) => {
  return (
    <button
      onClick={() => {
        setClassFunc(classId);
      }}
    >
      {playerClassName}
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

const CustomizerCanvas = ({ id }: { id: string }) => {
  return <canvas id={id} width={500} height={500}></canvas>;
};

export default function CharacterCustomizer() {
  const DRAWING_X_POSITION = 175;
  const DRAWING_Y_POSITION = 100;

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

  const clearCanvases = (canvasNames: string[]) => {
    canvasNames.forEach((name) => {
      const canvas = document.querySelector(`#${name}`) as HTMLCanvasElement;

      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.globalCompositeOperation = "source-over";

      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  const createImages = (imgSources: string[]) => {
    const images: HTMLImageElement[] = [];

    const loadImage = (imgSrc: string) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imgSrc;
        image.onload = function () {
          images.push(image);
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
    const GRAYSCALE_SPRITES = ["Hair", "Pupil", "Body"] as const;

    const spriteType: (typeof GRAYSCALE_SPRITES)[number] | undefined =
      GRAYSCALE_SPRITES.find((spriteType) => image.src.includes(spriteType));

    const EYE_COLORS = [
      variables.eyeBrown,
      variables.eyeLightBrown,
      variables.eyeBlue,
      variables.eyeLightBlue,
      variables.eyeGreen,
      variables.eyeGray,
      variables.eyePurple,
      variables.eyeRed,
    ];

    const HAIR_COLORS = [
      variables.hairDarkBrown,
      variables.hairBrown,
      variables.hairLightBrown,
      variables.hairBlonde,
      variables.hairWhite,
      variables.hairGray,
      variables.hairBlack,
      variables.hairRed,
      variables.hairGinger,
      variables.hairPink,
      variables.hairBlue,
      variables.hairGreen,
      variables.hairPurple,
    ];

    const SKIN_COLORS = [
      variables.skinFair,
      variables.skinLight,
      variables.skinPeach,
      variables.skinTan,
      variables.skinMed,
      variables.skinDarkCool,
      variables.skinDarkWarm,
      variables.skinDark,
      variables.skinDarkDeep,
    ];

    let canvas: HTMLCanvasElement;

    if (spriteType) {
      canvas = document.querySelector(
        `#${spriteType}Canvas`
      ) as HTMLCanvasElement;
    } else {
      canvas = document.querySelector("#glCanvas") as HTMLCanvasElement;
    }

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    context.globalCompositeOperation = "source-over";
    context.drawImage(image, DRAWING_X_POSITION, DRAWING_Y_POSITION);

    if (spriteType) {
      context.globalCompositeOperation = "source-atop";

      if (image.src.includes("Hair")) {
        context.fillStyle = HAIR_COLORS[hairColorId];
      } else if (image.src.includes("Pupil")) {
        context.fillStyle = EYE_COLORS[eyeColorId];
      } else {
        context.fillStyle = SKIN_COLORS[skinColorId];
      }

      context.globalAlpha = 0.5;
      context.fillRect(
        DRAWING_X_POSITION,
        DRAWING_Y_POSITION,
        image.width,
        image.height
      );

      //context.globalCompositeOperation = "source-over";

      context.drawImage(image, DRAWING_X_POSITION, DRAWING_Y_POSITION);
    }

    context.globalAlpha = 1.0;
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
      hairImgSrc,
      pupilImgSrc,
      eyeBaseImgSrc,
      clothingImgSrc,
    ]);

    return () => {
      document.body.removeChild(script);
    };
  }, [bodyId, eyeId, hairId, classId, eyeColorId, hairColorId, skinColorId]);

  useEffect(() => {
    const script = document.createElement("script");

    document.body.appendChild(script);

    if (imagesList.length >= 5) {
      clearCanvases(["glCanvas", "BodyCanvas", "HairCanvas", "PupilCanvas"]);

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
      <div className={variables.Customizer}>
        <div className={variables.CanvasLayer}>
          <CustomizerCanvas id={"BodyCanvas"}></CustomizerCanvas>
          <CustomizerCanvas id={"glCanvas"}></CustomizerCanvas>
          <CustomizerCanvas id={"HairCanvas"}></CustomizerCanvas>
          <CustomizerCanvas id={"PupilCanvas"}></CustomizerCanvas>
        </div>
        <div className={variables.CustomizationPanel}>
          <h3>Body Type</h3>
          <button onClick={handleBodyTypeA}>A</button>
          <button onClick={handleBodyTypeB}>B</button>
          <ChangeFeatureComponent
            featureStateHook={setSkinColorId}
            currentFeatureId={skinColorId}
            featureName="Skin Tone"
            amountOfFeatures={9}
          ></ChangeFeatureComponent>
          <h3>Class</h3>
          <ClassButton
            setClassFunc={setClassId}
            classId={0}
            playerClassName="Alchemist"
          ></ClassButton>
          <ClassButton
            setClassFunc={setClassId}
            classId={1}
            playerClassName="Blacksmith"
          ></ClassButton>
          <ClassButton
            setClassFunc={setClassId}
            classId={2}
            playerClassName="Woodworker"
          ></ClassButton>
          <ChangeFeatureComponent
            featureStateHook={setEyeId}
            currentFeatureId={eyeId}
            featureName="Eye Shape"
            amountOfFeatures={16}
          ></ChangeFeatureComponent>
          <ChangeFeatureComponent
            featureStateHook={setEyeColorId}
            currentFeatureId={eyeColorId}
            featureName="Eye Color"
            amountOfFeatures={8}
          ></ChangeFeatureComponent>
          <ChangeFeatureComponent
            featureStateHook={setHairId}
            currentFeatureId={hairId}
            featureName="Hair Style"
            amountOfFeatures={39}
          ></ChangeFeatureComponent>
          <ChangeFeatureComponent
            featureStateHook={setHairColorId}
            currentFeatureId={hairColorId}
            featureName="Hair Color"
            amountOfFeatures={13}
          ></ChangeFeatureComponent>
        </div>
      </div>
    </>
  );
}
