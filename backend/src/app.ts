import express from 'express';
import { connectDB } from './config/database';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API 服务器运行在端口 ${PORT}`);
}); 