var rodada;
var matriz_jogo = Array(3);

//Matriz
matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

//Zera a matriz
for (var i = 1; i < 4; i++) {
	matriz_jogo['a'][i] = 0;
	matriz_jogo['b'][i] = 0;
	matriz_jogo['c'][i] = 0;
}

$(document).ready( function(){
	//reiniciar o jogo
	$('#btn-reiniciar-jogo').click( function(){
    
	        //zerar a matriz
	        for (var i = 1; i < 4; i++) {
	            matriz_jogo['a'][i] = 0;
	            matriz_jogo['b'][i] = 0;
	            matriz_jogo['c'][i] = 0;
	        }
	 
	        //limpar todos os campos que já estavam marcados com x ou o
	        $('.jogada').css('background-image', '');

	        //mostrar de quem é a vez
	        $('#vez1').show();
	 
	        //reaplica os eventos de jogada ao elementos com a class jogada
	        //fundamental caso seja um restart ao término do jogo, uma vez que a função 
	        //ganhador limpa a função jogada do elemento se houver um ganhador
	        $('.jogada').off();
	        $('.jogada').click( function(){
	            var id_campo_clicado = this.id;
	            jogada(id_campo_clicado);
	        });
	 
	        //disparar o evento click do btn_iniciar_jogo sem clicar no botão
	        $("#btn-iniciar-jogo").trigger('click');
	        
	});

	$('#btn-iniciar-jogo').click( function() {

		rodada = 1;

		if ($('#apelido1').val() == '' || $('#apelido2').val() == '') {
			alert('Digite os apelidos corretamente.');
			return false;
		}

		//pega os apelidos
		var ap1 = $('#apelido1').val();
		var ap2 = $('#apelido2').val();

		//põe na tela atribuindo a variável ap1 no elemento que tem id = 'ap1'
		document.getElementById('ap1').innerHTML = ap1;
		document.getElementById('ap2').innerHTML = ap2;

		$('#pagina-inicial').hide();
		$('#vencedor1').hide();
		$('#palco-jogo').show();

		//jogador 1 começa o jogo
		$('#vez').css('background-image', 'url("imagens/jogador_1.png")');

	});

	

	$('.jogada').click( function(){
		var id_campo_clicado = this.id;
		$('#'+id_campo_clicado).off();//retira a função de click
		jogada(id_campo_clicado, ap1, ap2);

	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if ((rodada%2)==1) {
			icone = 'url("imagens/1x.png")';
			ponto = -1;
			//document.getElementById('vez').innerHTML = "2";
			$('#vez').css('background-image', 'url("imagens/jogador_2.png")');
		}else{
			icone = 'url("imagens/2o.png")';
			ponto = 1;			
			//document.getElementById('vez').innerHTML = "1";
			$('#vez').css('background-image', 'url("imagens/jogador_1.png")');
		}
		rodada++;

		//põe a imagem "icone" dentro do campo background
		$('#'+ id).css('background-image', icone); 

		//separa o id a-1 no traço. então fica "linha_coluna[0] = a" e "linha_coluna[1] = 1" 
		var linha_coluna = id.split('-');

		//linha e coluna
		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		console.log(matriz_jogo); 

		verifica_combinacao();
	}

	//calcula a soma de pontos
	function verifica_combinacao(){ 
		//linha a
		var soma = 0;
		for (var i=1; i<4; i++){
			soma = soma + matriz_jogo['a'][i];
		}
		ganhador(soma);

		//linha b
		soma = 0;
		for (var i=1; i<4; i++){
			soma = soma + matriz_jogo['b'][i];
		}
		ganhador(soma);

		//linha c
		soma = 0;
		for (var i=1; i<4; i++){
			soma = soma + matriz_jogo['c'][i];
		}
		ganhador(soma);
		

		//colunas 1, 2 e 3
		for (var l=1; l<4; l++){
			soma = 0;
			soma = soma + matriz_jogo['a'][l];
			soma = soma + matriz_jogo['b'][l];
			soma = soma + matriz_jogo['c'][l];
			ganhador(soma);
		}

		//diagonal 1
		soma = 0;
		soma = matriz_jogo['a'][1]+matriz_jogo['b'][2]+matriz_jogo['c'][3];
		ganhador(soma);

		//diagonal 2
		soma = 0;
		soma = matriz_jogo['a'][3]+matriz_jogo['b'][2]+matriz_jogo['c'][1];
		ganhador(soma);
	}

	//ver se alguém venceu
	function ganhador(soma){

		//jogador 1 venceu
		if (soma == -3) { 
			$('#vez1').hide();
			$('#vencedor1').show();
			$('#vencedor').css('background-image', 'url("imagens/vencedor_1.png")');
			$('.jogada').off(); //desabilita o clique nas class jogada
		}

		//jogador 2 venceu
		else if (soma == 3) { 
			$('#vez1').hide();
			$('#vencedor1').show();
			$('#vencedor').css('background-image', 'url("imagens/vencedor_2.png")');
			$('.jogada').off(); //desabilita o clique nas class jogada
		}

		//empate
		else if((matriz_jogo['a'][1] && matriz_jogo['a'][2] && matriz_jogo['a'][3] && matriz_jogo['b'][1] &&
			matriz_jogo['b'][2] && matriz_jogo['b'][3] && matriz_jogo['c'][1] && matriz_jogo['c'][2] && 
			matriz_jogo['c'][3]) != 0){
			$('#vez1').hide();
			$('#vencedor1').show();
			$('#vencedor').css('background-image', 'url("imagens/empate.png")');
			$('.jogada').off(); //desabilita o clique nas class jogada
		}


	}

});