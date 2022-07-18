// function handleError(err, res) {
//   if (err.name === "ValidationError") {
//     res.status(400).send({ message: "Переданы некорректные данные." });
//     return;
//   }

//   if (err.name === "CastError") {
//     res.status(404).send({
//       message: "Данные по запросу не удалось найти.",
//     });
//     return;
//   }

//   res.status(500).send({ message: "Что-то пошло не так" });
// }
const validationErrorMessage = { message: "Переданы некорректные данные." };
const castErrorMessage = { message: "Данные не найдены по запросу." };
const serverErrorMessage = { message: "Сервер не отвечает." };

module.exports = {
  validationErrorMessage,
  castErrorMessage,
  serverErrorMessage,
};
