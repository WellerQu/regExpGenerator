# regExpGenerator

generate a regExp string by a sample string and some selected strings

![CI](https://github.com/WellerQu/regExpGenerator/workflows/CI/badge.svg)

## Usage

### Living Demo

[demo](https://codesandbox.io/s/living-demo-m8t8r?file=/src/index.js)

All the demo that you can find it from the test case `src/regExpGenerator.spec.ts`

### Basic

- A simple demo

Here, we have two samples

sample1: `Question: how old are you? Answer: I am 26 years old`

sample2: `Question: how old are you? Answer: I am 32 years old`

we use sample1 to generate a RegExp string to extract a age from sample2

```javascript
const sample1 = "Question: how old are you? Answer: I am 26 years old";
const sample2 = "Question: how old are you? Answer: I am 32 years old";

const result = generate(sample1, [
  {
    name: "age",
    value: "26",
    startIndex: 40
  }
]);

// the result.expr is the generated regexp string
// the result.matches is the position mapping

const reg = new RegExp(result.expr, "im");
const matches = reg.exec(sample2);

console.log(matches[result.names["age"].groupIndex]);
// output is 32
```

- A complex demo


Here, we have two samples, too

sample1: `Sep 25 01:22:59 10.5.172.40 Feb 24 19:44:58 BD-Panorama 1,2020/09/25 01:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/25 01:22:59,,globalprotectgateway-agent-msg,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway agent message. Login from: 192.168.55.100, User name: tng\jordy, Time: Fri Sep 25 01:22:59 2016., Message: Agent Disable, Comment: none. Override(s)=1.",641825,0x8000000000000000,0,0,0,0,,PA-VM`

sample2: `Sep 25 02:22:59 10.5.172.40 Feb 24 22:46:02 BD-Panorama 1,2020/09/25 02:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/25 02:22:59,,globalprotectportal-auth-succ,GP-Portal-1,0,0,general,informational,"GlobalProtect portal user authentication succeeded. Login from: 65.55.223.21, User name: tng\troy, Auth type: profile.",642013,0x8000000000000000,0,0,0,0,,PA-VM`

we use sample1 to generate a RegExp string to extract the first IP, the third time, and the username.

```javascript
const sample1 = `Sep 25 01:22:59 10.5.172.40 Feb 24 19:44:58 BD-Panorama 1,2020/09/25 21:22:59,007200001165,SYSTEM,globalprotect,0,2020/09/25 01:22:59,,globalprotectgateway-agent-msg,VPN-GW-N,0,0,general,informational,"GlobalProtect gateway agent message. Login from: 192.168.55.100, User name: tng\\jordy, Time: Fri Sep 25 01:22:59 2016., Message: Agent Disable, Comment: none. Override(s)=1.",641825,0x8000000000000000,0,0,0,0,,PA-VM`;
const sample2 = `Sep 25 02:22:59 1.5.12.42 Feb 24 22:46:02 BD-Panorama 1,2020/09/25 12:02:59,007200001165,SYSTEM,globalprotect,0,2020/09/25 02:22:59,,globalprotectportal-auth-succ,GP-Portal-1,0,0,general,informational,"GlobalProtect portal user authentication succeeded. Login from: 65.55.223.21, User name: tng\\troy, Auth type: profile.",642013,0x8000000000000000,0,0,0,0,,PA-VM`;

const result = generate(sample1, [
  {
    name: "the first IP",
    value: "10.5.172.40",
    startIndex: 16
  },
  {
    name: "the third time string",
    value: "21:22:59",
    startIndex: 69
  },
  {
    name: "the username",
    value: "tng\\jordy",
    startIndex: 278
  }
]);

const reg = new RegExp(result.expr, "im");
const matches = reg.exec(sample2);

console.log("the first IP is ", matches[result.names["the first IP"].groupIndex]); // 1.5.12.42
console.log("the third time string", matches[result.names["the third time string"].groupIndex]); // 12:02:59
console.log("the username is ", matches[result.names["the username"].groupIndex]); // tng\troy
```

### Advanced

Use the third parameter of Generate

```javascript
{
  level: string,
  // optional,
  // the value is 'fuzzy' or 'normal' or 'exact'
  // you can use the level to control the precision
  separator: string
  // optional
  // use to split the sample string and make sure the position,
  // you can use the separator to get the shorter regexp string
}
```

and you can use the parameter as below:

```javascript
const result = generate(sampleStr, selected, {
  level: 'exact',
  separator: '/'
})
```
