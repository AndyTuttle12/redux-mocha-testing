import React from 'react';
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// set up testing env to run like a browser in the terminal
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// build 'renderComponent' helper to render a given react class
function renderComponent(ComponentClass, props, state) {
	const componentInstance = TestUtils.renderIntoDocument(
		<Provider store={createStore(reducers, state)}>
			<ComponentClass {...props} />
		</Provider>
	);
	return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

// build event sims
$.fn.simulate = function(eventName, value) {
	if (value) {
		this.val(value);
	}
	TestUtils.Simulate[eventName](this[0]);
}

// set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };