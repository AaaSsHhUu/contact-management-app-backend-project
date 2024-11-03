const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc of all contacts
// @route get /api/contacts
// @access private
const getContacts = asyncHandler(async (req,res,next) => {
    const contacts = await Contact.find();
    if(!contacts){
        res.status(404);
        return next(new Error("Contacts not found"));
    }
    return res.status(200).json(contacts);
})

// @desc of contact
// @route get /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req,res,next)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        return next(new Error("Contact Not Found"));
    }
    res.send(contact);
})

// @desc of new contact
// @route post /api/contacts/:id
// @access private
const createContact = asyncHandler(async (req,res,next)=>{
    let {name , email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        return next(new Error("All field are mandatory!!!"));
    }
    const newContact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    })

    if(!newContact){
        res.status(500);
        return next(new Error("Something went wrong while creating new contact"));
    }
    res.status(201).json(newContact);
})

// @desc of update contact
// @route update /api/contacts
// @access private
const updateContact = asyncHandler(async (req,res,next)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        return next(new Error("Contact Not Found"));
    }

    // If a user is trying to update contact of another user
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        return next(new Error("Not Authroized to update other's contact"));
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    
    if(!updatedContact){
        res.status(500);
        return next(new Error("Something went wrong while updating contact"));
    }

    res.status(200).json({
        success : true,
        message : "Contact updated successfully",
    });
})

// @desc of delete contact
// @route delete /api/contacts
// @access private
const deleteContact = asyncHandler(async (req,res,next)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        return next(new Error("Contact Not Found"));
    }

    // If a user is trying to delete contacts of another user
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        return next(new Error("Not Authorized to delete other's contact"));
    }
    const deletedContact = await Contact.deleteOne({_id : req.params.id});
    if(!deletedContact){
        res.status(500);
        return next(new Error("Something went wrong while deleting the contact"));
    }
    res.status(200).json({
        success : true,
        message : "Contact deleted successfully",
    });
})

module.exports = {getContact,getContacts,createContact,updateContact,deleteContact};