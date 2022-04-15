new Vue({
    el:'#projeto',
    data:{
        iniciar: true,
        percMonstro: 100,
        percJogador: 100,
        ataquePlayer: 1,
        ataqueMonstro: 1,
        log: false,
        mensagensJogador:'',
        mensagensMonstro:'',
        mensagens:[],
        exibirMensagem: false,
        playerVenceu: false,
      
    },
    watch:{
        percJogador(novo, antigo){
            if(novo <= 0){
                this.percJogador = 0;
                this.exibirMensagem = true;
                this.playerVenceu = false;
                this.iniciar = true;
            }
            if(novo > 100){
                this.percJogador = 100;
            }
        },
        percMonstro(novo,antigo){
            if(novo <=0 ){
                this.percMonstro = 0;
                this.exibirMensagem = true;
                this.playerVenceu = true;
                this.iniciar = true;
            }
        }
    },
    computed:{
        larguraBarraMonstro(){
            
            if(this.percMonstro <= 20){
               var cor ='#cc0033';
            }else{
                cor = '#6666ff';
            };
            return {
                width: this.percMonstro+'%',
                'background-color': cor 
            }
        },
        larguraBarraPlayer(){
            if(this.percJogador <= 20){
                var cor ='#cc0033';
             }else{
                 cor = '#6666ff';
             };
            return{
                width: this.percJogador+'%',
                'background-color': cor 
            }
        }
    },
    methods:{
        ataque(){
            this.ataquePlayer = Math.round(10*Math.random());
            this.percMonstro = this.percMonstro - this.ataquePlayer;
            this.ataqueMonstro = Math.round(12*Math.random());
            this.percJogador = this.percJogador - this.ataqueMonstro;

            let mensJ = 'O jogador atacou com '+ this.ataquePlayer;
            let mensM = 'O monstro revidou com '+ this.ataqueMonstro;
            this.mostrarLog(mensJ, mensM);
        },
        ataqueEspecial(){
            this.ataquePlayer = Math.round(12*Math.random());
            this.percMonstro = this.percMonstro - this.ataquePlayer;
            this.ataqueMonstro = Math.round(8*Math.random());
            this.percJogador = this.percJogador - this.ataqueMonstro;

            let mensJ = 'O jogador atacou especial com '+ this.ataquePlayer;
            let mensM = 'O monstro revidou com '+ this.ataqueMonstro;
            this.mostrarLog(mensJ, mensM);
        },
        novoJogo(){
            this.percJogador = 100
            this.percMonstro = 100
            this.iniciar = false
            this.exibirMensagem = false
            this.playerVenceu = false
            this.mensagens = [];
            this.log = false;
        },
        desistir(){
            this.percJogador = 100
            this.percMonstro = 100
            this.iniciar = true
            this.exibirMensagem = false
            this.playerVenceu = false
            this.mensagens = []
            this.log = false
        },
        curar(){
                this.ataquePlayer = Math.round(8*Math.random());
                this.percJogador = this.percJogador + this.ataquePlayer
                this.ataqueMonstro = Math.round(10*Math.random());
                this.percJogador = this.percJogador - this.ataqueMonstro 

                let mensJ = 'O jogador se curou com '+ this.ataquePlayer;
                let mensM = 'O monstro atacou com '+ this.ataqueMonstro;
                this.mostrarLog(mensJ, mensM);
        },
        mostrarLog(mensJ, mensM){

            this.log = true;

            let menJ = {player: 'jogador', mensagem: mensJ};
            let menM = {player: 'monstro', mensagem: mensM};
            this.mensagens.push(menJ);
            this.mensagens.push(menM);
            
           // console.log('Mostrando mens. Objetos:'+ JSON.stringify(this.mensagens));
                   
        } 
    }
});