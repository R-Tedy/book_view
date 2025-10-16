import express from "express";
import Book from "../models/Book.js";
import cloudinary from "../lib/cloudinary.js";
import protectRoute from "../middleware/auth.middleware.js";
import "dotenv/config";

const router = express.Router();
const stedyId = process.env.USER_ID;

router.post("/",  async (req, res) => {
  try {
    const {title, caption, rating, image} = req.body;

    if (!image || !title || !caption || !rating) {
      return res.status(400).json({message: "Please provide all fields."});
    };

    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    })

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).json({message: "Internal server error."});
  }
});

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    })
  } catch (error) {
    console.error("Error in getting all books route", error);
    res.status(500).json({message: "Internal server error."});
  }
});

router.get("/user", async (req, res) => {
  try {
    const books = await Book.find({user: req.user._id}).sort({createdAt: -1});
    res.json(books);
  } catch (error) {
    console.error("Error accessing user books:", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({message: "Book not found"});

    if (book.user.toString() !== req.user._id.toString()) return res.status(401).json({message: "Unauthorized"});

    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting image from cloudinary:", error);
      };
    };

    await book.deleteOne();

    res.json({message: "Book deleted successfully"})
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({message: "Internal server error"});
  }
})

export default router;