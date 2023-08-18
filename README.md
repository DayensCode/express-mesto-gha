[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Backend-проект: "Mesto"

## Описание проекта

Данное серверное приложение предназначено для храниния и обмена файлами с вэб-приложением Mesto. Фронтенд часть проекта находится [тут](https://github.com/DayensCode/react-mesto-auth).

## Используемые технологии

[NodeJS](https://ru.wikipedia.org/wiki/Node.js)
[Express](https://ru.wikipedia.org/wiki/Express_(фреймворк))
[MongoDB](https://ru.wikipedia.org/wiki/MongoDB)
[Mongoose](https://en.wikipedia.org/wiki/Mongoose_(MongoDB))

## Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload

## Функционал

- Регистрация
- Авторизация
- Обновление данных пользователя
- Обновление аватара пользователя
- Получение пользователя по ID
- Получение информации о текущем пользователе
- Получение списка карточек
- Создание карточки
- Удаление карточки
- Постановка лайка
- Снятие лайка
- Обработка ошибок
- Валидация входящих данных

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки

Остальные директории вспомогательные, создавались по необходимости

## Планы по улучшению

- Запись токена в httpOnly куку
