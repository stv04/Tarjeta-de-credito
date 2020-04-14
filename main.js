function r(min, max){
	var n = Math.floor(Math.random() * (10 - 0) + 0);
	return n;
}


function generadorDeTarjeta(){
	var tarjeta = Array(16);
	tarjeta[0] = r();
	tarjeta[1] = r();
	if( (tarjeta[0] === 5  && (tarjeta[1] === 1 || tarjeta[1] === 5))
		|| (tarjeta[0] ===  3 && (tarjeta[1] === 4 || tarjeta[1] === 7)) 
		|| tarjeta[0] === 4 ){		
		for(var i = 2; i < tarjeta.length - 1; i++){
		tarjeta[i] = r();
		}


	} else {
		return generadorDeTarjeta();
	}

	var configDeTarjeta = tarjeta.map(x => x);
	for(var i = 0; i < configDeTarjeta.length; i ++){
		if(i % 2 === 0){
			configDeTarjeta[i] = configDeTarjeta[i] * 2;
			if(configDeTarjeta[i] >= 10){
				configDeTarjeta[i] = Number(configDeTarjeta[i].toString()[0]) 
					+ Number(configDeTarjeta[i].toString()[1]);
			}
		}
	}

//maetodo para sacar el ultimo digito de la tarjeta
var sum = 0;
configDeTarjeta.forEach(function(value){return sum += value});
var sum2 = sum.toString();
console.log(sum);

if(sum % 10 === 0){
	tarjeta[tarjeta.length - 1] = 0;
} else {
	tarjeta[tarjeta.length - 1] = 10 - sum2[sum2.length - 1];
}

var cards = document.getElementById('tarjetaCreada'),
	card = document.createElement('div');
	card.setAttribute('class', 'datos');
	card.setAttribute('style', 'display:flex; justify-content:flex-end;'+
		' flex-direction:column; border: none; border-radius:25px;'+
		'box-shadow: 4px 6px 7px black; height: 250px;')
	card.innerHTML = `<h4 style='letter-spacing: 1px; text-align:right; margin:0px 10px;'>
	${tarjeta.slice(0,4).join('')}  ${tarjeta.slice(4,8).join('')}
	  ${tarjeta.slice(8,12).join('')}  ${tarjeta.slice(12,16).join('')}</h4>
	<div style='display: flex; justify-content: space-around; align-content:flex-end'>
	<h4>${document.getElementById('nombre').value}</h4>
	<h4 style='padding:0px;'>0${r()}/2025</h4></div>`
	cards.appendChild(card);
	if(tarjeta[0] === 3 ){
			tarjeta.push('american Express');
			card.style.backgroundImage = 'url("src/american.jpg")';
			card.style.backgroundSize = '100% 100%';
		}else if ( tarjeta[0] === 4) {
			tarjeta.push('VISA');
			card.style.backgroundImage = 'url("src/visa.png")';
			card.style.backgroundSize = '100% 100%';
		} else {
			tarjeta.push('Master Card');
			card.style.backgroundImage = 'url("src/master.jpg")';
			card.style.backgroundSize = '100% 100%';
		}
}



function verificadorDeTarjeta(){
	var obtenerNro = document.getElementById('numero').value;
	console.log(obtenerNro);
	var verificador = new Array();
	for (var i = 0; i < obtenerNro.length; i++) {
		verificador.push(obtenerNro[i]);
		if(i % 2 === 0){
		verificador[i] = verificador[i] * 2;
			if(verificador[i] >=10){
			verificador[i] = Number(verificador[i].toString()[0]) 
					+ Number(verificador[i].toString()[1]);
			}
		} else {
			verificador[i] = Number(verificador[i]);
		}
	}
	
	var sum = 0;
verificador.forEach(function(value){return sum += value;});

if(sum % 10 === 0){
	console.log('La tarjeta ingresada es válida')
	var validez = `El número de tarjeta ingresado es válido.  <br>Su tarjeta es:`;
} else {
	console.log('La tarjeta ingresada no es válida')
	var validez = 'El número de tarjeta ingresado es inválido. <br>Su tarjeta podría ser:';
}

	if(verificador[0] / 2 === 3 ){
			verificador.push('Una American Express');
		}else if ( verificador[0] / 2  === 4) {
			verificador.push('Una VISA');
		} else if( verificador[0] === 1) {
			 verificador.push('Una Master Card');
		} else {
			verificador.push('Una tarjeta de procedencia desconocida');
		}

	var ventanaDeMensaje = document.getElementById('mensaje');
	var mensaje = document.getElementById('msj');
	mensaje.innerHTML = `<p>${validez} ${verificador[verificador.length - 1]}</p>`;
	ventanaDeMensaje.appendChild(mensaje);
	ventanaDeMensaje.style.display ='block';
}

function cerrar_ventana(){
	document.getElementById('mensaje').style.display = 'none';
}