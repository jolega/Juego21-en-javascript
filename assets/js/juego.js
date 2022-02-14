/**
 * 2C= Two of Clubs (Treboles)
 * 2D= Two of Diaminds(diamantes)
 * 2H= Two of hearts (corazones)
 * 2S= Two of spades (spadas)
 * libreria shuffle https://underscorejs.org/
 */

(() =>{

    'use strict'

        let deck                    = []
        const tipos                 =['C','D','H','S']
        const especiales            =['A','J','Q','K']
        
        let puntosJugador           = 0;
        let puntosComputador        = 0;
        
        //referencias del html
        const bntNuevo              = document.querySelector("#btnNuevo");
        const bntPedir              = document.querySelector("#btnPedir");
        const bntDetener            = document.querySelector("#btnDetener");
        const htmlPuntosJugador     = document.querySelectorAll("small");
        const divCartasJugador      = document.querySelector("#jugador-cartas");
        const divCartasComputadora  = document.querySelector("#computadora-cartas")
        
        // esta funcion crear una nueva bajara 
        const crearDeck = () => {
        
            for(let i=2; i<= 10; i++){
                for(let tipo of tipos){
                    deck.push(i+ tipo)
                }
        
            }
        
            for(let tipo of tipos){
                for(let especial of especiales){
                deck.push(especial+ tipo);
                }
            }
        //console.log(deck)
        //_.shuffle sufle revuelve el arreglo
        deck = _.shuffle(deck);
        //console.log(deck);
        return deck;
        }
        
        crearDeck();
        
        // esta funcion me permite tomar una carta
        
        const pedirCarta = () => {
        
            if(deck.length ===0 ){
                throw 'No hay cartas en el deck'
            }
                const carta =  deck.pop();
        
        // console.log(deck);
        // console.log(carta);
            return carta;
        
        }
        
        //pedirCarta()
        
        
        
        
        
        const valorCarta = (carta) => {
        
        const valor = carta.substring(0,carta.length-1);
        
        return (isNaN(valor)) ?
                (valor=== 'A') ? 11 : 10
                :  valor *1;
        /*
        if(isNaN(valor)){
            // no es un numero
            puntos= (valor=== 'A') ? 11 : 10;
        }
        else{
            // es un numero
            puntos=valor *1;
        }
        console.log(puntos);
        */
        }
        
        //turno de la computadora
        const turnocomputadora = (puntosMinimos) => {
        
            do{
            const carta = pedirCarta();
            puntosComputador =puntosComputador + valorCarta(carta)
            //console.log(puntosComputador);
            htmlPuntosJugador[1].innerHTML=puntosComputador;
            const imgCarta= document.createElement('img');
            imgCarta.classList.add('carta')
            imgCarta.src=`assets/cartas/${ carta }.png`;
            divCartasComputadora.append(imgCarta);
        
            }while((puntosComputador < puntosMinimos) && puntosMinimos <=  21 )
        
            setTimeout(() => {
                if(puntosMinimos < puntosComputador ){
                    alert("Gana el Jugador")
            }
            else if(puntosMinimos === puntosComputador){
                alert("Nadie gana")
            }
            else{
                    alert("Gana la Computadora")
            } 
            }, 80);
        
        
        
        }
        
        
        //const valor= valorCarta(pedirCarta());
        //console.log(valor);
        
        // eventos
        
        bntPedir.addEventListener('click', () => {
        
            const carta = pedirCarta();
            puntosJugador =puntosJugador + valorCarta(carta)
        // console.log(puntosJugador);
            htmlPuntosJugador[0].innerHTML=puntosJugador;
            const imgCarta= document.createElement('img');
            imgCarta.classList.add('carta')
            imgCarta.src=`assets/cartas/${ carta }.png`;
            divCartasJugador.append(imgCarta);
        
            if(puntosJugador > 21 ){
            
                bntPedir.disabled=true;
                bntDetener.disabled=true;
                console.log("has perdido")
                turnocomputadora (puntosJugador);
            } else if(puntosJugador === 21){
                console.log("21 Genial!")
                bntPedir.disabled=true;
                bntDetener.disabled=true;
                turnocomputadora (puntosJugador);
            }
        
        })
        
        bntDetener.addEventListener('click', () => {
        
        bntPedir.disabled=true;
        bntDetener.disabled=true;
        turnocomputadora (puntosJugador);
        
        })
        
        bntNuevo.addEventListener('click', () => {
        
            deck=[];
            deck=crearDeck();
            bntPedir.disabled=false;
            bntDetener.disabled=false;
            puntosJugador=0;
            puntosComputador=0;
            htmlPuntosJugador[0].innerHTML=puntosJugador;
            htmlPuntosJugador[1].innerHTML=puntosComputador;
            divCartasJugador.innerHTML="";
            divCartasComputadora.innerHTML="";
        
        })
        

}) ();

