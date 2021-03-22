const vue = new Vue({
    el:'#app',
    data : {
        player_heal: 100,
        monster_heal : 100,
        game_is_on : false,
        logs : [],
        time : 3,
        time_hide : false,
        player_bg_color : "green",
        monster_bg_color : "green",
        game : false,
        big : false,
        weak : false,
        game2 : false,
        vs_heal : 100
    },
    methods : {
        
        new_game(){
            this.game = true
            this.player_heal = 100
            this.monster_heal = 100
        },
        big_wolf(){
            this.big = true;
            this.weak = false
        },
        weak_wolf(){
            this.weak = true
            this.big = false
        },
        
        startGame(){
            this.game_is_on = true
            this.game2 = false
            this.start_time()
        },
        
        attack(){
            this.monster_heal -= 1  
            
        },
        special_attack(){
            this.monster_heal -= 2

        },
        heal_up(){
            var point = Math.ceil(Math.random()*25)
            this.player_heal += point
        },
        give_up(){
            this.game_is_on = false
            this.game = false
            this.game2 = false
        },
        add_to_logs(logs){
            this.logs.push(logs)
        },
        sart_game2(){
            this.game2 = true
            this.game_is_on = false
            var vm = this
            setInterval(() => {
                vm.time -=1
            }, 1000);
            
            
        },
        start_time(){
            var vm = this
            
            setInterval(() => {
                vm.time -=1
                if(vm.time===0){
                    vm.time_hide = true
                    vm.monster_attack
                }
            }, 1000);
            
        },
        
        vs_attack(){
            if(this.game_is_on ==false){
                this.vs_heal +=1
            }
        }
    
        
    },
    computed:{
        
        monster_attack(){
            var vm = this
            setInterval(() => {
                if(vm.big==true){
                    vm.player_heal -=2
                }
                else if(vm.weak==true){
                    vm.player_heal -=1
                }
                
            }, 300);
        },
        
    },
    watch :{
        player_heal(value){
            if(value < 50){
                this.player_bg_color = 'red'
            }
            else if(value>50){
                this.player_bg_color = 'green'
            }
            if(value<=0){
                this.player_heal = 0
                if(confirm('you loose do you want repaet game')){
                    this.player_heal = 100;
                    this.monster_heal = 100
                    this.logs = [],
                    this.monster_bg_color = 'green'
                    this.player_bg_color = 'green'
                }
            }
            else if(this.player_heal>=100){
                this.player_heal = 100
            }
            
        },
        monster_heal(value){
            if(value < 50){
                this.monster_bg_color = 'red'
            }
            else if(value>50){
                this.monster_bg_color = 'green'
            }
            if(value<=0){
                this.monster_heal = 0
                
                if(confirm('you win do you want repaet game')){
                    this.player_heal = 100;
                    this.monster_heal = 100
                    this.logs = [],
                    this.monster_bg_color = 'green'
                    this.player_bg_color = 'green'
                }
                
            }
        },
        time(value){
            if(value==0){
                this.time_hide = true
                setInterval(() => {
                    this.vs_heal -=1
                }, 300);
            }
        },
        vs_heal(value){
            if(value>100){
                if(confirm('You win game do you want repeat')){
                    this.vs_heal = 100
                }
            }
            else if(value<0){
                if(confirm('You loose game do you want repeat')){
                    this.vs_heal = 100
                }
                
            }
        }
        
        
    },
})