const authMiddleware = (roles) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (!roles.includes(user.role)) {
        return res.status(403).json({ status: 'error', message: 'Acceso denegado' });
      }
  
      next();
    };
  };
  
  export default authMiddleware;
  