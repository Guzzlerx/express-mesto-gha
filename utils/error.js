function handleError(err, res) {
  if (err.name === "ValidationError") {
    res.status(404).send({ message: "Переданы некорректные данные." });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).send({
      message: "Данные по запросу не удалось найти.",
    });
    return;
  }

  res.status(500).send({ message: "Что-то пошло не так" });
}

module.exports = handleError;
