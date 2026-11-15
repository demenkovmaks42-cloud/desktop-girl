# 🌸 Desktop girl

Маленькая пиксельная аниме-тян, которая живёт на твоём рабочем столе. Она гуляет по нижнему краю экрана (над панелью задач), следит глазами за курсором и иногда повторяет то, что делал ты.

Окно прозрачное, всегда поверх остальных и пропускает клики сквозь себя, так что работе она не мешает.

## Что она умеет

| Ты делаешь | Она потом делает |
|---|---|
| Кликаешь мышью (в любом окне) | Прыгает |
| Быстро печатаешь | Садится «печатать» |
| Оставляешь курсор на месте на пару секунд | Подходит к этому месту |

Ещё она сама ходит, моргает, машет рукой, танцует и пускает сердечки.

**Выход:** `Ctrl+Shift+Q` (на macOS `Cmd+Shift+Q`).

Клики и печать отслеживает необязательный пакет `uiohook-napi`. Если он не установился, программа всё равно работает, просто без этих двух реакций.

---

## Windows

Самый простой способ: скачай готовый `.exe` из раздела **Releases** и запусти.

Запуск из исходников описан ниже в разделе «Из исходников».

---

## Linux

### 1. Системные зависимости

**Debian / Ubuntu / Mint**
```bash
sudo apt update
sudo apt install -y curl build-essential libgtk-3-0 libnss3 libxss1 libxtst6 libx11-xcb1 libxkbcommon-x11-0
# звук для Electron: libasound2 (на Ubuntu 24.04 и новее пакет называется libasound2t64)
sudo apt install -y libasound2 || sudo apt install -y libasound2t64
```

**Fedora**
```bash
sudo dnf install -y curl gcc-c++ make gtk3 nss libXScrnSaver libXtst alsa-lib
```

**Arch / Manjaro**
```bash
sudo pacman -S --needed curl base-devel gtk3 nss libxss libxtst alsa-lib
```

### 2. Node.js (версия LTS)

Пакет `nodejs` из репозиториев дистрибутива часто слишком старый. Надёжнее поставить через [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# перезапусти терминал, затем:
nvm install --lts
node -v && npm -v
```

### 3. Установка Desktop girl

Скачай архив `desktop-girl.tar.gz` (или `.zip`) со страницы Releases и распакуй:

```bash
tar -xzf desktop-girl.tar.gz
cd desktop-girl
npm install
```

Если `npm install` предупредил про `install-scripts`, а при запуске Electron пожаловался, что установился неправильно, докачай его вручную:

```bash
node node_modules/electron/install.js
```

### 4. Запуск

```bash
bash run-linux.sh
```

или то же самое через npm (если хочешь запускать как `./run-linux.sh`, сначала выполни `chmod +x run-linux.sh`):

```bash
npm run start:linux
```

Скрипт при первом запуске сам выполнит `npm install`, если зависимости ещё не стоят. Флаги `--no-sandbox` и `--ozone-platform=x11` нужны, чтобы Electron стартовал без настройки `chrome-sandbox` и работал через X11.

### Важно про Linux

- **Нужен композитор** (почти во всех современных окружениях он включён), иначе фон будет не прозрачным, а чёрным.
- **X11 или XWayland.** Под чистым Wayland поверх-всех-окон, прозрачность и слежение за глобальными кликами работают плохо или не работают. Скрипт запускает приложение через X11 (XWayland); если что-то глючит, попробуй войти в сеанс «GNOME on Xorg» / «Plasma (X11)».
- **Отслеживание кликов и печати** (`uiohook-napi`) работает только под X11. Без него девочка просто гуляет и следит за курсором.
- Приложение занимает рабочую область основного монитора.
- Работа на Linux проверена не на всех окружениях. Если что-то не так, открой Issue и приложи вывод терминала.

---

## Из исходников (Windows / macOS / Linux)

Нужен [Node.js](https://nodejs.org) LTS (22 или 24).

```bash
git clone https://github.com/demenkovmaks42-cloud/desktop-girl
cd desktop-girl
npm install
npm start
```

Если Electron не скачался (новые версии npm не запускают скрипты установки сами):

```bash
node node_modules/electron/install.js
```

На macOS отслеживание кликов и печати требует разрешения «Универсальный доступ» в настройках системы.

## Структура проекта

| Файл | Назначение |
|---|---|
| `main.js` | Прозрачное окно Electron, опрос курсора, глобальные клики и клавиши |
| `index.html` | Пиксельная девочка: рисование, ходьба, действия, повторение |
| `run-linux.sh` | Запуск на Linux |

## Лицензия

[MIT](LICENSE)
