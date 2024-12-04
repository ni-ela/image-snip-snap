const imageMessageMapping: Record<string, string> = {
    notPossible: 'Não foi possível enviar o binário da imagem',
    serverError: 'Estamos com problemas no servidor, não foi possível processar a imagem',
    unsupportedFormat: 'Formato de imagem não suportado, selecione uma imagem png',
    unauthorized: 'Não há credenciais válidas para enviar a imagem',
    forbidden: 'Você não tem permissão para enviar a imagem',
    badGateway: 'Não foi possível conectar ao servidor',
}

export const Message = (status: string) => {
    return imageMessageMapping[status] || ''
}

export const responseStatusMapping: Record<number, string> = {
    400: Message('notPossible'),
    401: Message('unauthorized'),
    403: Message('forbidden'),
    415: Message('unsupportedFormat'),
    502: Message('badGateway'),
    500: Message('serverError'),
}