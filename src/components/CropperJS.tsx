import React, { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useImageContext } from "@/utils/ImageContext";
import { fetchImage } from "@/utils/fetchImage";
import styles from "@/styles/Home.module.css";

export const CropperJS: React.FC = () => {
  const { image, setCropData, cropData, setNewImage } = useImageContext();
  const cropperRef = useRef<ReactCropperElement>(null);

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            setCropData(reader.result as string);
          };
          reader.readAsArrayBuffer(blob);
        }
      });
    }
  };


  const sendImage = () => {
    getCropData();
    if (cropData) {
      const formData = new FormData();

      formData.append('file', new Blob([cropData]), 'cropped-image');

      fetchImage(formData)
        .then((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setNewImage(url);
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Cropper JS</h3>
      <div style={{ width: "100%" }}>
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      </div>
      <button onClick={sendImage} className={styles.button}>
        Enviar imagem
      </button>
    </div>
  );
};

export default CropperJS;
