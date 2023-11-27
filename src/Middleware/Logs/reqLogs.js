const logAllRequests = (req, res, next)=>{
    const requestItem = `${req.ip} - - ${new Date().toString()} - - ${req.method} - - ${req.url} - - ${req.headers["user-agent"]}`;
	console.log(requestItem);
    next();
};

module.exports = {logAllRequests};