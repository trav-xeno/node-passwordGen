import inq = require("inquirer");
import chalk = require("chalk");
import { promises as fs } from "fs";

const writeToFile = async (data: String) => {
  try {
    await fs.writeFile("password..txt", data, "utf8");
    console.log(chalk.blue("password.txt has been created!"));
  } catch (err) {
    console.log(
      chalk.redBright(
        `There was an error while trying to create the password.txt!`
      )
    );
    console.log(err);
  }
};
const ask = (): Promise<any> => {
  return inq.prompt([
    {
      type: "input",
      name: "length",
      message: "How long would you like your password?",
      validate: function(length) {
        if (length === "") {
          return "This can" + chalk.red("NOT be empty");
        } else if (isNaN(length)) {
          return "This " + chalk.red("MUST be a number!");
        } else if (parseInt(length) < 8 || parseInt(length) > 128) {
          return (
            "This can " +
            chalk.red.underline("NOT") +
            "be " +
            chalk.redBright.underline("LESS then 8 and MORE than 128!") +
            " " +
            +chalk.underline("Please enter again")
          );
        }
        return true;
      }
    },
    {
      type: "checkbox",
      name: "result",
      message: "What would you like to add?:",
      choices: ["numbers", "Special Chars", "lower case", "upper case"],
      validate: function(result) {
        if (result.length == 0) {
          return (
            "You " +
            chalk.red("MUST") +
            " select at least " +
            chalk.underline("one!")
          );
        }
        return true;
      }
    }
  ]);
};
class GenPassword {
  list: String[];
  length: string;
  num: boolean;
  sp: boolean;
  lowChar: boolean;
  upChar: boolean;
  constructor(length: string, list: String[]) {
    this.list = list;
    this.length = length;
    this.num = false;
    this.sp = false;
    this.lowChar = false;
    this.upChar = false;
  }
  check(): void {
    if (this.list.length == 4) {
      this.num = true;
      this.sp = true;
      this.lowChar = true;
      this.upChar = true;
    } else {
      if (this.list.includes("numbers")) {
        this.num = true;
      }
      if (this.list.includes("Special Chars")) {
        this.sp = true;
      }
      if (this.list.includes("lower case")) {
        this.lowChar = true;
      }
      if (this.list.includes("upper case ")) {
        this.upChar = true;
      }
    }
  }
  genString(): String {
    let str = "";
    // code use ascII codes but this is easier then going through all the numbers
    //the ascII way might be fast but i'll have to check to see peroramnce if there is no performacne differance then this is fine
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = lowerCase.toUpperCase();
    const number = "0123456789";

    const spChar = "!@#-_.,:|~?+*=";
    if (this.num) {
      str += number;
    }
    if (this.sp) {
      str += spChar;
    }
    if (this.lowChar) {
      str += lowerCase;
    }
    if (this.upChar) {
      str += upperCase;
    }
    return str;
  }
  create() {
    const len = parseInt(this.length);
    this.check();
    let str = this.genString();
    let pass = "";
    for (let i = 0; i < len; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    return pass;
  }
}

class App {
  result: any;

  constructor() {}

  generate(ob: any) {
    console.log(ob);
    const { length, result } = ob;
    let gen = new GenPassword(length, result);

    return gen.create();
  }
  async start() {
    this.result = await ask();
    let password = await this.generate(this.result);
    console.log(chalk.blue("-----your password-----"));
    console.log(chalk.green(password));
    writeToFile(password);
  }
}
const app = (): void => {
  let genpass = new App();
  genpass.start();
};
app();
