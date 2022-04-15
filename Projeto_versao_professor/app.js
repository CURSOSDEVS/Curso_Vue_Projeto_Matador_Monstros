new Vue({
    el:'#app',
    data:{ 
        running: false,
        monsterLife: 100,
        playerLife: 100,
        log: []
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods:{
        attack(especial){
            this.hurt('monsterLife', 5, 10, especial,'Jogador','Monstro','player')
            if(this.monsterLife > 0){
                this.hurt('playerLife', 7, 12, false,'Monstro','Jogador','monster')
            }
        },
        /**hurt = ferimento, 
         * atr: playerLife ou monsterLife
         * min , max: range do ataque
         * especial: se for true o hurt será acrescido com um plus
         * source: qual o origem se veio o monster o do player
         * target: quem recebeu o ataque
         * css: a classe css que dará o estilo
         */
        hurt(atr, min, max, especial, source, target, css){
            //se for um ataque especial o plus será 5 
            const plus = especial ? 5 : 0 
            const hurt = this.getRandom(min + plus, max + plus)
            //logica para pegar o atributo passado que será
            //a variável playerLife ou monsterLive através de atr
            //e subtrari da variável o valor de hurt
            //sendo que o valor mínimo será zero
            this[atr] = Math.max(this[atr] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`,css)
        },
    
        /** heal = curar
         * Este método recebe doi valores que serão utilizados para
         * na função geRandom
         */
        heal(min, max){
            const heal = this.getRandom(min, max)
            //será acrescentado na vida do jogador uma cura sendo 
            //limitada ao valor 100
            this.playerLife = Math.min(this.playerLife + heal , 100)
            this.registerLog(`Jogador ganhou força de ${heal}`,'player')
        },
        //o jogador será curado primeiro depois atacado novamente
        healAndHurt(){
            //chamamos primeiro o método para curar
            this.heal(10,15)
            //chamamos o método para atacar no formato false pois o jogador
            //náo pode ser atacado com atack especial
            this.hurt('playerLife', 7, 12, false,'Monstro','Jogador','monster')
        },
        /**método que irá receber dois valores que serão utilizados
         * para calcular um número aleatório.
         * primeiramente o Math.random gera um número aleatório de 0 a 1
         * esse número será multiplicado pelo range que é a diferença
         * entre o min e max. Esse resultado é somando ao número min
         * por último é utilizado o math.round para arredondar o valor
         */
        getRandom(min, max){
            const value = Math.random() * (max - min) + min;
            return Math.round(value)
        },
        
        startGame(){
            this.playerLife = 100
            this.monsterLife = 100
            this.running = true
            this.log = [];
           
        },
        giveUp(){
            this.playerLife = 100
            this.monsterLife = 100
            this.running = false
            this.log = []     
        },
        //unshift: posiciona o registro no inicio ou no topo
        //este método irá registrar a mensagem e a classe css que será 
        //utilizada
        registerLog(text, css){
            this.log.unshift({text, css})
        }
        
    }
});