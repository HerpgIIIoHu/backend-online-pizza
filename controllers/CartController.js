import UserModel from '../models/User.js';

export const addPizzaToCart = async (req, res) => {
  try {
    console.log(req.userId, req.body);
    const userId = await UserModel.findById(req.userId);
    const user = await UserModel.findById(userId);
    console.log(user);
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        cart: req.body.cart,
      },
    );
    return res.json({
      success: true,
      body: req.body,
      user: user,
    });
    // const pizzasObj = req.body;

    // const doc = new UserModel({
    //   email: req.body.email,
    //   passwordHash: hash,
    //   fullName: req.body.fullName,
    //   avatarUrl: req.body.avatarUrl,
    //   cart: req.body.cart,
    // });
    // return res.json({
    //   succes: true,
    // });
  } catch (err) {
    return res.json({
      error: err,
    });
  }
};
