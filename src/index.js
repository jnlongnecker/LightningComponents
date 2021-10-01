
import { createElement } from 'lwc';
import OsData from 'c/osData';

const app = createElement('os-data', { is: OsData });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
