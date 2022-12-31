import {shallowMount} from '@vue/test-utils'
import Counter from '@/components/Counter.vue';

describe('Counter component',() => {

    let wrapper;
    
    beforeEach(()=>{
        wrapper =shallowMount(Counter)
    })
    
    test('Should do match with its snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('H2 should has default value',()=>{
        const h2 = wrapper.find('h2') //Encuentra el primer h2
        expect(h2.text()).toBe('Counter')
    })

    test('default value should be 100 in p tag',()=>{
        const ps = wrapper.find('[data-testid="counter"]').text()
        expect(ps).toBeTruthy()
        expect(ps).toBe('100')
    })

    test('Value counter should be incremented by 1',async ()=>{
        const [incrementedBtn,decreaseBtn] = wrapper.findAll('button')
        await incrementedBtn.trigger('click')
        await incrementedBtn.trigger('click')
        await incrementedBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        const ps = wrapper.find('[data-testid="counter"]')
        expect(ps.text()).toBe('101')
    })

    test('Should set a default value',()=>{
        const {start} =wrapper.props()
        const ps = wrapper.find('[data-testid="counter"]').text()
        expect(Number(ps)).toBe(start)
    })

    test('Title prop should be showed',()=>{
        const title = 'Hellow World!'
        const wrapper = shallowMount(Counter,{
            props:{
                title
            }
        });

        expect(wrapper.find('h2').text()).toBe(title)
    })
})