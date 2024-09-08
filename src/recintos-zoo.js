import { calcEspacoDisponivelAposAdicao } from './helpers/calc-espaco-disponivel';
import { animais } from './data/animal';
import { recintos } from './data/recinto';

class RecintosZoo {
    constructor() {
        this.animais = animais;
        this.recintos = recintos;
    }

    verificarEspacoDisponivel(animalSelecionado, quantidade) {
        return this.recintos.filter((recinto) => {
            const espacoDisponivel = calcEspacoDisponivelAposAdicao(recinto, animalSelecionado, quantidade);
            
            const biomaApropriado = animalSelecionado.biomasApropriados.some(bioma => recinto.bioma.includes(bioma))

            if (!biomaApropriado) {
                return false;
            }

            const espacoSuficiente = espacoDisponivel < (animalSelecionado.tamanho * quantidade)
            
            if (espacoSuficiente) {
                return false;
            }

            const recintoVazio = recinto.animais.quantidade === 0
            
            if (recintoVazio) {
                return true;
            }

            const conflitoDeEspecie = animalSelecionado.carnivoro && recinto.animais.especie.animal !== animalSelecionado.animal
            
            if (conflitoDeEspecie) {
                return false;
            }
            
            const carnivoroJaNoRecinto = recinto.animais.especie.carnivoro && !animalSelecionado.carnivoro;

            if (carnivoroJaNoRecinto) {
                return false;
            }
            
            return true;
        });
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
    
        const recintosViaveis = this.verificarEspacoDisponivel(animalSelecionado, quantidade);

        if (recintosViaveis.length === 0) {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: false,
            };
        }
        
        const result = recintosViaveis.map((recinto) => {
            const indexOriginal = this.recintos.indexOf(recinto);
            const espacoDisponivel = calcEspacoDisponivelAposAdicao(recinto, animalSelecionado, quantidade);
        
            return `Recinto ${indexOriginal + 1} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanhoTotal})`;
        });

        return {
            recintosViaveis: result,
        };
    }
}

export { RecintosZoo as RecintosZoo };
