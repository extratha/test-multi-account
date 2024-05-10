import getNextConfig, { setConfig } from 'next/config';

// eslint-disable-next-line import/extensions
import config from '../../../next.config.js';
setConfig(config);

export default getNextConfig;
