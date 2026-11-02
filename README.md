<div align="center">

# Ouda · عُدّة

**Every open-source tool a small business needs, on one server, in one click.**
AI customer service, a WhatsApp store, bookings, social media, loyalty cards, invoices, a tutor manager and a directory website. Arabic and English. No monthly fees.

[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https://raw.githubusercontent.com/mashraf1997/ouda/main/docker-compose.yml&REFERRALCODE=YOUR_REFERRAL_CODE)

</div>

---

## The tools

| | Tool | What it does | Address |
|---|---|---|---|
| 🤖 | [**Wakeel**](https://github.com/mashraf1997/wakeel) | AI customer service on WhatsApp, Instagram, Messenger, Telegram and your website | `chat.` / `:8081` |
| 🛒 | [**Dukkan**](https://github.com/mashraf1997/dukkan) | WhatsApp ordering store and QR menu | `shop.` / `:8082` |
| 📅 | [**Mawid**](https://github.com/mashraf1997/mawid) | Your own booking page | `book.` / `:8083` |
| 📣 | [**Nashr**](https://github.com/mashraf1997/nashr) | AI-written social media posts, published on schedule | `posts.` / `:8084` |
| ☕ | [**Khatm**](https://github.com/mashraf1997/khatm) | Digital loyalty stamp card | `stamps.` / `:8085` |
| 🧾 | [**Fatoora**](https://github.com/mashraf1997/fatoora) | Invoices and quotes in Arabic and English | `invoices.` / `:8086` |
| 🎓 | [**Moallem**](https://github.com/mashraf1997/moallem) | Attendance, fees and results for private tutors | `classes.` / `:8087` |
| 📍 | [**Daleel**](https://github.com/mashraf1997/daleel) | Directory website for places and services | `guide.` / `:8088` |

They work together: Wakeel books into **Mawid** and takes orders from the **Dukkan** catalog, and every order can create an invoice in **Fatoora** and a stamp in **Khatm** (paste their order links into Wakeel's notification webhooks).

## Packs

Not every business needs everything. Each pack installs only what it needs:

| Pack | Tools | Deploy |
|---|---|---|
| **Everything** | wakeel, dukkan, mawid, nashr, khatm, fatoora, moallem, daleel | [![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https://raw.githubusercontent.com/mashraf1997/ouda/main/docker-compose.yml&REFERRALCODE=YOUR_REFERRAL_CODE) |
| **Clinic and salon pack** | mawid, wakeel, fatoora, nashr | [![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https://raw.githubusercontent.com/mashraf1997/ouda/main/packs/clinic.yml&REFERRALCODE=YOUR_REFERRAL_CODE) |
| **Restaurant and café pack** | dukkan, wakeel, khatm, nashr | [![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https://raw.githubusercontent.com/mashraf1997/ouda/main/packs/cafe.yml&REFERRALCODE=YOUR_REFERRAL_CODE) |
| **Teacher pack** | moallem, fatoora, nashr | [![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https://raw.githubusercontent.com/mashraf1997/ouda/main/packs/tutor.yml&REFERRALCODE=YOUR_REFERRAL_CODE) |
| **Agency pack** | wakeel, nashr, fatoora, daleel | [![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](https://www.hostinger.com/docker-hosting?compose_url=https://raw.githubusercontent.com/mashraf1997/ouda/main/packs/agency.yml&REFERRALCODE=YOUR_REFERRAL_CODE) |

## After deploying

**Without a domain:** open `http://YOUR-SERVER-IP`. A start page links to every tool, each on its own port (for example Wakeel on `:8081`). Open each one and create its password.

**With a domain (recommended):**
1. Point `example.com` and `*.example.com` (a wildcard A record) at your server.
2. Set `DOMAIN=example.com` and `ACME_EMAIL=you@example.com` in the container settings, then restart.
3. Every tool gets its own address with free automatic HTTPS: `https://chat.example.com`, `https://shop.example.com`, and so on. WhatsApp, Instagram and Messenger need this HTTPS address for their webhooks.

| Variable | Purpose |
|---|---|
| `DOMAIN` | Your domain. Turns on HTTPS subdomains. |
| `ACME_EMAIL` | Email for the free certificates (Let's Encrypt) |
| `SETUP_TOKEN`, `SETUP_CODE` | Recommended: a code required to create each tool's first admin account |
| `ANTHROPIC_API_KEY` | Claude key for Wakeel and Nashr (each can also use Ollama or any OpenAI-compatible model) |
| `DEMO_MODE` | `true` turns every tool into a public demo that resets itself |

**Server size:** each tool uses about 60–100 MB of memory. The full bundle runs comfortably on a VPS with 2 GB RAM; packs need less.

## Updating

The bundle uses each tool's `latest` image. In Hostinger's Docker Manager press **Update**, or run `docker compose pull && docker compose up -d`. Your data lives in Docker volumes and is kept.

## For maintainers

The compose files are generated from `scripts/apps.json`:

```bash
node scripts/generate.mjs
```

## License

MIT

---

<div dir="rtl">

## بالعربي

**عُدّة** بتركّب كل الأدوات المفتوحة المصدر اللي البيزنس الصغير محتاجها على سيرفر واحد وبضغطة واحدة:

- 🤖 **wakeel:** موظف ذكاء اصطناعي بيرد على واتساب وإنستجرام وماسنجر وتليجرام وموقعك
- 🛒 **dukkan:** متجر طلبات على واتساب ومنيو QR
- 📅 **mawid:** صفحة حجز مواعيد
- 📣 **nashr:** بوستات سوشيال بالذكاء الاصطناعي ونشر تلقائي
- ☕ **khatm:** كارت ولاء ديجيتال بالأختام
- 🧾 **fatoora:** فواتير وعروض أسعار عربي وإنجليزي
- 🎓 **moallem:** حضور ومصاريف ونتايج للمدرسين الخصوصيين
- 📍 **daleel:** موقع دليل للأماكن والخدمات

وفيه **باقات** جاهزة: باقة العيادة والصالون، باقة المطعم والكافيه، باقة المدرس، باقة الوكالة.

**بعد التركيب:** افتح `http://IP-السيرفر` هتلاقي صفحة فيها لينك كل أداة. ولو عندك دومين، حط `DOMAIN` وكل أداة هتشتغل على subdomain بشهادة HTTPS مجانية.

</div>
