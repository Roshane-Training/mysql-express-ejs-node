require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = new express.Router();

const studentsRoute = require("./routes/students");
const trainersRoute = require("./routes/trainers");

const APP_PORT = process.env.APP_PORT;

app.set("view engine", "ejs");
app.use(cors(["*"]));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentsRoute);
app.use("/trainers", trainersRoute);

app.listen(APP_PORT, () => {
	console.log();
	console.log(`APP LISTENING ON http://localhost:${APP_PORT}`);
	console.log();
});

const prettyPrint = (title, results) => {
	if (title) {
		console.log("\n\n\n");
		console.log("================================================================");
		console.log("\t\t\t", title);
		console.log("================================================================");
	}
	console.table(results);
};
