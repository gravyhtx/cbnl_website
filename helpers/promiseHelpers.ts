export const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

export const startAsync = async(
  ms: number,
  callback: () => any,
) => {
  await wait(ms)
  callback()
}

// EXAMPLE
// const startAsync = async callback => {
//   await wait(1000);
//   callback('Hello');
//   await wait(1000);
//   callback('And Welcome');
//   await wait(1000);
//   callback('To Async Await Using TypeScript');
// };
//
// startAsync(text => console.log(text));