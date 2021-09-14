


//Given a line of encrypted text, translate it using a table of matching decrpytion values.
//Input format: Encrypted string will be the first line of input, followed by the translation pairs and their
//appropiated decrypted matches separated by a | in the subsequent lines. Spacing must be preserved.

const input1 = `olleH dlroW
olleH|Hello
dlroW|World
Random|String`;
//expected output "Hello World"

const input2 = `Je suis un programmeur
Je suis|I am
un|a
programmeur|programmer`;
//expected output "I am a programmer"

const input3 = `72101108108111 87111114108100
100|d
72|H
111|o
108|l
87|W
114|r
101|e`;
//expected output "Hello World"

//Simple brute force attempt. Fails third case
//O(n^2) time complexity with nested loops
function decrypt1(string) {
  let cryptArr = string.split('\n');
  let wordToDecrypt = cryptArr[0];
  let decryptArr = [];
  let result = [];

  //creating 2d array to serve as decrypt table
  for (let i = 1; i < cryptArr.length; i++) {
    decryptArr.push(cryptArr[i].split('|'));
  }
  //iterate over decrypt arr
  for (let i = 0; i < decryptArr.length; i++) {
    //iterate over nested array
    for (let j = 0; j < decryptArr.length; j++) {
      //if our word to decrypt finds a match with the first item in our decrypt arraypair, and a second item exists, we push that second item to our result
      if (wordToDecrypt.indexOf(decryptArr[i][j]) != -1 && decryptArr[i][j + 1])
        result.push(decryptArr[i][j + 1]);
    }
  }
  //join it back to a string
  return result.join(' ');
}

//Solution with object lookup and pointers. More code but passes all test cases
//Uses objects for lookup and forgoes nested loops
function decrypt2(string) {
  //parsing input
  let cryptArr = string.split('\n');
  //isolating first word
  let termToDecrypt = cryptArr[0];
  //used to build decrypt map
  let decryptArr = [];

  let decryptMap = {};
  let result = '';

  //further processing string and removing | symbols. Pushing to decrypt ARR
  for (let i = 1; i < cryptArr.length; i++) {
    decryptArr.push(cryptArr[i].split('|'));
  }
 //building hashmap for translating
  for (let i = 0; i < decryptArr.length; i++) {
   if(!decryptMap[decryptArr[i][0]]){
   decryptMap[decryptArr[i][0]] = decryptArr[i][1]
   }
  }

  //we need to somehow take the first string and compare it to the map
  //we'll use pointers for this
  //we could leave these at the top with other variables but it's clearer here
  let start = 0;
  let end = 0;

  while (end <= termToDecrypt.length) {
    //if it exists
    if (termToDecrypt.substring(start, end) in decryptMap) {
      //we add the match to our result string
      result += decryptMap[termToDecrypt.substring(start, end)];

      //if it ends on an empty character we have to move the start pointer
      //ahead of the space
      if (termToDecrypt[end] === ' ') {
        start = end + 1;
      } else {
        //else we move it to meet the end character
        start = end;
      }
      //this makes sure we add spaces into our result array to preserve spacing
    } else if (termToDecrypt.substring(start, end) === '') {
      result += ' ';
    }
    //iterate end pointer otherwise
    end++;
  }
 
  return result;
}
// decrypt1(input1)//pass
// decrypt1(input2)//pass
// decrypt1(input3)//fails!!!
//decrypt2(input1)//pass
// decrypt2(input2)//pass
// decrypt2(input3)//pass
