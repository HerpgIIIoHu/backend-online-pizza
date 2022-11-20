import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import { UserControllers } from './controllers/index.js';
import { loginValidation, registrationValidation } from './validations.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import { getAllPizzas, getSortedName, getSortedPriceLow } from './controllers/PizzasController.js';
import checkAuth from './utils/checkAuth.js';
import { addPizzaToCart } from './controllers/CartController.js';

mongoose
  .connect('mongodb+srv://admin:1234@pizza.j0fj3ds.mongodb.net/users?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((err) => console.warn(`DB ${err}`)); // Подключились к нашей бд

const app = express(); // Создали экспресс приложение

const storage = multer.diskStorage({
  // Используем библиотеку мультер для загрузки файлов
  destination: (_, __, cb) => {
    // Говорим куда сохранять файл
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    // И под каким именем его сохранить
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); // Далее объясняем мультеру какое хранилище использовать
app.use(cors());
app.use(express.json()); //Для того чтобы наше приложение мого читать JSON формат
app.use('/uploads', express.static('uploads')); // Здесь говорим если придет гет запрос пом=смотри есть ли в этой папке такой файл

app.post('/auth/login', loginValidation, handleValidationErrors, UserControllers.login);
app.post(
  '/auth/register',
  registrationValidation,
  handleValidationErrors,
  UserControllers.register,
);
app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post('/pizzas', getAllPizzas);
app.get('/pizzas/sort-name', getSortedName);
app.get('/pizzas/sort-price-low', getSortedPriceLow);

app.patch('/add-pizza', checkAuth, addPizzaToCart);
// app.get('/cart', checkAuth, getCartItems)

//
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
