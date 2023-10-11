const express = require("express");
const app = express();
const path = require("path"); // Add this line

// Set the views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

function checkWorkingHours(req, res, next) {
	const now = new Date();
	const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
	const currentHour = now.getHours();

	// Check if it's a weekday (Monday to Friday) and between 9 AM and 5 PM
	if (
		dayOfWeek >= 1 &&
		dayOfWeek <= 5 &&
		currentHour >= 9 &&
		currentHour < 17
	) {
		// Continue with the request if it's within working hours
		next();
	} else {
		// Return a response indicating that the application is closed
		res
			.status(403)
			.send(
				"The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
			);
	}
}

// Apply the custom middleware to all routes
app.use(checkWorkingHours);

// Define routes
app.get("/", (req, res) => {
	res.render("home");
});

app.get("/service", (req, res) => {
	res.render("service");
});

app.get("/contact", (req, res) => {
	res.render("contact");
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
