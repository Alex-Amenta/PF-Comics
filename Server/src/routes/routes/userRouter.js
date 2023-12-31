const { Router } = require('express');
const { getAllUsersHandler, getUserByIdHandler, postUserHandler, updateUserHandler, toggleUserActiveHandler, loginUserHandler, deleteAccountHandler, userActivateByToken, resender, ResetPassword, changePassword } = require('../../handlers/userHandler');
const {googleLoginUserHandler} = require('../../handlers/googleLoginHandler');

const verifyJWT = require('../../utils/verifyJwt');
const verifyAdmin = require('../../utils/verifyIsAdmin');

const verifyJwtPassword = require('../../utils/verifyJwtPassword')

const userRouter = Router();

// para el admin
userRouter.get('/',verifyJWT, verifyAdmin, getAllUsersHandler); 
userRouter.put('/toggle/:id',verifyJWT, verifyAdmin, toggleUserActiveHandler);

// para el user
userRouter.get('/:id',verifyJWT, getUserByIdHandler); // profile
userRouter.put('/:id',verifyJWT, updateUserHandler);
userRouter.post('/resend/:id',verifyJWT, resender); // resend email')

userRouter.delete('/:id/delete', deleteAccountHandler);

// estas rutas no pueden tener verify JWT porque no tienen token
userRouter.post('/auth', googleLoginUserHandler); 
userRouter.post('/verify/:token', userActivateByToken)
userRouter.post('/register', postUserHandler); // sign up   
userRouter.post('/login', loginUserHandler); // login



// para restaurar contraseña
userRouter.post('/reset-password', ResetPassword);
userRouter.post('/reset-password/:token', changePassword)


module.exports = userRouter;