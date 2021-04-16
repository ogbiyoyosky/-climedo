import Joi from "@hapi/joi";
import logger from "../../logger";


const dataType = Joi.object().keys({
  dataType: Joi.string()
    .error(new Error("dataType must be a string"))
    .required(),
  label: Joi.string()
  .error(new Error("label must be a string"))
  .required(),
  description: Joi.string()
  .error(new Error("description must be a string"))
  .required(),
  options: Joi.array()
  .error(new Error("options must be an array of string"))
  .items(Joi.string()),
  placeholder: Joi.string()
  .error(new Error("placeholder must be a string"))
  
});

const validator = {
  validateBody: (schema) => (req, res, next) => {
    //logger.info("body", req.body);
    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).send({
        status: "bad request",
        status_code: 400,
        error: result.error.message,
      });
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    tab: Joi.object().keys({
      name: Joi.string()
        .required()
        .trim()
        .error(new Error("name is required")),
      description : Joi.string()
      .required()
      .trim()
      .error(new Error("description is required")),
      dataPoints: Joi.array().required().items(dataType),}),
  
  },

  


};

export default validator;
