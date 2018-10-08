function multiply(a, b){
    return a * b;
}

function sixMultiplier(c){
    return multiply(6, c);
}

function add(a,b){
    return a + b
}

function constantOperator(constant, operation){
    return (input) => {
        return operation(constant, input)
    }
}

const sixer = constantOperator(6, multiply)

console.log(sixer(10));


function customizedMultiply (q, s) {
    return add(multiply(q, s),2) + multipy(s,2)
}