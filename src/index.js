import './sass/style.scss';
import { multiply } from './js/multiply';

const result = document.createElement("p");
result.innerHTML = (`Result: ${multiply(2,5)}`);
const show = document.querySelector(".container");
show.append(result)