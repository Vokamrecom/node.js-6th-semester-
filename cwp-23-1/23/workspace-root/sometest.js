setTimeout(() => console.log(1), 1000)

new Promise((res, rej) => res(3)).then(console.log)

setTimeout(() => console.log(2), 0)

console.log(4)