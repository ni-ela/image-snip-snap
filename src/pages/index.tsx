import CropperJS from "@/components/CropperJS";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div
        className={styles.page}
      >
        <h1>
          PoC - recorte e seleção de imagem
        </h1>
        <CropperJS />
      </div>
    </>
  );
}
