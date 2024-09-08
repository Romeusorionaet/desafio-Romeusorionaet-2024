import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {
    let recintosZoo;

    beforeEach(() => {
        recintosZoo = new RecintosZoo();
        
        recintosZoo.recintos[0].animais = { especie: recintosZoo.animais[3], quantidade: 3 }; // 3 macacos
        recintosZoo.recintos[2].animais = { especie: recintosZoo.animais[4], quantidade: 1 }; // 1 gazela
        recintosZoo.recintos[4].animais = { especie: recintosZoo.animais[0], quantidade: 1 }; // 1 leão
    });

    test('Deve rejeitar animal inválido', () => {
        const resultado = recintosZoo.analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = recintosZoo.analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = recintosZoo.analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = recintosZoo.analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = recintosZoo.analisaRecintos('MACACO', 2);

        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });
});
