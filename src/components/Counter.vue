<template>
  <h2>{{title}}</h2>
  <p>{{ counter }}<sup>2</sup> = {{ calculateSquare}}</p>
  <p data-testid="counter">{{ counter }}</p>
  <div>
    <button @click="increase" data-testid="increment">+1</button>
    <button @click="decrease" data-testid="decrease">-1</button>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'Counter'
        },
        start:{
            type:Number,
            default:100,
            validator:function(value){
                return value > 0;
            }
        }
    },
    data(){
        return {
            counter:this.start
        }
    },
    methods:{
        increase(){
            this.counter ++
        },
        decrease(){
            this.counter --
        }
    },
    computed:{
        calculateSquare(){
            return this.counter * this. counter
        }
    }
}
</script>

<style>

button{
    background-color: #64BB87;
    border-radius: 5px;
    border:1px solid white;
    color: white;
    cursor:pointer;
    margin:0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover{
    background-color: #5aa67b;
    transition: 0.3 ease-in-out;
}

</style>