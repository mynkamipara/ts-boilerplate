import { Container } from 'typedi';
import LoggerInstance from './logger';
import config from '../config/index';

export default () => {
	try {
		// Load logger
		Container.set('logger', LoggerInstance);
		LoggerInstance.debug('Added logger to container');

		//Load Config file
		Container.set('config', config);
		LoggerInstance.debug('Added config to container');
	} catch (e) {
		LoggerInstance.error('Failed to load dependencies');
		LoggerInstance.errorAndMail('Connection to redis failed %o', e);
	}
};
