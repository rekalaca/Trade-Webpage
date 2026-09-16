# Vercel Deployment & Git Workflow — Demo-Trade Webpage

Ez a dokumentum részletesen rögzíti a weboldal verziókezelési, élesítési és automatizálási folyamatát.

---

## 📌 1. Jelenlegi Felállás és Működés (Manuális Élesítés)

- **Biztonsági mentés (Git):** A kód a saját GitHub fiókodba (`https://github.com/rekalaca/Trade-Webpage.git`) töltődik fel a `main` ágra.
- **Élesítés (Vercel):** A weboldal a Demo Trade céges Vercel fiókjában ("Team" account) fut, a `demo-trade-webpage` projekt alatt (`demotradekft.hu`).
- **Miért kell most még manuálisan tolni?** A céges Vercel fiók közvetlenül nem éri el a személyes (`rekalaca`) GitHub tárolót. Ezért amíg a céges GitHub hozzáférés nincs meg, a Vercel CLI-vel toljuk fel az éles verziót.

### A napi munka menete most:

#### 1. Lépés: Mentés a GitHubra
```bash
git add .
git commit -m "Frissítések leírása"
git push
```

#### 2. Lépés: Élesítés a Vercelen (CLI)
```bash
# 1. Ha a bejelentkezés lejárt volna:
npx vercel login

# 2. Élesítés a demotradekft.hu-ra:
npx vercel --prod
```

---

## ⚡ 2. Jövőbeli Automatikus Élesítés Beállítása (Amikor megvan a hozzáférés)

Amikor megkapod a hozzáférést a `demotrade` GitHub fiókhoz (ahogyan a belső `Trade` CRM rendszernél is működik), az alábbi 3 lépéssel elérhető a 100%-ban automatikus élesítés:

### 1. Lépés: Új tároló létrehozása a céges GitHubon
1. Lépj be a **demotrade** GitHub fiókba.
2. Hozz létre egy új tárolót: `Trade-Webpage` (vagy `demo-trade-webpage`).
3. Ha a tároló privát: a *Settings -> Collaborators* menüpontban add hozzá a `rekalaca` felhasználót írási (Write/Admin) jogosultsággal.

### 2. Lépés: Összekapcsolás a Vercel vezérlőpulton
1. Nyisd meg a [vercel.com](https://vercel.com) oldalt a Demo Trade céges fiókkal.
2. Nyisd meg a **demo-trade-webpage** projektet.
3. Menj a **Settings** ➔ **Git** menüpontba.
4. Kattints a **Connect Git Repository** gombra, és válaszd ki a friss `demotrade/Trade-Webpage` tárolót.

### 3. Lépés: Kettős Git Push beállítása a helyi gépen
A terminálban a projekt mappájában (`Trade-Webpage`) futtasd az alábbi parancsokat, hogy a `git push` egyszerre mindkét helyre töltsön:

```bash
# Remote hozzáadása és kettős push URL beállítása az 'origin' alá:
git remote set-url --add --push origin https://github.com/rekalaca/Trade-Webpage.git
git remote set-url --add --push origin https://github.com/demotrade/Trade-Webpage.git
```

#### Eredmény:
Ezután egyetlen sima `git push` parancs lefutásakor:
1. Feltöltődik a kód a **saját GitHubodra** (`rekalaca/Trade-Webpage`) biztonsági mentésként.
2. Feltöltődik a kód a **céges GitHubra** (`demotrade/Trade-Webpage`).
3. A Vercel **10 másodpercen belül teljesen automatikusan legenerálja és élesíti** a `demotradekft.hu` oldalt, külön Vercel parancs nélkül!

---

## 🌐 3. DNS & Domain Beállítások (demotradekft.hu)

A tárhelyszolgáltatónál (Rackhost / Domain regisztrátor) az alábbi DNS rekordok mutatnak a Vercel szervereire:
- **A rekord (fő domain: `@`):** `76.76.21.21` (vagy `216.198.79.1`)
- **CNAME (www aldomain: `www`):** `cname.vercel-dns.com` (vagy `f1de239947a141df.vercel-dns-017.com`)
