import Command from '../../types/Command';

import avatar from './avatar';
import ping from './ping';
import role from '../misc/role';
import userinfo from './userinfo';
const commandsMisc: Command[] = [avatar, ping, role, userinfo];

export default commandsMisc;