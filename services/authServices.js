export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await authService.getUserById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.registerUser(email, password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    await authService.logoutUser(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

//export const updateSubscription = async (req, res, next) => {