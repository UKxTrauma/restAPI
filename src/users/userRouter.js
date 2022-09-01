const { Router } = require("express")
const userRouter = Router()
const { listUsers, addUser, userDeleteOne, userEdit, userDeleteMany, login, nameEdit, emailEdit, passwordEdit } = require("./userController")
const { hashPassword, tokenCheck } = require("../middleware")

userRouter.get("/user/list", listUsers)

userRouter.post("/user/signup", [hashPassword], addUser)

userRouter.post("/user/login", login)

userRouter.delete("/user/delete", [tokenCheck], userDeleteOne)

userRouter.delete("/user/deleteall", [tokenCheck], userDeleteMany)

// userRouter.put("/user/edit", [hashPassword, hashNewPass, tokenCheck], userEdit)

userRouter.put("/user/editname", [tokenCheck], nameEdit)

userRouter.put("/user/editemail", [tokenCheck], emailEdit)

userRouter.put("/user/editpassword", [hashPassword, tokenCheck], passwordEdit)

module.exports = userRouter;