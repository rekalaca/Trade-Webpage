# Vercel Deployment & Git Workflow

Ez a dokumentum rögzíti, hogyan van beállítva a projekt verziókezelése és élesítése, hogy a jövőben (akár hónapok múlva is) egyértelmű legyen a folyamat.

## 📌 A jelenlegi felállás (2026. szeptember)
- **Biztonsági mentés (Git):** A kód a te saját GitHub fiókodba (`rekalaca/Trade-Webpage`) töltődik fel. Ez garantálja, hogy a kódod felett 100%-os kontrollod van.
- **Élesítés (Vercel):** A weboldal a Demo Trade céges Vercel fiókjában ("Team" account) él, a `demo-trade-webpage` projekt alatt.
- **Az ok:** Mivel a Vercel fiók egy céges fiók, biztonsági okokból nem engedi, hogy közvetlenül figyelje a te személyes (`rekalaca`) GitHub fiókodat. Emiatt az automatikus frissítés (Git Push -> Vercel) nem működik.

---

## 🚀 A fejlesztés és élesítés folyamata (Két lépés)

Mivel a két rendszert (Git és Vercel) szétválasztottuk, a munka befejeztével két külön lépést kell végrehajtanod:

### 1. Lépés: Biztonsági mentés (Git)
Mentsd el a munkádat a szokásos módon a GitHubra. (Vagy a VS Code Git felületén, vagy terminálból):
```bash
git add .
git commit -m "Módosítások leírása"
git push
```
*(Ezzel a kód felkerül a `rekalaca` GitHubra, így megvan a mentésed).*

### 2. Lépés: Élesítés a weboldalon (Vercel CLI)
Hogy a változások kimenjenek a `demotradekft.hu` weboldalra, egyenesen a gépedről kell fellőnöd a kódot a Vercelre az alábbi paranccsal a terminálban:
```bash
npx vercel --prod
```
Ezután a Vercel másodpercek alatt legenerálja (Building...) és publikálja az oldalt. 
*(Ha esetleg kijelentkeztél volna a Vercelből, az `npx vercel login` paranccsal tudsz újra belépni).*

---

## 🌐 DNS Beállítások (demotradekft.hu)
Ha bármikor a jövőben újra be kellene állítani a domaint a tárhelyszolgáltatónál, a Vercelhez az alábbi DNS rekordok szükségesek:
- **A rekord (fő domain: `@`):** `76.76.21.21` (vagy az egyedi `216.198.79.1`)
- **CNAME (www aldomain: `www`):** `cname.vercel-dns.com` (vagy az egyedi `f1de239947a141df.vercel-dns-017.com`)
