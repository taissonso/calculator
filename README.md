# :heavy_plus_sign: :heavy_minus_sign: calculator :heavy_division_sign: :heavy_multiplication_x:
## https://taissonso.github.io/calculator/

 Calculadora com operações básicas de soma, subtração, divisão e multiplicação. 

- Modo dark: irá mudar as cores da calculadora e fundo. Por padrão irá abrir no modo dark, caso o usuário mude para o modo light o mesmo irá salvar no localstorage o modo light para caso o usuário volte irá carregar o mesmo, se voltar para o modo dark o localstorage e deletado e deixando o modo dark como padrão.  

- Botão de divisão: quando for feita a divisão por zero, irá mostrar uma mensagem de erro alertando o usuário que não é possível fazer divisão por zero, desativando os botões de operações, negativar número e ponto. 
  - Os botões voltam a ficar ativos quando clicado em qualquer botão de digito, igual ou limpar campos. 

- Botão C: limpa todas as operações e campos do visor. 

- Botão <-: limpa o último digito ou a última operação realizada mantendo o resultado no visor. 

- Botão =: ao ser feita uma operação e se clicado novamente no botão de '=' irá repetir a última operação realizada até que um novo valor ou operação seja inserido.

- Botão +/-: caso queira fazer operações com números negativos. Não aceita por exemplo o número zero negativo, porém aceita números fracionários negativos. EX: -0,23333

- Botão ,: para criar números fracionário.

- Os digitos chegam no máximo a 16 digitos entre inteiros e fracionários. Os números fracionários não ultrapassam as 8 casas decimais.

:red_circle: OBSERVAÇÕES :red_circle:
- Existe um bug que ainda não foi corrigido: ao selecionar uma operação e trocar a mesma irá realizar a primeira operação com o primeiro valor e irá gerar um erro de conversão da segunda operação em um número real. Gerando erros nos calculos. 

- Para não usar JQuery e plugins, foi feito uma função para ajustar tamanho do texto dentro dos visores das operações para não estourar o limite do visor, porém essa função não deixa esse texto responviso depois de digitado porém ao limpar o visor os próximos digitos vem ajustados ao tamanho do visor.  

**Agradecimento:** Se você leu até aqui, eu só tenho a agradecer pelo seu tempo em ver esse projeto, que me ajudou muito nos meus estudos e aprendizado. Se tiver alguma dúvida, sugestão ou critíca construtiva, por favor entre em contado, é sempre bom trocar idéias e conhecimento com o próximo. Obrigado!

:coffee: :floppy_disk:    :computer:     :tada:     :video_game: 
