// const {Contact} = require('../models/contact');

// const { HttpError, ctrlWrapper } = require('../helpers');

// const getAll = async (req, res) => {
//     const { _id: owner } = req.user;
//     const { page = 1, limit = 10 } = req.query;
//     const skip = (page - 1) * limit;
//         const result = await Contact.find({owner}, "-createdAt -updatedAt",).populate("owner", "name email");
//         res.json(result);
// };

// const getById = async (req, res) => {
//         const { contactId } = req.params;
//         const result = await Contact.findOne({_id: contactId});
//         if (!result) {
//             throw HttpError(404, "Not found");
//         }
//         res.json(result);
// };

// const add = async (req, res) => {
//     const { _id: owner } = req.user;
//         const result = await Contact.create({...req.body, owner});
//         res.status(201).json(result);
// };

// const updateById = async (req, res) => {
//         const { contactId } = req.params;
//         const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
//         if (!result) {
//             throw HttpError(404, "Not found");
//         }
//         res.json(result);
// };

// const updateFavorite = async (req, res) => {
//         const { contactId } = req.params;
//         const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
//         if (!result) {
//             throw HttpError(404, "Not found");
//         }
//         res.json(result);
// };

// const deleteById = async (req, res) => {
//         const { contactId } = req.params;
//         const result = await Contact.findByIdAndRemove(contactId);
//         if (!result) {
//             throw HttpError(404, "Not found");
//         }
//         res.json({
//             message: "contact deleted"
//         });
// };

// module.exports = {
//     getAll: ctrlWrapper(getAll),
//     getById: ctrlWrapper(getById),
//     add: ctrlWrapper(add),
//     updateById: ctrlWrapper(updateById),
//     updateFavorite: ctrlWrapper(updateFavorite),
//     deleteById: ctrlWrapper(deleteById),
// };

// ============================================================

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const { User } = require('../models/user');

// const { HttpError, ctrlWrapper } = require('../helpers');

// const { SECRET_KEY } = process.env;

// const register = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//         throw HttpError(409, "Email already in use");
//     };

//     const hashPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({...req.body, password: hashPassword});

//     res.status(201).json({
//         name: newUser.name,
//         email: newUser.email,
//         subscription: newUser.subscription,
//     });
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw HttpError(401, "Email or password is wrong");
//     };

//     const passwordCompare = await bcrypt.compare(password, user.password);
//     if (!passwordCompare) {
//          throw HttpError(401, "Email or password is wrong");
//     };

//     const payload = {
//         id: user._id,
//     };

//     const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
//     await User.findByIdAndUpdate(user._id, { token });

//     res.json({
//         token,
//     })
// };

// const getCurrent = async (req, res) => {
//     const { email, subscription } = req.user;

//     res.json({
//         email,
//         subscription,
//     })
// };

// const logout = async (req, res) => {
//     const { _id } = req.user;
//     await User.findByIdAndUpdate(_id, { token: "" });

//     res.json({
//         message: "Logout success",
//     })
// };

// module.exports = {
//     register: ctrlWrapper(register),
//     login: ctrlWrapper(login),
//     getCurrent: ctrlWrapper(getCurrent),
//     logout: ctrlWrapper(logout),
// };