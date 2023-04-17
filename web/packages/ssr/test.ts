/**
 * name: 模块功能
 * author: Deve
 * date: 2020-08-08
 */

for (let i = 0; i < 5; i += 1) {
  console.log('normal', i);
}

for (let i = 0; i < 5; i += 1) {
  if (i === 3) break;
  console.log('break', i);
}

for (let i = 0; i < 5; i += 1) {
  if (i === 3) continue;
  console.log('continue', i);
}

for (let i = 0; i < 5; i += 1) {
  console.log('normali', i);
  for (let j = 0; j < 5; j += 1) {
    console.log('normalj', j);
  }
}

for (let i = 0; i < 5; i += 1) {
  console.log('breaki', i);
  for (let j = 0; j < 5; j += 1) {
    if (j === 3) break;
    console.log('breakj', j);
  }
}

for (let i = 0; i < 5; i += 1) {
  console.log('continuei', i);
  for (let j = 0; j < 5; j += 1) {
    if (j === 3) continue;
    console.log('continuej', j);
  }
}
aaa:
for (let i = 0; i < 5; i += 1) {
  console.log('continuei', i);
  for (let j = 0; j < 5; j += 1) {
    if (j === 3) continue aaa;
    console.log('continuej', j);
  }
}
