onload = () => {

    /* Pega o valor do localStorage, caso exista algum valor já ativa o modo dark/light*/
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

    /* --- Seleciona os botões de operações */
    document.querySelector('#btn-soma').onclick = () => operacaoParaCalcular('+');
    document.querySelector('#btn-sub').onclick = () => operacaoParaCalcular('-');
    document.querySelector('#btn-div').onclick = () => operacaoParaCalcular('÷');
    document.querySelector('#btn-mult').onclick = () => operacaoParaCalcular('*');
    document.querySelector('#btn-igual').onclick = () => operacaoParaCalcular('=');
    // document.querySelector('#btn-igual').onclick = calcular;

};


/** Variaveis a serem usadas nas funções */
let valorClicado = '0'; //Armazena o valor clicado na tabuada.
let novoValor = true; //Usado para tratar quando vai ser um novo valor.
let valo1 = 0; // Valor acumulado para as operações e para o visor de operações.
let valor2 = 0; // Valor acumulado para as operações e para o visor de operações.
let operacaoAcumulada = null; //Fica esperando o próximo digito para fazer a operação.
let ultimaOperacao = null; //Acumula a última operação em caso de clicar no = para repetir a mesma operação.
let flagOperacao = null; // Flag para chamar a função de repetir função. 
let divisaoZero = false; //Para quando ocorrer a divisão por zero
/**
 * Muda para o modo Light ou modo Dark se clicar no checkbox ou label.
 * Em caso de mudar, atualiza o localStorage para saber quando o usuario voltar.
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
 * Faz um teste para não deixar passar de 21 digitos, por causa do estouro de casas.
 * Ao clicar em um botão, atualiza o visor de insersão de digitos.
 * Separa o valor que irá para o visor em inteiros e decimas. 
 * Se o valor estiver com '-', remove ele e depois passa por um for para colocar a ',' nos números inteiros a cada 3 casas 
 * para separar por mil, milhares, milhões e etc.
 * Faz a verificação para inteiros começando com 0 para tratar exemplos como 0.154
 * Dentro do else faz outra verificação para aceitar somente um número inteiros + '.'
 * e Por fim atualiza o número com inteiros e decimais, com a formatação de ',' e '.'
 */
const atualizarVisor = () => {
    if (valorClicado.length > 21) {
        valorClicado = valorClicado.substr(0, 21);
    }

    let partesNumero = valorClicado.split(',');
    let inteiros = partesNumero[0];
    let decimais = partesNumero[1];
    let valorAtualizado = '';
    let aux = 0;
    let flag = false;

    inteiros.indexOf('-') != -1 ? (inteiros = inteiros.slice(1), flag = true) : flag = false;

    for (let i = inteiros.length - 1; i >= 0; i--) {
        if (++aux > 3) {
            valorAtualizado = ',' + valorAtualizado;
            aux = 1;
        }
        valorAtualizado = inteiros[i] + valorAtualizado;
    }

    if (inteiros === '0' && decimais === '') {
        valorAtualizado = '0,';
    } else {
        if (inteiros > 0 && decimais === '') {
            valorAtualizado = valorAtualizado + ',';
        } else valorAtualizado = valorAtualizado + (decimais ? ',' + decimais.substr(0, 8) : '');
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
    if(divisaoZero == true){
        clearAll();
    }
    
    if (novoValor) {
        valorClicado = digito;
        novoValor = false;
    } else valorClicado === '0' ? valorClicado = '0' : (valorClicado += digito);
    atualizarVisor();
}

/**
 * Ai clicar no botão "C" simplesmente limpa todos os visores e zera todas as operações.
 * E restaura os valores padrões.
 */
const clearAll = () => {

    if(divisaoZero == true){
        habilitaOperacao();
        document.querySelector('#inserido').style.display = 'flex';
        document.querySelector('.error').style.display = "none";
    }

    document.querySelector('#inserido').innerText = "0";
    document.querySelector('#inserido-primeiro').innerText = '';
    valorClicado = '0';
    novoValor = true;
    operacaoAcumulada = null;
    ultimaOperacao = null;
    valor1 = 0;
    valor2 = 0;
    flagOperacao = null;
    divisaoZero = false;
}

/** 
 * Limpa o último digito inserido ou a última operação executada.
 */
const clearLast = () => {

    if(divisaoZero == true) {
        clearAll();
    }

    if (novoValor == false) {
        valorClicado = valorClicado.slice(0, valorClicado.length - 1);
    }

    if (valorClicado === "-0," || valorClicado === "0," || valorClicado === "-0") {
        valorClicado = '0';
        novoValor = true;
    }
    
    if(operacaoAcumulada == null) {
        document.querySelector('#inserido-primeiro').innerText = '';
        novoValor = true;
    }

    if (valorClicado.length == 0) {
        valorClicado = '0';
        novoValor = true;
    }

    if (operacaoAcumulada == '=') {
        novoValor = true;
        document.querySelector('#inserido-primeiro').innerText = '';
        operacaoAcumulada = null;
    }

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
    valorClicado.indexOf(',') === -1 ? (valorClicado = valorClicado + ",", atualizarVisor(), novoValor = false) : ev.preventDefault();
};

/* Converte os valores para números reais */
const converteValor = () => parseFloat(valorClicado.replace(',', '.'));

/**
 *  Pega o valor da operação, entra na função de calcular que fica esperando o valor para calculo.
 *  Faz testes com as operações para atualizar os visores e tratar caso tenha uma repetição de calculo. 
 */
const operacaoParaCalcular = (operacao) => {
    calcular();
    operacaoAcumulada = operacao;
    valor1 = converteValor();
    novoValor = true;
    
    if (operacaoAcumulada != '=') {
        ultimaOperacao = operacaoAcumulada;
        document.querySelector('#inserido-primeiro').innerText = valor1 + ' ' + operacaoAcumulada;
    } else {
        if (operacaoAcumulada == '=' && ultimaOperacao == null) {
            if(flagOperacao == '#'){
                document.querySelector('#inserido-primeiro').innerText = '';
            } else document.querySelector('#inserido-primeiro').innerText = valor1 + ' =';
        } else {
            if (ultimaOperacao == flagOperacao) {
                repetirOperacao();
            }
        }
    }
}

const desabilitaOperacao = () => {
    let botoes = document.querySelectorAll('.operacoes');
  
    botoes.forEach(botoes => {
        botoes.disabled = true;
    });
};

const habilitaOperacao = () => {
    let botoes = document.querySelectorAll('.operacoes');
                
    botoes.forEach(botoes => {
        botoes.disabled = false;
    });
}


/* Faz o calculo conforme pega os valores clicados de operação e números. 
*  Entra no Switch para fazer o calculo conforme a operação.
*  No final converte o valor para string para atualizar no visor.
*  Testa se a última operação é de "=" para ativar a função de repetirOperacao caso seja clicado em "=" novamente. 
*  Atualiza os valores globais para novas operações e por fim atualiza o visor.
 */
const calcular = () => {
    if (operacaoAcumulada != null && operacaoAcumulada != '=') {
        let resultado;
        divisaoZero = false;
        switch (operacaoAcumulada) {
            case '+':
                valor2 = converteValor();
                resultado = valor1 + valor2;
                document.querySelector('#inserido-primeiro').innerText = valor1 + ' ' + operacaoAcumulada + ' ' + valor2 + ' ' + '=';
                break;
            case '-':
                valor2 = converteValor();
                resultado = valor1 - valor2;
                document.querySelector('#inserido-primeiro').innerText = valor1 + ' ' + operacaoAcumulada + ' ' + valor2 + ' ' + '=';
                break;
            case '÷':
                valor2 = converteValor();
                if(valor2 == 0){
                    divisaoZero = true;
                } else {
                    resultado = valor1 / valor2;
                    document.querySelector('#inserido-primeiro').innerText = valor1 + ' ' + operacaoAcumulada + ' ' + valor2 + ' ' + '=';
                } 
                break;
            case '*':
                valor2 = converteValor();
                resultado = valor1 * valor2;
                document.querySelector('#inserido-primeiro').innerText = valor1 + ' ' + operacaoAcumulada + ' ' + valor2 + ' ' + '=';
                break;
        }

        if(divisaoZero){
            document.querySelector('#inserido').style.display = 'none';
            document.querySelector('.error').style.display = "flex";
            document.querySelector('#inserido-primeiro').innerText = valor1 + ' ÷';
            desabilitaOperacao();
        } else {
            valorClicado = resultado.toString().replace('.', ',');
            atualizarVisor();
        }
    }

    if (operacaoAcumulada == '=') {
        flagOperacao = ultimaOperacao;
    }

    if(divisaoZero == true && operacaoAcumulada == '='){
        clearAll();
        flagOperacao = '#';
    }

    operacaoAcumulada = null;
}

/**
 * Caso a operação "=" seja selecioanda duas vezes seguidas irá repetir a última operação, 
 * Irá pegar o resultado da última operação converter para números reais e aplicar a operação com o 
 * segundo valor da operação anterior. Tipo 1 + 1 = 2, então irá fazer 2(resultado) + 1(segundo valor)
 * Irá atualizar as variáveis globais e o visor.  
 */
const repetirOperacao = () => {
    let operando1 = document.querySelector('#inserido').innerText;
    operando1 = parseFloat(operando1.replace(',', '.'));

    let resultado;
    switch (ultimaOperacao) {
        case '+':
            resultado = operando1 + valor2;
            document.querySelector('#inserido-primeiro').innerText = operando1 + ' ' + ultimaOperacao + ' ' + valor2 + ' ' + '=';
            break;
        case '-':
            resultado = operando1 - valor2;
            document.querySelector('#inserido-primeiro').innerText = operando1 + ' ' + ultimaOperacao + ' ' + valor2 + ' ' + '=';
            break;
        case '÷':
            resultado = operando1 / valor2;
            document.querySelector('#inserido-primeiro').innerText = operando1 + ' ' + ultimaOperacao + ' ' + valor2 + ' ' + '=';
            break;
        case '*':
            resultado = operando1 * valor2;
            document.querySelector('#inserido-primeiro').innerText = operando1 + ' ' + ultimaOperacao + ' ' + valor2 + ' ' + '=';
            break;
    }
    operacaoAcumulada = null;
    valorClicado = resultado.toString().replace('.', ',');
    atualizarVisor();
}