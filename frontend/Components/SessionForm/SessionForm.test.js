import React from 'react'
import { shallow } from 'enzyme'
import SessionForm from './SessionForm'

describe('SessionForm', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SessionForm debug />);

    expect(component).toMatchSnapshot();
  })
})