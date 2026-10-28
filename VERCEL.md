# Настройка в Vercel за сайта и Sanity CMS

Този файл описва какво да се добави във Vercel, за да работят публичният сайт и Studio на `/studio/`. Sanity е свързан само с портфолиото. Останалите страници са статични.

Нужен е акаунт в [Vercel](https://vercel.com/) и свързан GitHub/GitLab/Bitbucket repo. Sanity проектът вече съществува (Project ID: `jztklnus`, dataset: `production`).

---

## 1. Свържете проекта с Vercel

1. Влезте в [Vercel Dashboard](https://vercel.com/dashboard).
2. **Add New… → Project**.
3. Импортирайте `planex-interior` (или текущото име на repo-то).
4. Оставете Framework Preset на **Next.js**.
5. Root Directory: коренът на проекта (не променяйте, освен ако сайтът не е в подпапка).
6. **още не натискайте Deploy.** Първо добавете environment variables (стъпка 3). Ако вече сте деплойнали веднъж, добавете променливите и после направете Redeploy.

---

## 2. Node версия

Проектът изисква Node `>= 22.13.0`.

1. Vercel → Project → **Settings → General → Node.js Version**.
2. Изберете **22.x**.
3. Запишете.

Ако build-ът падне с грешка за Node, почти винаги причината е по-стара версия.

---

## 3. Environment variables във Vercel

Vercel → Project → **Settings → Environment Variables**.

Добавете всяка променлива за **Production**, **Preview** и **Development**. След промяна на `NEXT_PUBLIC_*` трябва **нов deploy**, защото тези стойности се вграждат в клиентския bundle.

| Име | Стойност | Задължителна | Какво прави |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `jztklnus` | Да | Връзва Studio и `/portfolio/` към Sanity проекта |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Да | Кой dataset да се чете и редактира |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-10-06` | Да | Фиксирана GROQ API дата. Не използвайте `v1` |
| `SANITY_REVALIDATE_SECRET` | дълъг случаен низ | Препоръчителна | Секрет за webhook, за да се обновява `/portfolio/` веднага след Publish |
| `SMTP_HOST` | хост на пощенския сървър | Да, за формата | SMTP сървър за запитванията от началото |
| `SMTP_PORT` | `587` или `465` | Да, за формата | Порт. `465` ползва implicit TLS |
| `SMTP_SECURE` | `true` само за порт 465 | Не | `true` включва implicit TLS. Празно при `587` |
| `SMTP_USER` | SMTP потребител | Ако сървърът иска login | Потребител за nodemailer |
| `SMTP_PASSWORD` | SMTP парола | Ако сървърът иска login | Парола. Не я комитвайте |
| `SMTP_FROM` | `Planex Interior <interior@planexinvest.bg>` | Да, за формата | Адресът, от който тръгва писмото |
| `SMTP_TO` | `interior@planexinvest.bg` | Да, за формата | Получател. Формата не може да го подмени |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | site key от Cloudflare | Да, за формата | Публичен ключ за виджета. След промяна е нужен нов deploy |
| `TURNSTILE_SECRET_KEY` | secret key от Cloudflare | Да, за формата | Сървърен ключ за проверка на Turnstile. Не е публичен |

Как да въведете една променлива:

1. **Key** — точното име от таблицата.
2. **Value** — стойността, без кавички и без интервали в края.
3. Маркирайте **Production**, **Preview** и **Development**.
4. **Save**.
5. Повторете за останалите ключове.

### Секрет за webhook

`SANITY_REVALIDATE_SECRET` не е публичен. Генерирайте нов низ (минимум ~32 символа) и го сложете **само** във Vercel и после в Sanity webhook-а (стъпка 6). Не го комитвайте в git.

Без този секрет сайтът пак работи: `/portfolio/` се опреснява поне веднъж в минута. С него новите проекти излизат веднага след Publish.

Не е нужен Sanity write token. Редакторите влизат в `/studio/` със Sanity акаунт. Сайтът чете само публикувани документи.

### Форма за запитване

Началната форма праща писмо през SMTP и пуска Cloudflare Turnstile преди изпращане. Без SMTP и Turnstile променливите формата показва, че временно не приема запитвания.

В Cloudflare → Turnstile създайте виджет и добавете `localhost` и продукционния домейн като hostnames. Site key е публичен (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`). Secret key остава само в env. След промяна на site key направете нов deploy.

---

## 4. Deploy

1. **Deployments → Deploy** или push към `main`.
2. Изчакайте build-ът да мине на зелено.
3. Отворете продукционния URL.
4. Проверете:
   - началото се зарежда;
   - `/portfolio/` показва проекти;
   - `/studio/` отваря Sanity Studio (логин екран или вече логнат редактор).

Ако `/studio/` казва, че Sanity не е свързано, `NEXT_PUBLIC_*` липсват или deploy-ът е направен преди да ги запишете. Добавете ги и направете **Redeploy** на последния deployment с **Use existing Build Cache** изключено.

---

## 5. CORS в Sanity (задължително за Studio на Vercel)

Това не се слага във Vercel, но без него логинът в `/studio/` на live домейна ще спре.

1. Отворете [Sanity Manage](https://www.sanity.io/manage) → проект `jztklnus`.
2. **API → CORS origins**.
3. Добавете всеки origin с **Allow credentials** включено:

| Origin | Кога |
| --- | --- |
| `http://localhost:3000` | локална разработка |
| `https://ВАШИЯТ-ПРОЕКТ.vercel.app` | Vercel домейн по подразбиране |
| `https://ВАШИЯТ-ПРОДУКЦИОНЕН-ДОМЕЙН` | ако има custom domain |

Няма wildcard за всички preview URL-и (`*.vercel.app`). Ако Studio не се логва на конкретен preview, добавете точния preview origin.

Studio е на същия домейн като сайта: `https://домейн/studio/`. Origin-ът е схемата + хостът, **без** `/studio/`.

---

## 6. Webhook за моментално обновяване на портфолиото (препоръчително)

1. Вземете същата стойност като `SANITY_REVALIDATE_SECRET` от Vercel.
2. Sanity Manage → **API → Webhooks → Create webhook**.
3. Попълнете:

| Поле | Стойност |
| --- | --- |
| Name | `Portfolio revalidate` |
| URL | `https://ВАШИЯТ-ДОМЕЙН/api/revalidate` |
| Dataset | `production` |
| HTTP method | `POST` |
| Secret | същият низ като `SANITY_REVALIDATE_SECRET` |
| Trigger on | Create, Update, Delete |
| Filter | `_type == "portfolioProject"` |

4. Запишете webhook-а.
5. В Studio публикувайте тестов проект и проверете, че се появява на `/portfolio/` без да чакате минута.

URL-ът трябва да е продукционният домейн, не `localhost`.

---

## 7. Custom domain (по избор)

1. Vercel → Project → **Settings → Domains**.
2. Добавете домейна и следвайте DNS инструкциите.
3. След като домейнът е Active, добавете го като CORS origin в Sanity (стъпка 5).
4. Ако има webhook, обновете URL-а към новия домейн (стъпка 6).
5. Redeploy не е задължителен само заради домейна, но CORS и webhook трябва да сочат към него.

---

## 8. Редактори за CMS

1. Sanity Manage → **Project members**.
2. Поканете екипа с роля, която може да редактира dataset `production` (обикновено Editor).
3. Те отварят `https://ВАШИЯТ-ДОМЕЙН/studio/`, влизат със Sanity акаунт и публикуват проекти.

Няма отделен CMS логин във Vercel.

---

## 9. Бърза проверка след setup

- [ ] Node 22.x в Vercel
- [ ] Четирите env променливи за Production, Preview и Development
- [ ] Успешен deploy
- [ ] `/` се отваря
- [ ] `/portfolio/` показва проекти
- [ ] `/studio/` се отваря и позволява логин
- [ ] CORS origin за продукционния домейн с Allow credentials
- [ ] Webhook към `/api/revalidate` (ако ползвате моментално обновяване)
- [ ] След Publish в Studio проектът излиза в `/portfolio/`

---

## Чести проблеми

**`/studio/` казва, че не е свързано.** Липсват `NEXT_PUBLIC_SANITY_PROJECT_ID` или `NEXT_PUBLIC_SANITY_DATASET`, или не е направен Redeploy след добавянето им.

**Studio се зарежда, но логинът пада / бял екран.** Липсва CORS origin за точния `https://` домейн, или Allow credentials не е включено.

**Нов проект не се вижда на сайта.** Без webhook изчакайте до 60 секунди и презаредете. С webhook проверете URL-а, секрета и че филтърът е `_type == "portfolioProject"`.

**Build fail заради Node.** Сложете Node.js Version 22.x.

**Снимки от Sanity не се зареждат.** Не се настройва във Vercel. Next.js вече допуска `cdn.sanity.io`. Проверете дали документът е Published, не само Draft.
