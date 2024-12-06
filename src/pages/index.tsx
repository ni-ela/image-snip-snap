import CropperJS from "@/components/CropperJS";
import { ReactEasyCrop } from "@/components/ReactEasyCrop";
import { useState } from "react";
import { ImageProvider } from "@/utils/ImageContext";
import styles from "@/styles/Home.module.css";
import Preview from "@/components/Preview";

export default function Home() {
  const [activeTab, setActiveTab] = useState("CropperJS");

  return (
    <ImageProvider>
      <div className={styles.page}>
        <h1>PoC - recorte e seleção de imagem</h1>
        <div style={{ display: "flex", columnGap: "20px" }}>
          <a className={styles.a} onClick={() => setActiveTab("CropperJS")}>
            CropperJS
          </a>
          <a className={styles.a} onClick={() => setActiveTab("ReactEasyCrop")}>
            React Easy Crop
          </a>
        </div>
        <div>
          {activeTab === "CropperJS" && <CropperJS />}
          {activeTab === "ReactEasyCrop" && <ReactEasyCrop />}
        </div>
        <Preview lib={activeTab} />
      </div>
    </ImageProvider>
  );
}
