import { ValidationError } from "sequelize";

const errorhandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        err.status = 400;
    }
    
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
};

export default errorhandler;