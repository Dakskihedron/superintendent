import Command from '../types/Command';

import commandsAPI from './apis';
import commandsFun from './fun'
import commandsMisc from './misc';
const commandsList: Command[] = [...commandsAPI, ...commandsFun, ...commandsMisc]

export default commandsList;