import { FormInput } from './classes/FormInput';
import { Storage } from './classes/Storage';
import * as _ from 'lodash'


new FormInput();

Storage.checkLocalStorage();

console.log("Richard est super cool !");




const commics = ['Superman' ,'Batman', 'Spdierman'];
const firstComic = _.first(commics)

const reverseComics = _.reverse(commics)
console.log(reverseComics)
console.log(firstComic);
