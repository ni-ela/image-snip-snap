import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "@/styles/Home.module.css";
import localImage from "@/../public/sobre-a-mesa.png";
import { fetchImage } from "@/utils/fetchImage";

const defaultSrc = localImage.src;

export const CropperJS: React.FC = () => {
  const [image, setImage] = useState(defaultSrc);
  const [newImage, setNewImage] = useState("");
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
      formData.append('file', new Blob([image]), 'original-image');

      fetchImage(formData).then((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setNewImage(url);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });;
    }
  }

  return (
    <div style={{ textAlign: 'center'}}>
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
        {
          newImage && (
            <div className={styles.box} style={{marginTop: '40px'}}>
              <h3 className={styles.topic}>Imagem sem fundo</h3>
              <img src={newImage} alt="Imagem sem fundo" />
            </div>
          )
        }
    </div >
  );
};

export default CropperJS;
