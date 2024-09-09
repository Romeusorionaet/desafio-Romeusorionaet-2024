export const calcEspacoDisponivelAposAdicao = (recinto, animalSelecionado, quantidade) => {
    const espacoOcupado = recinto.animais.quantidade * (recinto.animais.especie?.tamanho || 0);

    const maisDeUmaEspecie = recinto.animais.especie && recinto.animais.especie.animal !== animalSelecionado.animal;
    const espacoExtra = maisDeUmaEspecie ? 1 : 0;
    
    const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
    
    return espacoDisponivel - (animalSelecionado.tamanho * quantidade);
};