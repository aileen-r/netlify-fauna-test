import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld';

describe('HelloWorld.vue', () => {
  it('renders hello world message', () => {
    const wrapper = shallowMount(HelloWorld, {
      stubs: {
        'b-container': true,
      },
    });
    const title = wrapper.find('h1');
    const helloWorld = wrapper.find('p');
    expect(title.text()).toMatch('52 Week Savings Challenge');
    expect(helloWorld.text()).toMatch('Hello World. 👋');
  });
});
