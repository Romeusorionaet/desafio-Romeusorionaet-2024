import { calcEspacoDisponivelAposAdicao } from './helpers/calc-espaco-disponivel';
import { compararBiomas } from './helpers/comparar-biomas'
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

            if (!this.biomaEhApropriado(recinto, animalSelecionado)) return false;
            if (!this.espacoEhSuficiente(espacoDisponivel)) return false;
            if (this.hipopotamoNoRecintoComAnimal(recinto, animalSelecionado)) return false;
            if (this.conflitoDeEspecie(recinto, animalSelecionado)) return false;
            if (this.carnivoroNoRecintoIncompativel(recinto, animalSelecionado)) return false;
    
            return true;
        });
    }
    
    biomaEhApropriado(recinto, animalSelecionado) {
        return animalSelecionado.biomasApropriados.some(bioma => recinto.bioma.includes(bioma));
    }
    
    espacoEhSuficiente(espacoDisponivel) {
        return espacoDisponivel >= 0;
    }
    
    hipopotamoNoRecintoComAnimal(recinto, animalSelecionado) {
        const hipopotamo = animalSelecionado.animal === 'HIPOPOTAMO';
        const animalNoRecinto = recinto.animais.quantidade > 0;

        if (hipopotamo && animalNoRecinto) {
            return !compararBiomas(recinto.bioma, animalSelecionado.biomasApropriados);
        }

        return false;
    }
    
    conflitoDeEspecie(recinto, animalSelecionado) {
        const recintoVazio = recinto.animais.quantidade === 0;
        
        if (recintoVazio) return false;
        
        return animalSelecionado.carnivoro && recinto.animais.especie.animal !== animalSelecionado.animal;
    }
    
    carnivoroNoRecintoIncompativel(recinto, animalSelecionado) {
        return recinto.animais.especie.carnivoro && !animalSelecionado.carnivoro;
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
