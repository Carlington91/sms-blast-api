const Contact = require('../models/contactModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


// function isValid(p) {
//   const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
//   if (p) {
//     let digits = p.replace(/\D/g, '');
//     const format = digits.match(phoneRegex)
//     if (phoneRe.test(digits)) {
//       return digits;
//     }
//   }
// }

function formatPhoneNumber(p) {
  const phoneRegex = /^(\d{3})(\d{3})(\d{4})$/;

  let digits = p.replace(/\D/g, '');
  const format = digits.match(phoneRegex);
  if (format) {
    return `(${format[1]}) ${format[2]}-${format[3]}`;
  }
  return null;
}

exports.create = catchAsyncErrors(async (req, res,next) => {
  let contact = await Contact.findOne({phone:req.body.phone})
  if (contact) return next(new ErrorHandler(`A contact with ${req.body.phone} already existed`, 400));

  contact = await Contact.create(req.body);
 

  res.status(200).json({
    success: true,
    contact,
  });
});

exports.createContactExcelCsv = catchAsyncErrors(async (req, res, next) => {
  const { formFile } = req.body;
  let contact;
  let contacts = [];
  let error = []

  await Promise.all(formFile.rows.map(async (c) => {
    c.group = req.body.group;
    let phone = formatPhoneNumber(c.phone);
    c.phone = phone;
  
    contact = await Contact.findOne({ firstname:c.firstname });
    return contact ? error.push(c):contacts.push(c);
  }))

  const errMessage = Object.values(error).map((el) => {
    return `${el.firstname} ${el.middlename && el.middlename} ${el.lastname} with ${el.phone} already exist`;
  });

  console.log(errMessage);

  if(error.length > 0) return next(new ErrorHandler(errMessage, 400));

  await Contact.insertMany(contacts);
  

  res.status(200).json({
    success: true,
  });
});

exports.list = catchAsyncErrors(async (req, res) => {
  const contacts = await Contact.find({ group: req.query.group })
    .sort({ createdAt: -1 })
    .populate('group', 'name');
  if (!contacts) return next(new ErrorHandler('No contact found', 404));

  res.status(200).json({
    success: true,
    contacts,
  });
});

exports.read = catchAsyncErrors(async (req, res) => {

 const contact = await Contact.findById(req.params.id).populate('group','name');
  if (!contact) return next(new ErrorHandler('No contact found', 404));

  res.status(200).json({
    success: true,
    contact,
  });
});

exports.update = catchAsyncErrors(async (req, res) => {
  
  let contact = await Contact.findById(req.query.id);
  if (!contact) return next(new ErrorHandler('No contact found', 404));

 contact = await Contact.findByIdAndUpdate(contact._id, {$set: req.body },{new:true});

  res.status(200).json({
    success: true,
    msg:'Contact updated successfully',
    contact,
  });
});

exports.remove = catchAsyncErrors(async (req, res) => {
  const contact = await Contact.findById(req.query.id);
  if (!contact) return next(new ErrorHandler('No contact found', 404));

  await contact.remove()

  res.status(200).json({
    success: true,
  });
});
