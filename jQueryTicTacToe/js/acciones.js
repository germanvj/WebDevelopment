$(document).ready(function(){
	var tablero=new Array(8),turno,totalJuegos=0,ganadosX=0,ganadosO=0,totalTiradas,empatados=0;
	var iniciarlizarJuego=function(){
		for(var Q=0;Q<=8;Q++){
			tablero[Q]=0;
		}
		turno=1;
		totalTiradas=0;
	}
	var crearTablero=function(){
		$('#tablero td').each(function(indice,elemento){
			if(tablero[indice]==0){
				$(this).html('<img src="images/vacio.png"/>');
			}
			if(tablero[indice]==1){
				$(this).html('<img src="images/x.png"/>');	
			}
			if(tablero[indice]==2){
				$(this).html('<img src="images/o.png"/>');	
			}
			if(tablero[indice]==3){
				$(this).html('<img src="images/x-ganador.png"/>');	
			}
			if(tablero[indice]==4){
				$(this).html('<img src="images/o-ganador.png"/>');	
			}
		});
		if(turno==1){
			$('#turno').html('X');
		}else{
			$('#turno').html('O');
		}
		
		$('#ganadoso').html(ganadosX);
		$('#ganadosx').html(ganadosO);
		$('#empatados').html(empatados);
		$('#total').html(totalJuegos);
	}
	var gano=function(uno,dos,tres,jugador,totalTiradas){
		var si=0;
		if(tablero[uno]==tablero[dos]&&tablero[dos]==tablero[tres]&&tablero[uno]==jugador){
			si=1;
			var color;
			if(jugador==1){
				color=3;
				ganadosX++;
			}else{
				color=4;
				ganadosO++;
			}
			tablero[uno]=color;
			tablero[dos]=color;
			tablero[tres]=color;
		}
		if(si==1){
			alert('Felicidades!');
			totalJuegos++;
			iniciarlizarJuego();
		}else{
			crearTablero();
		}
		return si;
	}

	var checarGanador=function(totalTiradas){
		gano(0,1,2,1,totalTiradas);
		gano(3,4,5,1,totalTiradas);
		gano(6,7,8,1,totalTiradas);
		gano(0,3,6,1,totalTiradas);
		gano(1,4,7,1,totalTiradas);
		gano(2,5,8,1,totalTiradas);
		gano(0,4,8,1,totalTiradas);
		gano(2,4,6,1,totalTiradas);

		gano(0,1,2,2,totalTiradas);
		gano(3,4,5,2,totalTiradas);
		gano(6,7,8,2,totalTiradas);
		gano(0,3,6,2,totalTiradas);
		gano(1,4,7,2,totalTiradas);
		gano(2,5,8,2,totalTiradas);
		gano(0,4,8,2,totalTiradas);
		gano(2,4,6,2,totalTiradas);
			if(totalTiradas==9){
				alert('Empate :(');
				empatados++;
				totalJuegos++;
				iniciarlizarJuego();
				crearTablero();
			}
	}
	iniciarlizarJuego();
	crearTablero();

	$('#tablero td').click(function(e){
		if($(this).find('img').attr('src')=='images/vacio.png'){
			var d=Number($(this).data('punto'));
			totalTiradas++;
			if(turno==1){	
				tablero[d]=1;
			}
			if(turno==2){	
				tablero[d]=2;
			}
			turno++;
			if(turno>2){
				turno=1;
			}
			checarGanador(totalTiradas);

		}
	});
});