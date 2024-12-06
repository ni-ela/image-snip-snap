import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import styles from "@/styles/Home.module.css";
import { useImageContext } from '@/utils/ImageContext';
import { fetchImage } from '@/utils/fetchImage';

export const ReactEasyCrop = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const { image, setCropData, setNewImage, cropData } = useImageContext();

    const getCroppedImg = (imageSrc: string, pixelCrop: any, fileName: string) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        const image = new Image();
        image.src = imageSrc;

        return new Promise((resolve, reject) => {
            image.onload = () => {
                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height
                );
                const base64Image = canvas.toDataURL('image/jpeg');
                resolve(base64Image);
            };
            image.onerror = reject;
        });
    };

    const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
        const binaryString = atob(base64.split(',')[1]);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    const sendImage = () => {
        const arrayBuffer = base64ToArrayBuffer(cropData);
        if (arrayBuffer) {
            const formData = new FormData();

            formData.append('file', new Blob([arrayBuffer]), 'cropped-image');

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

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        getCroppedImg(image, croppedAreaPixels, 'cropped-image')
            .then((cropData) => {
                setCropData(cropData as string);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h3>
                React Easy Crop
            </h3>
            <div className={styles.baseReactEasyCrop}>

                <div className={styles.cropContainer}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            </div>
            <button onClick={sendImage} className={styles.button}>
                Enviar imagem
            </button>
        </div>
    )
}
