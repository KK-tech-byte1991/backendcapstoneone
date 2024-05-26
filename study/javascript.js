// What are polyfills?
//Ans) A polyfill is a piece of code (usually JavaScript on the Web) used to provide modern functionality on older browsers that do not natively support it.
// Why Polyfills?
//Pollyfills for map

// const abc=[2,4,4,5]


// Array.prototype.myMap=function(callBack){
//     let newArray=[]
//     for (const i in this){
//         newArray.push(callBack(this[i]))
//     }
    
//     return newArray
// }

// let res=abc.myMap((x)=>x*2)

// console.log("res",res)


// console.log("start");
// setTimeout(()=>{
//     console.log("inside timeout")
// },0)

//  Promise.resolve().then(()=>{
//     console.log("inside Promise")
// })
// console.log("end")


var x=1;

function Outer(){
    console.log("Outer",x)
    
    function Inner(){
        console.log("Inner",x)
    }
   Inner()
    var x=2
     
}

Outer()


// What is callback hell?And how to avoid it?

// What are promises in javascript?

//what are higher order functions?

//what are prototype inheriatance?

//what are call bind apply