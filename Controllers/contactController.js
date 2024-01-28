// @desc of all contacts
// @route get /api/contacts
// @access public
const getContacts = async (req,res) => {
    res.status(200).json({message : "Get all contacts"});
}

// @desc of contact
// @route get /api/contacts/:id
// @access public
const getContact = async (req,res)=>{
    res.status(201).json({message : `Get contact for ${req.params.id}`});
}

// @desc of new contact
// @route post /api/contacts/:id
// @access public
const createContact = async (req,res)=>{
    let {name , email, contact} = req.body;
    if(!name || !email || !contact){
        res.status(400);
        throw new Error("All field are mandatory!!!");
    }
    else{
        res.status(201).json({message : `Create new contact`});
    }
}

// @desc of update contact
// @route update /api/contacts
// @access public
const updateContact = async (req,res)=>{
    res.status(200).json({message : `Update contact for ${req.params.id}`});
}

// @desc of delete contact
// @route delete /api/contacts
// @access public
const deleteContact = async (req,res)=>{
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
}

module.exports = {getContact,getContacts,createContact,updateContact,deleteContact};