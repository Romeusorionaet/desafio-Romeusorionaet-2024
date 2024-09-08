class RecintosZoo {
    constructor() {
        this.animais = [
            { animal: 'LEAO', tamanho: 3, carnivoro: true, biomasApropriados: ['savana'] },
            { animal: 'LEOPARDO', tamanho: 2, carnivoro: true, biomasApropriados: ['savana'] },
            { animal: 'CROCODILO', tamanho: 3, carnivoro: true, biomasApropriados: ['rio'] },
            { animal: 'MACACO', tamanho: 1, carnivoro: false, biomasApropriados: ['floresta', 'savana'] },
            { animal: 'GAZELA', tamanho: 2, carnivoro: false, biomasApropriados: ['savana'] },
            { animal: 'HIPOPOTOMO', tamanho: 4, carnivoro: false, biomasApropriados: ['savana', 'rio'] },
        ];

        this.recintos = [
            {
                bioma: ['savana'],
                tamanhoTotal: 10,
                animais: { especie: '', quantidade: 0 },
            },
            {
                bioma: ['floresta'],
                tamanhoTotal: 5,
                animais: { especie: '', quantidade: 0 },
            },
            {
                bioma: ['savana', 'rio'],
                tamanhoTotal: 7,
                animais: { especie: '', quantidade: 0 },
            },
            {
                bioma: ['rio'],
                tamanhoTotal: 8,
                animais: { especie: '', quantidade: 0 },
            },
            {
                bioma: ['savana'],
                tamanhoTotal: 9,
                animais: { especie: '', quantidade: 0 },
            },
        ];
    }

    analisaRecintos(animal, quantidade) {
        if (quantidade < 1) {
            return {
                erro: "Quantidade inválida",
                recintosViaveis: false,
            };
        }
    
        const animalSelecionado = this.animais.find((a) => a.animal === animal);
        if (!animalSelecionado) {
            return {
                erro: "Animal inválido",
                recintosViaveis: false,
            };
        }
    
        const recintosViaveis = this.recintos.filter((recinto) => {
            const espacoOcupado = recinto.animais.quantidade * (recinto.animais.especie?.tamanho || 0);

            // Se houver mais de uma espécie no recinto, adicionar 1 ao espaço ocupado
            const maisDeUmaEspecie = recinto.animais.especie && recinto.animais.especie.animal !== animalSelecionado.animal;
            const espacoExtra = maisDeUmaEspecie ? 1 : 0;

            const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
    
            // Verifica se pelo menos um dos biomas do recinto é apropriado para o animal
            if (!animalSelecionado.biomasApropriados.some(bioma => recinto.bioma.includes(bioma))) {
                return false;
            }
    
            // Verifica se há espaço disponível suficiente
            if (espacoDisponivel < (animalSelecionado.tamanho * quantidade)) {
                return false;
            }
    
            // Se o recinto estiver vazio, ele é viável se o bioma e o espaço forem adequados
            if (recinto.animais.quantidade === 0) {
                return true;
            }
    
            // Se o animal for carnívoro, não pode ser colocado com outra espécie
            if (animalSelecionado.carnivoro && recinto.animais.especie.animal !== animalSelecionado.animal) {
                return false;
            }
    
            // Se o recinto já contiver um animal carnívoro, o novo animal deve ser carnívoro
            if (recinto.animais.especie.carnivoro && !animalSelecionado.carnivoro) {
                return false;
            }
    
            return true;
        });

        if (recintosViaveis.length === 0) {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: false,
            };
        }

        const result = recintosViaveis.map((recinto) => {
            const indexOriginal = this.recintos.findIndex((r) => r === recinto);
            const espacoOcupado = recinto.animais.quantidade * (recinto.animais.especie?.tamanho || 0);
            const maisDeUmaEspecie = recinto.animais.especie && recinto.animais.especie.animal !== animalSelecionado.animal;
            const espacoExtra = maisDeUmaEspecie ? 1 : 0;
            const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
            const espacoDisponivelAposAdicao = espacoDisponivel - (animalSelecionado.tamanho * quantidade);

            return `Recinto ${indexOriginal + 1} (espaço livre: ${espacoDisponivelAposAdicao} total: ${recinto.tamanhoTotal})`;
        });

        return {
            recintosViaveis: result,
        };
    }
}

export { RecintosZoo as RecintosZoo };
