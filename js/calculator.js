
onload = () => {
    const modeLight = localStorage.getItem('modeLightActive');

    if(modeLight) {
        document.querySelector('body').setAttribute("light", "true");
        document.querySelector(".btn-mode").innerHTML = "Dark Mode";
        document.querySelector('#btn-mode-light').checked = true;
    }

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

    /* --- Seleciona os botões de apagar tudo e apagar último digito */
    document.querySelector('#btn-clearAll').onclick = clearAll;
    document.querySelector('#btn-clearLast').onclick = clearLast;
};


/** Variaveis a serem usadas nas funções */
let valorClicado = '0';
let novoValor = true;


/**
 * Muda para o modo Light ou modo Dark se clicar no chebox ou label.
 * Em caso de selecionar, atualiza o localStorage para saber quando o usuario voltar.
 */
const modeDark = ()=> {
    if(document.querySelector('#btn-mode-light').checked) {
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
 */
const atualizaVisor = ()=> {
    document.querySelector('#inserido').innerText = valorClicado;
} 

/**
 * Ao clicar em algum botão de digito pega o valor e manda para a função de atualizar visor.
 * Verifica se o valor é novo para a primeira insersão para não deixar o zero do visor inicial junto.
 * E atualiza a variável booleana para false.
 */
const cliqueBotaoDigito = (digito) => {
    if(novoValor){
        valorClicado = digito;
        novoValor = false;
    } else 
        valorClicado += digito;
        atualizaVisor();
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
 * Limpa o último digito inserido. Se o último digito for "0" ou com tamanho igual a 1 então zera o visor e atualiza as variáveis.
 * Caso contrario atualiza o valor atual no visor. 
 */
const clearLast = () => {
    if (valorClicado.length === 1 || valorClicado === "0") {
        valorClicado = '0';
        novoValor = true;
    } else valorClicado = valorClicado.slice(0, valorClicado.length - 1);
    atualizaVisor();
}