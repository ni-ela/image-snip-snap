import React from "react";
import { useImageContext, defaultSrc } from "@/utils/ImageContext";
import styles from "@/styles/Home.module.css";
import { fetchImage } from "@/utils/fetchImage";

interface PreviewProps {
    lib: string;
}

export const Preview: React.FC<PreviewProps> = ({lib}) => {
    const { image, setImage, newImage, setNewImage, cropData } = useImageContext();

    const onChange = (e: any) => {
        e.preventDefault();
        let files;

        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        if (!files[0]) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div className={styles.menu}>
                {
                    lib === "CropperJS" ? (
                        <div className={styles.box}>
                            <h3 className={styles.topic}>Trecho selecionado da imagem</h3>
                            <div
                                className="img-preview"
                                style={{ width: "100%", height: "300px", overflow: "hidden" }}
                            />
                        </div>
                    ) : (
                        cropData && (
                            <div className={styles.box} style={{ textAlign: 'center', }}>
                                <h3 className={styles.topic}>Trecho selecionado da imagem</h3>
                                <img
                                    style={{ width: "100%", height: "300px", overflow: "hidden" }} src={cropData as string} alt="Cropped" />
                            </div>
                        )
                    )
                }
                <div className="box">
                    <h3 className={styles.topic}>Outras opções</h3>
                    <div className={styles.groupButtons}>
                        <button className={styles.button} onClick={() => setImage(defaultSrc)}>
                            Usar imagem padrão
                        </button>
                        <button className={styles.uploadImgButton}>
                            <input
                                className={styles.uploadInput}
                                type="file"
                                onChange={onChange}
                            />
                            Substituir imagem
                        </button>
                    </div>
                </div>
            </div>

            {newImage && (
                <div className={styles.box} style={{ marginTop: "40px" }}>
                    <h3 className={styles.topic}>Imagem sem fundo</h3>
                    <img src={newImage} alt="Imagem sem fundo" />
                </div>
            )}
        </div>
    );
};

export default Preview;
