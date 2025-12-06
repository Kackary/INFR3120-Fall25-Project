const session = require("express-session");
const express = require("express");
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGODB_URI || "mongodb://localhost/tasktrackerDB";
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.loggedIn = !!(req.session && req.session.userId);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layout");

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("Connection error:", err);
});
db.once("open", () => console.log("✅ Connected to MongoDB"));

const Task = require("./models/Task");
const User = require("./models/User");

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).send("Email already registered");
    }

    const user = await User.create({ email, password });
    req.session.userId = user._id;
    res.redirect("/");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login body:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.render("login", {
        title: "Login",
        error: "Invalid email or password"
      });
    }


    req.session.userId = user._id;
    res.redirect("/");
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Error logging in");
  }
});


function requireLogin(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

app.get("/", async (req, res) => {
  console.log("GET / hit");
  try {
    const tasks = await Task.find();
    console.log("Tasks from DB:", tasks.length);
    res.render("index", { title: "Task Tracker", tasks });
  } catch (err) {
    console.error("Error in GET /:", err);
    res.status(500).send("Error loading tasks");
  }
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});



app.get("/register", (req, res) => {
  res.render("register", { title: "register" });
});



app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.get("/reset-password", (req, res) => {
  res.render("reset-password", { title: "Reset Password" });
});

app.post("/reset-password", async (req, res) => {const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("reset-password", {title: "Reset Password", error: "Email not found" });
    }

    user.password = newPassword;
    await user.save();
    return res.render("reset-password", {title: "Reset Password", success: "Password successfully updated"});

  } catch (err) {
    console.error("Error resetting password:", err);
    res.render("reset-password", {title: "Reset Password", error: "Error resetting password"});
  }
});

app.get("/add", requireLogin, (req, res) => {
  res.render("add", { title: "Add Task" });
});

app.post("/add", requireLogin, async (req, res) => {
  try {
    await Task.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      completed: false,
    });
    res.redirect("/");
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).send("Error adding task");
  }
});

app.get("/edit/:id", requireLogin, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("No Task Found");
    }
    res.render("edit", { title: "Edit Task", task });
  } catch (err) {
    console.error("Error loading edit page:", err);
    res.status(500).send("Error loading edit page");
  }
});

app.post("/update/:id", requireLogin, async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Error updating task");
  }
});

app.post("/delete/:id", requireLogin, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Error deleting task");
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
