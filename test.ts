import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
console.log("MONGODB_URI:", process.env.MONGODB_URI);


if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI in environment variables");
}

async function testConnection() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      dbName: "technopulse", // optional since your URI already has it
    });
    console.log("✅ Connected to MongoDB");

    // Define a simple schema and model
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now },
    });
    const Test = mongoose.model("Test", testSchema);

    // Insert a test document
    const doc = await Test.create({ name: "Test User" });
    console.log("✅ Document inserted:", doc);

    // Optional: Fetch documents to verify
    const allDocs = await Test.find();
    console.log("All documents in Test collection:", allDocs);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

testConnection();
