import Joi from "joi";

export default Joi.object({
  artistId: Joi.number().integer().required(),
});
