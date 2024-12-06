import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "@/styles/Home.module.css";
import localImage from "@/../public/sobre-a-mesa.png";

const defaultSrc = localImage.src;

export const CropperJS: React.FC = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (!files[0]) {
      return
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            setCropData(reader.result as any);
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
      formData.append('functionName', 'sendBinaryImage');

      fetch('/api/image', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Imagem enviada com sucesso");
          } else {
            console.log("Não foi possível enviar a imagem");
          }

          console.log(response);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  }

  return (
    <div>
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
      <div className={styles.menu}>
        <div className={styles.box}>
          <h3 className={styles.topic}>Trecho selecionado da imagem</h3>
          <div
            className="img-preview"
            style={{ width: "100%", height: "300px", overflow: "hidden" }}
          />
        </div>
        <div className="box">
          <h3 className={styles.topic}>Opções</h3>
          <div className={styles.groupButtons}>
            <button className={styles.button} onClick={(e) => setImage(defaultSrc)}>Usar imagem padrão</button>
            <button
              className={styles.uploadImgButton}>
              <input className={styles.uploadInput} type="file" onChange={onChange} />
              Substituir imagem</button>

            <button onClick={sendImage} className={styles.button}>
              Enviar imagem
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CropperJS;
