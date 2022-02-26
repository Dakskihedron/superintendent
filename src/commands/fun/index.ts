import Command from '../../types/Command';

import choose from './choose';
import coinflip from './coinflip';
import dice from './dice';
import eightball from './eightball';
const commandsFun: Command[] = [choose, coinflip, dice, eightball];

export default commandsFun;