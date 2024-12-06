import CropperJS from "@/components/CropperJS";
import { ReactEasyCrop } from "@/components/ReactEasyCrop";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('CropperJS');

  return (
    <div
      className={styles.page}
    >
      <h1>
        PoC - recorte e seleção de imagem
      </h1>
      <div style={{ display: 'flex', columnGap: '20px' }}>
        <a className={styles.a} onClick={() => setActiveTab('CropperJS')}>CropperJS</a>
        <a className={styles.a} onClick={() => setActiveTab('ReactEasyCrop')}>ReactEasyCrop</a>
      </div>
      <div>
        {activeTab === 'CropperJS' && <CropperJS />}
        {activeTab === 'ReactEasyCrop' && <ReactEasyCrop />}
      </div>
    </div>
  );
}
