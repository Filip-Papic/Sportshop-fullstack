const Joi = require('joi');

const registerValid = Joi.object({
    name: Joi.string().trim().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().alphanum().min(2).max(30).required(),
    adress: Joi.string().alphanum().trim().required(),
    postalCode: Joi.number().integer().required(),
    city: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    admin: Joi.boolean(),
    moderator: Joi.boolean()
}).options({ stripUnknown: true });

const loginValid = Joi.object({
    name: Joi.string().trim().alphanum().min(2).max(30).required(),
    password: Joi.string().trim().alphanum().min(2).max(30).required()
});

const idValid = Joi.object({
    id: Joi.number().integer().min(1).required()
});

const productValid = Joi.object({
    name: Joi.string().trim().required(),
    manufacturer: Joi.string().trim().required(),
    price: Joi.number().integer().required(),
    description: Joi.string().trim().min(2).max(100).required(),
    size: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    quantityStock: Joi.number().integer().required(),
    categoryID: Joi.number().integer().min(1).required()
}).options({ stripUnknown: true });

const categoryValid = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required()
}).options({ stripUnknown: true });

const orderValid = Joi.object({
    userID: Joi.number().integer().min(1).required(),
    priceTotal: Joi.number().integer().required(),
    quantityTotal: Joi.number().integer().required(),
    details: Joi.string().trim().min(2).max(100).required()
}).options({ stripUnknown: true });

const orderProductsValid = Joi.object({
    productID: Joi.number().integer().min(1).required(),
    quantity: Joi.number().integer().required()
}).options({ stripUnknown: true });

module.exports = {
    registerValid,
    loginValid,
    idValid,
    productValid,
    categoryValid,
    orderValid,
    orderProductsValid
};