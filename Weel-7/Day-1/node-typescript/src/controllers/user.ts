import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUsers = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const user = await deleteUserById(id);

    if (!user) {
      return res.sendStatus(400);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUsers = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);
    user.username = username;
    await user.save();
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
