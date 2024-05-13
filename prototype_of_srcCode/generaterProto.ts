async function* generateNumbersAsync() {
  let i = 0;
  while (true) {
    if (i >= 99) {
      return i; //ここで値を返し、関数を終了する
    }
    yield i++;
  }
}

// 使用例
const nums = generateNumbersAsync();
while (true) {
  const num = await nums.next();
  console.log(num);
  if (num.done) {
    break;
  }
}
