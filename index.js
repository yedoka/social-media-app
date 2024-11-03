function outerFunc() {
  let a = "outer func var";
  return function innerFunc() {
    console.log(a);
  }
}


let i = 0

function counter() {
  i++;
}

console.log(i);
console.log(i);
console.log(i);
console.log(i);

