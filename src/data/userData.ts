import { historyData } from './history';
import { v4 as uuidv4 } from 'uuid';

export const userData = [
  {
    id: uuidv4(),
    token: 'asdasdasd',
    name: 'lukas',
    login: 'arctin',
    password: 'oioioioi',
    email: 'lukas@lukas.com',
    data: historyData,
  },
  {
    id: uuidv4(),
    login: 'test',
    token: 'testtokenmanhehe',
    name: 'test',
    password: 'testtest',
    email: 'test@lukas.com',
    data: [],
  },
];
