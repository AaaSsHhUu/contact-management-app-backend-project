const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc of all contacts
// @route get /api/contacts
// @access private
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

// @desc of contact
// @route get /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.send(contact);
})

// @desc of new contact
// @route post /api/contacts/:id
// @access private
const createContact = asyncHandler(async (req,res)=>{
    let {name , email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All field are mandatory!!!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact);
})

// @desc of update contact
// @route update /api/contacts
// @access private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    
    res.status(200).send(updatedContact);
})

// @desc of delete contact
// @route delete /api/contacts
// @access private
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).send(contact);
})

module.exports = {getContact,getContacts,createContact,updateContact,deleteContact};