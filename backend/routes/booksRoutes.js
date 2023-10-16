import  express  from "express";
import { Book } from "../models/bookModel.js";


const router= express.Router();

// Route for save a new book
router.post("/",async(req,res)=>{
    try{
        if(!req.body.title ||!req.body.author ||!req.body.publishYear )
        {
            return res.status(400).send({
                massage: "send all requires field : title,author,publishYear",
            });
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }catch(error){
        console.log(error.massage);
        res.status(500).send({massage: error.massage});
    }
});

//get route to get all books from database
router.get("/",async(req,res)=>{

    try{
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data: books
        });
    }catch(error){
        console.log(error.massage);
        res.status(500).send({massage: error.massage});
    }
});


//get route to get one books from database by ID
router.get("/:id",async(req,res)=>{

    try{
        const { id }= req.params;

        const book = await Book.findById({_id:id});
        return res.status(200).json(book);
    }catch(error){
        console.log(error.massage);
        res.status(500).send({massage: error.massage});
    } 
});

//route for update a book
router.put("/:id",async(req,res)=>{

try{
        if(!req.body.title ||!req.body.author ||!req.body.publishYear )
        {
            return res.status(400).send({
                message: "send all requires field : title,author,publishYear",
            });
        }
        const {id} = req.params;

        const result= await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({messsge: "book not found"});
        }else{
            return res.status(200).send({messsge: "book updates successfully"});
        }

    }catch(error){
        console.log(error.massage);
        res.status(500).send({massage: error.massage});
    }
});

// route for delete a book
router.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({messsge: "book not found"});
        }else{
            return res.status(200).send({messsge: "book deleted successfully"});
        }
    } catch (error) {
        console.log(error.massage);
        res.status(500).send({massage: error.massage});
    }
})


export default router;