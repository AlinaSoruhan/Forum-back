import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { db } from "./prisma/db.js";

import { hashPassword, verifyPassword } from "./lib/password.js";
import { 
    signAccessToken, 
    signRefreshToken, 
    verifyAccessToken, 
    verifyRefreshToken 
} from "./lib/jwt.js";

import { createUserRepository } from "./repositories/user.js";
import { createAuthService } from "./services/auth"; 
import { createUserHandler } from "./transport/handlers/user/user.js";
import { createUserRouter } from "./transport/routers/auth.js";
import { createRequireAuth } from "./transport/middlewares/require-auth.js";

import { createCategoryRepository } from "./repositories/category.js";
import { createCategoryService } from "./services/category.js";
import { createCategoryHandlers } from "./transport/handlers/category/category.js";
import { createCategoryRouter } from "./transport/routers/category.js";

import { createProductRepository } from "./repositories/product.js";
import { createProductService } from "./services/product.js";
import { createProductHandlers } from "./transport/handlers/product/product.js";
import { createProductRouter } from "./transport/routers/product.js";

const app = express();
const PORT = 6767;

const categoryRepository = createCategoryRepository(db);
const categoryService = createCategoryService(categoryRepository);
const categoryHandlers = createCategoryHandlers(categoryService);
const categoryRouter = createCategoryRouter(categoryHandlers);

const productRepository = createProductRepository(db);
const productService = createProductService(productRepository);
const productHandlers = createProductHandlers(productService);
const productRouter = createProductRouter(productHandlers);

const userRepository = createUserRepository(db);
const userService = createAuthService(
    userRepository, 
    { hash: hashPassword, verify: verifyPassword }, 
    { signAccessToken, signRefreshToken },
    { verifyAccessToken, verifyRefreshToken }
);
const userHandler = createUserHandler(userService);
const requireAuth = createRequireAuth(verifyAccessToken);
const userRouter = createUserRouter(userHandler, requireAuth);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}));

app.use(cookieParser());
app.use(express.json());

app.use("/products", productRouter);
app.use("/categories", categoryRouter); 
app.use("/auth", userRouter);

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
