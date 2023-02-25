const asyncHandler = require('express-async-handler')

const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async(req, res)=>{
    const contacts = await Contact.find()
    res.status(200).json(contacts);
});

//@desc create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req, res)=>{
    const {name,email,phone} = req.body;
    if (!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contacts = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contacts);
});

//@desc get a specific contact
//@route GET /api/contacts/:id
//@access public
const getContactById = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc update a specific contact
//@route PUT /api/contacts/:id
//@access public
const updateContactById = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id)
   
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedContact);
});


//@desc update a specific contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContactById = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id)
   
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.remove()

    res.status(200).json(contact);
});




module.exports = {
    getContact, 
    createContact, 
    getContactById, 
    updateContactById,
     deleteContactById
    }