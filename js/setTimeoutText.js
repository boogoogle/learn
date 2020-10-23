setTimeout(
 function() {
  console.log("setTimeout");
 }, 0);

function resolveAfter2Seconds(x) {
 console.log('bb')
  return new Promise(resolve => {
    console.log('cc');
    resolve(x);
  });
}

async function f1() {
 console.log('aa')
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
 
}
f1();

console.log('script start');
new Promise((resolve) => {
 console.log('promise1');
 resolve()
}).then(() => {
 console.log('promise2')
})

// aa
// script start
// setTimeout
// promise1
// promise2
// bb
// cc
// 10
