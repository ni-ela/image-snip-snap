export function fetchImage(formData) {
    return fetch('/api/image', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                console.log("Imagem enviada com sucesso");
                return response.blob();
            } else {
                console.error("Não foi possível enviar a imagem");
            }
        });
}