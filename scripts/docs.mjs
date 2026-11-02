// Generates README.md and docs/index.html (the GitHub Pages landing page) from scripts/apps.json.
// Run: node scripts/docs.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'scripts/apps.json'), 'utf8'));
const byId = Object.fromEntries(cfg.apps.map((a) => [a.id, a]));
const REF = 'YOUR_REFERRAL_CODE';
const deploy = (rawPath) => `https://www.hostinger.com/docker-hosting?compose_url=https://raw.githubusercontent.com/mashraf1997/${rawPath}&REFERRALCODE=${REF}`;
const badge = (rawPath) => `[![Deploy on Hostinger](https://assets.hostinger.com/vps/deploy.svg)](${deploy(rawPath)})`;
const name = (id) => id[0].toUpperCase() + id.slice(1);
const INSTALL = 'https://github.com/mashraf1997/ouda/issues/new?template=install.yml';
const packs = Object.entries(cfg.packs).filter(([, p]) => !p.demo);
const [demoFile, demoPack] = Object.entries(cfg.packs).find(([, p]) => p.demo);
const n = cfg.apps.length;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// ---------- README ----------
const readme = `<div align="center">

# Ouda · عُدّة

**Every open-source tool a small business needs, on one server, in one click.**
${n} tools: AI customer service, WhatsApp campaigns, a WhatsApp store, inventory and point of sale, bookings, a virtual queue, Google reviews, social media, loyalty cards, invoices, a cash book, repair jobs, patient records, rentals, staff attendance and payroll, a tutor manager, course selling and a directory website. Arabic and English. No monthly fees.

${badge('ouda/main/docker-compose.yml')}

**[Try the live demo](#live-demo)** · **[Install it for me](#install-it-for-me--ركّبهالي)** · [العربية](#بالعربي)

</div>

---

## The tools

| | Tool | What it does | Address |
|---|---|---|---|
${cfg.apps.map((a) => `| ${a.icon} | [**${name(a.id)}**](https://github.com/mashraf1997/${a.id}) | ${a.en} | \`${a.sub}.\` / \`:${a.port}\` |`).join('\n')}

They work together: Wakeel books into **Mawid** and takes orders from the **Dukkan** catalog, and every order or paid job can create an invoice in **Fatoora**, a stamp in **Khatm**, money-in in **Raseed** and a stock movement in **Makhzan** (paste their order links into the webhook settings).

## Packs for each kind of business

Not every business needs everything. Each pack installs only what it needs:

| Pack | Tools | Deploy |
|---|---|---|
${packs.map(([file, p]) => `| **${p.en}** | ${p.apps.join(', ')} | ${badge('ouda/main/' + file)} |`).join('\n')}

## Live demo

\`${demoFile}\` runs every tool with sample data: a café, a clinic, a repair shop, a building of flats and so on. The password is shown on each sign-in screen, nothing is sent to real customers, and everything resets every hour. Use it to show a customer the tools before they buy, or to run a public demo site.

${badge('ouda/main/' + demoFile)}

\`DEMO_LANG=en\` switches the sample data to English. Do not use the demo pack for a real business.

## Install it for me · ركّبهالي

Don't want to touch a server? [**Open an install request**](${INSTALL}) and we will set it up for you:

| | What you get |
|---|---|
| **Install** | A Hostinger VPS with the pack you need, your domain with HTTPS on every tool, and backups |
| **Install and set up** | The above, plus your products, services, prices and staff entered, templates chosen for your business, and WhatsApp and payments connected |
| **Install, set up and train** | The above, plus a training call for you and your team and one month of support |

Prices depend on the tools and the amount of data. Don't put passwords or customer data in the request: it is public, and we will contact you.

## After deploying

**Without a domain:** open \`http://YOUR-SERVER-IP\`. A start page links to every tool, each on its own port (for example Wakeel on \`:8081\`). Open each one and create its password.

**With a domain (recommended):**
1. Point \`example.com\` and \`*.example.com\` (a wildcard A record) at your server.
2. Set \`DOMAIN=example.com\` and \`ACME_EMAIL=you@example.com\` in the container settings, then restart.
3. Every tool gets its own address with free automatic HTTPS: \`https://chat.example.com\`, \`https://shop.example.com\`, and so on. WhatsApp, Instagram and Messenger need this HTTPS address for their webhooks.

| Variable | Purpose |
|---|---|
| \`DOMAIN\` | Your domain. Turns on HTTPS subdomains. |
| \`ACME_EMAIL\` | Email for the free certificates (Let's Encrypt) |
| \`SETUP_TOKEN\`, \`SETUP_CODE\` | Recommended: a code required to create each tool's first admin account |
| \`ANTHROPIC_API_KEY\` | Claude key for Wakeel and Nashr (each can also use Ollama or any OpenAI-compatible model) |
| \`DEMO_MODE\` | \`true\` turns every tool into a public demo that resets itself |

**Server size:** each tool uses about 60–100 MB of memory. A pack of five to seven tools runs on a VPS with 2 GB RAM; the full bundle of ${n} is comfortable with 4–8 GB.

## Updating

The bundle uses each tool's \`latest\` image. In Hostinger's Docker Manager press **Update**, or run \`docker compose pull && docker compose up -d\`. Your data lives in Docker volumes and is kept.

## For maintainers

Everything is generated from \`scripts/apps.json\`:

\`\`\`bash
node scripts/generate.mjs   # compose files
node scripts/docs.mjs       # README.md and docs/index.html
\`\`\`

## License

MIT

---

<div dir="rtl">

## بالعربي

**عُدّة** بتركّب كل الأدوات المفتوحة المصدر اللي البيزنس الصغير محتاجها على سيرفر واحد وبضغطة واحدة:

${cfg.apps.map((a) => `- ${a.icon} **${a.id}:** ${a.ar}`).join('\n')}

**باقات جاهزة لكل نوع بيزنس:** ${packs.map(([, p]) => p.ar).join('، ')}.

**ديمو لايف:** باقة \`${demoFile}\` بتشغّل كل الأدوات ببيانات تجريبية بترجع زي ما كانت كل ساعة، عشان توري العميل قبل ما يشتري.

**ركّبهالي:** مش عايز تتعامل مع سيرفرات؟ [ابعت طلب تركيب](${INSTALL}) وإحنا نركّب ونجهّز ونربط واتساب والدفع وندرّبك.

**بعد التركيب:** افتح \`http://IP-السيرفر\` هتلاقي صفحة فيها لينك كل أداة. ولو عندك دومين، حط \`DOMAIN\` وكل أداة هتشتغل على subdomain بشهادة HTTPS مجانية.

</div>
`;
fs.writeFileSync(path.join(root, 'README.md'), readme);

// ---------- landing page ----------
const css = fs.readFileSync(path.join(root, 'scripts/site.css'), 'utf8');
const packCard = (file, p, extra = '') => `      <a class="pack${extra}" href="${esc(deploy('ouda/main/' + file))}"><b>${p.ar}</b><span dir="ltr">${p.en}</span><small>${p.apps.map((id) => byId[id].icon).join(' ')}</small></a>`;
const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عُدّة · Ouda — أدوات مفتوحة المصدر للبيزنس الصغير</title>
<meta name="description" content="${n} open-source tools for small businesses: AI customer service, WhatsApp campaigns and store, inventory and POS, bookings, reviews, invoices, clinics, repairs, rentals and more. One-click deploy.">
<meta property="og:title" content="عُدّة · Ouda">
<meta property="og:description" content="كل أدوات البيزنس الصغير، مفتوحة المصدر وبضغطة واحدة.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;700&display=swap" rel="stylesheet">
<!-- generated by scripts/docs.mjs from scripts/apps.json -->
<style>${css}</style>
</head>
<body>
<header class="wrap">
  <h1>عُدّة: كل أدوات <em>البيزنس الصغير</em>، مفتوحة المصدر</h1>
  <p class="lead">${n} أداة: موظف ذكاء اصطناعي على واتساب، وحملات واتساب، ومتجر، ومخزن وكاشير، وحجوزات، وطابور ذكي، وتقييمات جوجل، وسوشيال ميديا، وكروت ولاء، وفواتير، ودفتر خزنة، وورش صيانة، وعيادات، وإيجارات، وحضور ومرتبات، ومدرسين وكورسات، وموقع دليل. بالعربي، على سيرفرك، من غير اشتراكات شهرية.</p>
  <p class="lead-en" dir="ltr">Open-source tools for small businesses. Arabic and English. Self-hosted. One-click deploy.</p>
  <div class="cta"><a class="btn primary" href="${esc(deploy('ouda/main/docker-compose.yml'))}">ركّب كل الأدوات بضغطة</a><a class="btn" href="#demo">جرّب الديمو</a><a class="btn" href="#install">ركّبهالي</a><a class="btn" href="https://github.com/mashraf1997/ouda">GitHub</a></div>
</header>
<main class="wrap">
  <section><h2>باقة لكل نوع بيزنس</h2><div class="packs">
${packs.map(([file, p]) => packCard(file, p)).join('\n')}
  </div></section>
  <section id="demo" class="band"><div><h2>جرّب قبل ما تركّب</h2><p>باقة الديمو بتشغّل كل الأدوات ببيانات تجريبية (كافيه، عيادة، ورشة، عمارة…)، وكلمة السر مكتوبة في صفحة الدخول، ومفيش أي رسالة بتطلع لعميل حقيقي، وكل حاجة بترجع زي ما كانت كل ساعة. اعرضها على عميلك أو اعمل بيها موقع ديمو.</p>
    <p class="en" dir="ltr">Every tool with sample data that resets every hour. Show it to a customer before they buy.</p></div>
    <a class="btn primary" href="${esc(deploy('ouda/main/' + demoFile))}">ركّب الديمو</a></section>
  <section><h2>الأدوات</h2><div class="apps">
${cfg.apps.map((a) => `      <article class="app">
        <img src="https://raw.githubusercontent.com/mashraf1997/${a.id}/main/docs/${a.shot}" alt="" loading="lazy">
        <div class="body">
          <h3><span>${a.icon}</span> ${name(a.id)}</h3>
          <p dir="rtl">${a.ar}</p>
          <p class="en" dir="ltr">${a.en}</p>
          <div class="links"><a class="deploy" href="${esc(deploy(a.id + '/main/docker-compose.yml'))}">Deploy</a><a href="https://github.com/mashraf1997/${a.id}">GitHub</a></div>
        </div>
      </article>`).join('\n')}
  </div></section>
  <section id="install"><h2>ركّبهالي</h2><p class="lead">مش عايز تتعامل مع سيرفرات؟ إحنا نركّب ونجهّز. <span dir="ltr" class="en">Don't want to touch a server? We'll do it.</span></p>
    <div class="tiers">
      <div><b>تركيب</b><p>سيرفر Hostinger بالباقة اللي محتاجها، ودومينك بـ HTTPS على كل أداة، ونسخ احتياطي.</p><span dir="ltr">Install</span></div>
      <div><b>تركيب وتجهيز</b><p>اللي فوق، ومنتجاتك وخدماتك وأسعارك وموظفينك متسجلين، وقوالب مناسبة لنوع شغلك، وربط واتساب والدفع.</p><span dir="ltr">Install and set up</span></div>
      <div><b>تركيب وتجهيز وتدريب</b><p>اللي فوق، ومكالمة تدريب ليك ولفريقك، ومتابعة شهر.</p><span dir="ltr">Install, set up and train</span></div>
    </div>
    <div class="cta"><a class="btn primary" href="${INSTALL}">ابعت طلب تركيب</a></div>
    <p class="note">السعر حسب الأدوات وحجم البيانات. متكتبش باسوردات أو بيانات عملاء في الطلب، وهنتواصل معاك.</p></section>
  <section><h2>ليه عُدّة؟</h2><div class="why">
    <div><b>من غير اشتراك شهري</b><p>بتدفع السيرفر بس، والأدوات مجانية ومفتوحة المصدر برخصة MIT.</p></div>
    <div><b>بياناتك عندك</b><p>كل حاجة على سيرفرك. مفيش طرف تالت شايف عملاءك أو طلباتك.</p></div>
    <div><b>بالعربي من الأساس</b><p>واجهات من اليمين للشمال، ولهجات عربية، وأرقام وعملات محلية.</p></div>
    <div><b>شغالين مع بعض</b><p>الطلب من وكيل أو دكان بيعمل فاتورة في فاتورة وختم في ختم ودخل في رصيد وحركة في المخزن، والحجز بيروح لموعد.</p></div>
  </div></section>
</main>
<footer class="wrap">Ouda · MIT · <a href="https://github.com/mashraf1997">github.com/mashraf1997</a></footer>
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'docs/index.html'), html);
console.log('wrote README.md and docs/index.html');
