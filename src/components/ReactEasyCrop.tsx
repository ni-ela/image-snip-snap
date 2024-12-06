import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import styles from "@/styles/Home.module.css";

import localImage from "@/../public/sobre-a-mesa.png";
const defaultSrc = localImage.src;

export const ReactEasyCrop = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedImage, setCroppedImage] = useState("")

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


    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        getCroppedImg(defaultSrc, croppedAreaPixels, 'cropped-image')
            .then((croppedImage) => {
                setCroppedImage(croppedImage as string);
            })
            .catch((error) => console.error(error));
    };
    return (
        <>
            <h3 style={{ textAlign: 'center' }}>
                React Easy Crop
            </h3>
            <div className={styles.baseReactEasyCrop}>

                <div className={styles.cropContainer}>
                    <Cropper
                        image={defaultSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            </div>
            {croppedImage && (
                <div className={styles.box} style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h4>Trecho selecionado da imagem</h4>
                    <img src={croppedImage as string} style={{ height: '303px', width: '303'}} alt="Cropped" />
                </div>
            )}
        </>
    )
}
