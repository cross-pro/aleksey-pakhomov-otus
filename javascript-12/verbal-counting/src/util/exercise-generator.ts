import { loadSettings } from "./storage-util";


const getRandomArbitrary = (min: number, max: number) =>  {
    return Math.random() * (max - min) + min;
  }

 const getMin = (n: number) => {
    let k=1
    for (let i=0;i<n-1;i++) {
        k=k*10
    }
    return k
 } 

 const getMax = (n: number) => {
    return parseInt("9".repeat(n))
 }

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

const generateResult = (start: number, difficult: number) => {
    let second = getRandomInt(getMin(difficult),getMax(difficult))
    let third = getRandomInt(getMin(difficult),getMax(difficult))
    return start + second + third
}

const generateRandom = (n: number) => {
    let result = getRandomInt(getMin(n), getMax(n))
    return result
}



export {getMin, getMax, generateRandom, generateResult}