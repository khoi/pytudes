import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const arg = Bun.argv[2];

if (!arg) {
	console.error("Usage: bun day <day>");
	console.error("Example: bun day 1");
	process.exit(1);
}

const dayNum = parseInt(arg, 10);
const path = isNaN(dayNum)
	? arg
	: join(
			__dirname,
			"..",
			"src",
			`day${dayNum.toString().padStart(2, "0")}`,
			"index.ts",
		);

spawn("bun", ["--watch", path], { stdio: "inherit" });
