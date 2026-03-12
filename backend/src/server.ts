import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 5000;

// health check route
app.get("/", (req, res) => {
  res.send("AI Smart Travel Planner Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});