import CropperJS from "@/components/CropperJS";
import styles from "@/styles/Home.module.css";

async function sendBinaryImage(imageFile : File) {
  const arrayBuffer = await imageFile.arrayBuffer();

  const binaryBlob = new Blob([arrayBuffer], { type: imageFile.type });

  const response = await fetch('/api/image', {
    method: 'POST',
    body: binaryBlob,
    headers: {
      'Content-Type': imageFile.type,
    },
  })

  return response.status == 200;
}

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
