const raf = require('raf') //fix raf warning, redux!

import React from 'react';
import Enzyme, {shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//solution classes
import {App, SenatorTable, TableHeader, SenatorRow} from  './src/App';

//test data
const TEST_SENATORS = [
  {id: 1, name: 'Test Sen 1', state: 'AB',  party: 'Dem', phone: '123-456-789', twitter: 'test1'},
  {id: 2, name: 'Test Sen 2', state: 'CD', party: 'Rep', phone: '234-567-980', twitter: 'test2'},
  {id: 3, name: 'Test Sen 3', state: 'EF', party: 'Ind', phone: '555-555-5555', twitter: 'test3'}
];
const TEST_HEADINGS = ['Col A','Col B','Col C'];

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['index.js', 'App.js'].map((src) => __dirname + '/src/' + src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

describe('The Senator listing app', () => { 
  it('renders without crashing', () => {
    shallow(<App />); //quick test
  });

  describe('implements an `App` component', () => {
    let wrapper; //the rendered app

    beforeAll(() => {
      wrapper = mount(<App senators={[]} />);
    })

    it('has the `container` CSS class', () => {
      let wrapper = shallow(<App senators={[]} />);
      expect(wrapper.hasClass('container')).toBe(true);
    })

    it('contains a heading', () => {
      let heading = wrapper.find('h1');
      expect(heading.text()).toBe('US Senators (Oct 2020)');
    })

    it('renders a SenatorTable', () => {
      expect(wrapper.find(SenatorTable).length).toBe(1); //contains a table
    });
  })

  describe('implements a `SenatorTable` component', () => {
    let wrapper; //the rendered app
    
    beforeAll(() => {
      wrapper = mount(<SenatorTable senators={TEST_SENATORS}/>);
      // render = wrapper.render();
    })

    it('renders a table', () => {
      expect(wrapper.find('table').length).toBe(1); //contains 1 table
    })

    it('renders a TableHeader', () => {
      expect(wrapper.find(TableHeader).length).toBe(1); //contains a TableHeader
    });

    it('renders rows for Senators', () => {
      expect(wrapper.find(SenatorRow).length).toBe(TEST_SENATORS.length); //includes SenatorRows
    });
  })

  describe('implements a `TableHeader` component', () => {
    let wrapper; //the rendered app
    
    beforeAll(() => {
      wrapper = shallow(<TableHeader columnNames={TEST_HEADINGS} />); //only need shallow
    })

    it('renders a table header element', () => {
      expect(wrapper.find('thead').length).toBe(1);
      expect(wrapper.find('thead > tr').length).toBe(1);
      expect(wrapper.find('tr > th').length).toBeGreaterThan(1);
    })

    it('renders header cells based on the props', () => {
      let headings = wrapper.find('th');
      for(let i=0; i<TEST_HEADINGS.length; i++){
        expect(headings.at(i).text()).toEqual(TEST_HEADINGS[i])        
      }
    })
  })


  describe('implements a `SenatorRow` component', () => {
    let wrapper; //the rendered app
    
    beforeAll(() => {
      wrapper = shallow(<SenatorRow senator={TEST_SENATORS[0]} />);
    })

    it('renders a table row', () => {
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find('tr > td').length).toBeGreaterThan(1);
    })

    it('renders the correct cells based on the props', () => {
      let cells = wrapper.find('td');

      expect(cells.at(0).text()).toEqual('Test Sen 1');
      expect(cells.at(1).text()).toEqual('D - AB');
      expect(cells.at(2).find('a').html()).toEqual('<a href="tel:123-456-789">123-456-789</a>'); //just hard-code it for now
      expect(cells.at(3).find('a').html()).toEqual('<a href="https://twitter.com/test1">@test1</a>');
    })
  })
})




