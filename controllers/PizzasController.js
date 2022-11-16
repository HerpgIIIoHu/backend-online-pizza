import PizzasModel from '../models/Pizzas.js';

export const getAllPizzas = async (req, res) => {
  try {
    const params = await req.body;
    const cat = params.category;
    // if (cat === 0) {
    switch (params.sortBy) {
      case 'name': {
        const pizzas = await PizzasModel.find().sort({ name: 1 }).exec();
        return res.json(pizzas);
      }
      case 'price': {
        const pizzas = await PizzasModel.find().sort({ price: 1 }).exec();
        return res.json(pizzas);
      }
      default:
        const pizzas = await PizzasModel.find().sort({ rating: -1 }).exec();
        return res.json(pizzas);
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось получить пиццы',
    });
  }
};

export const getSortedName = async (req, res) => {
  try {
    const pizzas = await PizzasModel.find().sort({ name: 1 }).exec();
    return res.json(pizzas);
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось получить пиццы',
      err: err,
    });
  }
};

export const getSortedPriceLow = async (req, res) => {
  try {
    const pizzas = await PizzasModel.find().sort({ price: 1 }).exec();
    return res.json(pizzas);
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось получить пиццы',
      err: err,
    });
  }
};

export const getSortedPriceUp = async (req, res) => {
  try {
    const pizzas = await PizzasModel.find().sort({ price: -1 }).exec();
    return res.json(pizzas);
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось получить пиццы',
      err: err,
    });
  }
};
