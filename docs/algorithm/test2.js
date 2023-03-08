function func(str) {
  const map = {
      2: /[abc]/g,
      3: /[def]/g,
      4: /[ghi]/g,
      5: /[jkl]/g,
      6: /[mno]/g,
      7: /[pqrs]/g,
      8: /[tuv]/g,
      9: /[wxyz]/g,
      0: /0/g,
      1: /1/g,
  };

  let transform = str.replace(/[\W_]gi/, "");

  for (let key in map) {
      transform = transform.replace(map[key], key);
  }

  transform = transform.toLowerCase().replace(/[a-z]/g, function (char) {
      if (char === "z") {
          return "a";
      } else {
          return String.fromCharCode(char.charCodeAt(0) + 1);
      }
  });
  console.log(transform);
}

func('YUANzhi1987')