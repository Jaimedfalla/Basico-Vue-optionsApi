<template>
  <h1>Indecision</h1>
  <img v-if="image" :src="image" alt="">
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="ask me a yes or no question" 
        v-model.trim="question">
    <p>Remember finish your question with ? character</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            question:'',
            answer:'',
            image:null,
            isValidQuestion:false
        }
    },
    methods:{
        async getAnswer(){
            try{
                this.answer ="Thinking...!!!"
                const {answer,image} = await fetch('https://yesno.wtf/api').then(r => r.json())
                this.answer = answer
                this.image = image
            }
            catch(error){
                this.answer = 'Error invoking api'
                this.image = null
            }
        }
    },
    watch:{
        question(value){
            if(value ==='')
            {
                this.image = null;
                this.answer ='';
                this.isValidQuestion = false
                return
            }

            console.log(value)

            if(!value.includes('?')) return;
            
            this.isValidQuestion = true
            this.getAnswer()
        }
    }
}
</script>

<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>