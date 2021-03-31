onload = () => {
    
    /* Pega o valor do localStorage, caso exita algum valor já ativa o modo dark/light*/
    const modeLight = localStorage.getItem('modeLightActive');
    if (modeLight) {
        document.querySelector('body').setAttribute("light", "true");
        document.querySelector(".btn-mode").innerHTML = "Dark Mode";
        document.querySelector('#btn-mode-light').checked = true;
    }

    /* --- Seleciona o checkbox para ativar/desativar o modo dark */
    document.querySelector('#btn-mode-light').onclick = modeDark;

    /* --- Seleciona o botão clicado e envia para a função cliqueBotaoDigito */
    document.querySelector('#btn-0').onclick = () => cliqueBotaoDigito('0');
    document.querySelector('#btn-1').onclick = () => cliqueBotaoDigito('1');
    document.querySelector('#btn-2').onclick = () => cliqueBotaoDigito('2');
    document.querySelector('#btn-3').onclick = () => cliqueBotaoDigito('3');
    document.querySelector('#btn-4').onclick = () => cliqueBotaoDigito('4');
    document.querySelector('#btn-5').onclick = () => cliqueBotaoDigito('5');
    document.querySelector('#btn-6').onclick = () => cliqueBotaoDigito('6');
    document.querySelector('#btn-7').onclick = () => cliqueBotaoDigito('7');
    document.querySelector('#btn-8').onclick = () => cliqueBotaoDigito('8');
    document.querySelector('#btn-9').onclick = () => cliqueBotaoDigito('9');

    /* --- Seleciona os botões de apagar tudo, apagar último digito, negativar número e colocar ponto*/
    document.querySelector('#btn-clearAll').onclick = clearAll;
    document.querySelector('#btn-clearLast').onclick = clearLast;
    document.querySelector('#btn-negative').onclick = negativeNumber;
    document.querySelector('#btn-ponto').onclick = colocaPonto;
};


/** Variaveis a serem usadas nas funções */
let valorClicado = '0';
let novoValor = true;


/**
 * Muda para o modo Light ou modo Dark se clicar no chebox ou label.
 * Em caso de selecionar, atualiza o localStorage para saber quando o usuario voltar.
 */
const modeDark = () => {
    if (document.querySelector('#btn-mode-light').checked) {
        document.querySelector('body').setAttribute("light", "true");
        document.querySelector(".btn-mode").innerText = "Dark Mode";
        localStorage.setItem('modeLightActive', true);
    } else {
        document.querySelector('body').removeAttribute("light");
        document.querySelector(".btn-mode").innerText = "Light Mode";
        localStorage.removeItem('modeLightActive');
    }
}

/**
 * Ao clicar em botão atualiza o visor de insersão de digitos.
 * Separa o valor que irá para o visor em inteiros e decimas. 
 * Se o valor estiver com '-', remove ele e depois passa por um for para colocar a ',' nos números inteiros a cada 3 casas 
 * para separar por mil, milhares, milhões e etc.
 * Faz a verificação para inteiros começando com 0 para tratar exemplos como 0.154
 * Dentro do else faz outra verificação para aceitar somente um número inteiros + '.'
 * e Por fim atualiza o número com inteiros e decimais, com a formatação de ',' e '.'
 */
const atualizarVisor = () => {
    let partesNumero = valorClicado.split('.');
    let inteiros = partesNumero[0];
    let decimais = partesNumero[1];
    let valorAtualizado = '';
    let aux = 0;
    let flag = false;
   
    inteiros.indexOf('-') != -1 ? ( inteiros = inteiros.slice(1), flag = true ): flag = false;
   
    for (let i = inteiros.length - 1; i >= 0; i--) {
        if (++aux > 3) {
            valorAtualizado = ',' + valorAtualizado;
            aux = 1;
        }
        valorAtualizado = inteiros[i] + valorAtualizado;
    }

    if ( inteiros === '0' && decimais === '') {
        valorAtualizado = '0.';   
    } else {
        if(inteiros > 0 && decimais === '') {
            valorAtualizado = valorAtualizado + '.';
        } else valorAtualizado = valorAtualizado + (decimais ? '.' + decimais : '');
    }    
    if (flag) {
        document.querySelector('#inserido').innerText = '-' + valorAtualizado;
    } else document.querySelector('#inserido').innerText = valorAtualizado;
}

/**
 * Ao clicar em algum botão de digito pega o valor e manda para a função atualizarVisor().
 * Verifica se o valor é novo para a primeira insersão para não deixar o zero do visor inicial junto. Ex: 02
 * E se o novo valor for 0 na primeira insersão simplesmente só atualiza a variável novoValor pra true para não fica inserindo
 * zero consecutivos. Ex:000000 
 * E atualiza a variável booleana para false.
 */
const cliqueBotaoDigito = (digito) => {
    if (novoValor) {
        digito === '0' ? (novoValor = true) : (valorClicado = digito, novoValor = false);
    } else valorClicado += digito;
    atualizarVisor();
}

/**
 * Ai clicar no botão "C" simplesmente limpa todos os visores e zera todas as operações.
 * E restaura os valores padrões.
 */
const clearAll = () => {
    document.querySelector('#inserido').innerText = "0";
    valorClicado = '0';
    novoValor = true;
}

/** 
 * Se o ditio for "-0." ou 0. e clicar em zerar o valor e definido para "0".
 * Se o valor for de tamanho 2 e tiver com o "-" então zera o valor. Ex: "-2"
 * Limpa o último digito inserido. Se o último digito for "0" ou com tamanho igual a 1 então zera o visor e atualiza as variáveis.
 * Caso contrario atualiza o valor atual no visor. 
 */
const clearLast = () => {

    if (valorClicado === "-0." || valorClicado === "0.") {
        valorClicado = '0';
        novoValor = true;
    }

    if (valorClicado.length === 2 && valorClicado.indexOf('-') != -1) {
        valorClicado = '0';
        novoValor = true;
    }

    if (valorClicado.length === 1 || valorClicado === "0") {
        valorClicado = '0';
        novoValor = true;
    } else valorClicado = valorClicado.slice(0, valorClicado.length - 1);
    atualizarVisor();
}

/**
 * Ao clicar no botão de +/- irá negativar o número ou não.
 * Verifica a existencia do '-' com indexOf, se retornar -1 verifica o valor já digitado.
 *     - Se o valor for zero então ativa ev.preventDefault, caso contrário adiciona '-' a frente do valor. 
 * Caso tenha a existencia '-' o mesmo é removido com o metodo slice do (1, ao final da string[número]) 
 */

const negativeNumber = (ev) => {
    if (valorClicado.indexOf('-') === -1) {
        valorClicado === "0" ? ev.preventDefault() : valorClicado = "-" + valorClicado;
    } else valorClicado = valorClicado.slice(1, valorClicado.length);
    atualizarVisor();
}

/**
 * Coloca o ponto para número flutuante
 * Verifica a existencia do '.' com indexOf, se retornar -1 então coloca o ponto no número e chama a função de atualizarVisor,
 * caso já tenha o ponto simplesmente faz ev.prenventDefault()
 */
const colocaPonto = (ev) => {
    valorClicado.indexOf('.') === -1 ? ( valorClicado = valorClicado + ".", atualizarVisor(), novoValor = false ) : ev.preventDefault();
};