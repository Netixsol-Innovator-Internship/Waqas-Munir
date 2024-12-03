const { readFile, writeFile } = require("fs/promises");

const getUsers = async () => {
  const content = await readFile("users.json", "utf-8");
  const users = JSON.parse(content);
  return users;
};

const createUser = async (data) => {
  await writeFile("users.json", JSON.stringify(data), "utf-8");
};

module.exports = { getUsers, createUser };
