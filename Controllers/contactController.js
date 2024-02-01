const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc of all contacts
// @route get /api/contacts
// @access public
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

// @desc of contact
// @route get /api/contacts/:id
// @access public
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
// @access public
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
// @access public
const updateContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message : `Update contact for ${req.params.id}`});
})

// @desc of delete contact
// @route delete /api/contacts
// @access public
const deleteContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
})

module.exports = {getContact,getContacts,createContact,updateContact,deleteContact};