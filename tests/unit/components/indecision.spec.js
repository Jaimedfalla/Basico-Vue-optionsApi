import {shallowMount} from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Indecision Component',()=>{
    let wrapper;
    let consoleLogSpy;    

    beforeEach(()=>{
        wrapper = shallowMount(Indecision)
        consoleLogSpy = jest.spyOn(console,'log')
        jest.clearAllMocks()
    })

    test('Should do match with its snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot()
    }) 

    describe('Testing input get Answer',()=>{
        let answerSpy;
        let input;
        const answerMock ={
            answer:'yes',
            forced:false,
            image:''
        }

        global.fetch =jest.fn(() => Promise.resolve({
            json:()=> Promise.resolve(answerMock)
        }))

        beforeEach(()=>{
            answerSpy = jest.spyOn(wrapper.vm,'getAnswer')
            input = wrapper.find('input')
        })

        test('Anything',async ()=>{
            await input.setValue('Hola Mundo')
            expect(consoleLogSpy).toHaveBeenCalledTimes(1)
            expect(answerSpy).not.toHaveBeenCalled()
        })
    
        test('get answer test',async()=>{
            await input.setValue('aaaaaa?')
            expect(answerSpy).toHaveBeenCalledTimes(1)
        })

        test('Anything 1',async ()=>{
            await wrapper.vm.getAnswer()
            expect(wrapper.vm.answer).toBe(answerMock.answer)
            expect(wrapper.vm.image).toBe(answerMock.image)
        })

        test('Testing get answer fails',async()=>{
            fetch.mockImplementationOnce(()=>Promise.reject('Service is not available'))
            await wrapper.vm.getAnswer()
            const img = wrapper.find('img')
            expect(img.exists()).toBeFalsy()
            expect(wrapper.vm.answer).toBe('Error invoking api')
        })
    })
})