const program = require("commander");
const fs = require("fs");
const { options } = require("marked");
const md2html = require("./md2html");

program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);

const cliOptions = {
    gfm: false,
    ...program.opts(),
};


console.log(cliOptions);

const filePath = program.args[0];
console.log(filePath);

fs.readFile(filePath, { encoding: "utf8"} ,(err, file) => {
    if(err) {
        console.log(err.message);
        process.exit(1);
        return;
    }
    const html = md2html(file, cliOptions);
    console.log(html);
});