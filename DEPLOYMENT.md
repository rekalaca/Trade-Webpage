# Vercel Deployment & Git Workflow — Demo-Trade Webpage

Ez a dokumentum részletesen rögzíti a weboldal verziókezelési, élesítési és automatizálási folyamatát.

---

## 🚀 1. Működési Folyamat (Automatikus Élesítés Dual-Push-sal)

A rendszer mostantól **teljesen automatikusan** működik:

- **Biztonsági mentés (Saját Git):** `https://github.com/rekalaca/Trade-Webpage.git`
- **Céges tároló (DemoTrade Git):** `https://github.com/demotrade/demo-trade-webpage.git`
- **Élesítés (Vercel):** A weboldal a Demo Trade céges Vercel fiókjában automatikusan buildelődik a `demotrade/demo-trade-webpage` `main` ágának változásakor (`demotradekft.hu`).

---

### A napi munka menete (Szuper egyszerű):

Csak a szokásos git parancsokat kell használnod:

```bash
git add .
git commit -m "Frissítések leírása"
git push
```

#### Mi történik a háttérben egyetlen `git push` hatására?
1. Feltöltődik a kód a **saját GitHubodra** (`rekalaca/Trade-Webpage`).
2. Feltöltődik a kód a **céges GitHubra** (`demotrade/demo-trade-webpage`).
3. A Vercel **másodperceken belül automatikusan felépíti és élesíti** a `demotradekft.hu` oldalt.

---

## ⚡ 2. Vercel Összekapcsolás Lépései (Egyszeri beállítás)

Ha a Vercelen még nincs összekötve a GitHub tároló:

1. Nyisd meg a [vercel.com](https://vercel.com) felületet a Demo Trade céges fiókkal.
2. Kattints a **demo-trade-webpage** projektre.
3. Menj a felső menüben a **Settings** ➔ **Git** menüpontba.
4. A **Connected Git Repository** résznél válaszd ki a **`demotrade/demo-trade-webpage`** tárolót (Branch: `main`).
5. Kész! Innentől kezdve minden push automatikusan élesíti a weboldalt.

---

## 🌐 3. DNS & Domain Beállítások (demotradekft.hu)

A tárhelyszolgáltatónál (Rackhost / Domain regisztrátor) az alábbi DNS rekordok mutatnak a Vercel szervereire:
- **A rekord (fő domain: `@`):** `76.76.21.21` (vagy `216.198.79.1`)
- **CNAME (www aldomain: `www`):** `cname.vercel-dns.com` (vagy `f1de239947a141df.vercel-dns-017.com`)
