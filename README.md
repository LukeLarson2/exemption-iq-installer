# Exemption IQ Installer

> 🧩 Securely install and scaffold [Exemption IQ](https://www.taxcsa.com) for simplified exemption certificate management with Avalara Avatax.

[![npm version](https://img.shields.io/npm/v/exemption-iq-installer.svg?style=flat-square)](https://www.npmjs.org/package/exemption-iq-installer)
[![install size](https://img.shields.io/bundlephobia/min/exemption-iq-installer?style=flat-square)](https://bundlephobia.com/result?p=exemption-iq-installer)
[![license](https://img.shields.io/npm/l/exemption-iq-installer?style=flat-square)](https://github.com/taxcsa/exemption-iq-installer/blob/main/LICENSE)

## 🚀 Quick Start

```bash
npx exemption-iq-installer install
```

## 🔍 What is Exemption IQ?

Exemption IQ is a Tax CSA plugin that simplifies exemption certificate management by providing:

- **GenCert** automation integration
- **Avalara's CertCapture** connection
- **Client- and server-side components** for exemption workflows
- **Framework compatibility** with Next.js, Remix, Express, Astro, and more

## ✨ Features

- 🔐 **Secure authentication** with your Tax CSA credentials
- 📥 **Signed download** of the latest private `exemption-iq` package
- 📦 **Vendor installation** (no npm registry needed)
- 🧠 **Framework auto-detection** for Next.js, Remix, Astro, Express
- 🧰 **Automatic scaffolding** of API routes
- 🛠️ **package.json patching** with vendor dependencies
- 🔒 **Version control setup** (adds `vendor/` to `.gitignore`)
- 📚 **Component library** installation and configuration

## 📋 Installation Process

When you run the installer, you'll be prompted for:

- **Username** – your Tax CSA portal login
- **Password** – securely used to obtain a signed package link

The installer will:

1. Authenticate and fetch the latest version of `exemption-iq`
2. Download and extract it into `vendor/exemption-iq`
3. Patch your `package.json` to include:
   ```json
   "exemption-iq": "file:vendor/exemption-iq"
   ```
4. Add `vendor/` to `.gitignore`
5. Scaffold framework-specific API routes
6. Run `npm install` to complete setup

## 📺 Example Installation

```bash
$ npx exemption-iq-installer install

📦 Welcome to the Exemption IQ installer
✔ Username: …
✔ Password: …
✅ Authenticated
📦 Downloading exemption-iq@x.y.z
📦 Extracting package...
🚀 Running project scaffolding...
📦 Installing dependencies...
🎉 Done!
```

## 🧹 Uninstallation

To completely remove Exemption IQ:

```bash
node vendor/exemption-iq/dist/bin/init.js --uninstall
```

This will:
- Remove `vendor/exemption-iq`
- Unpatch `package.json`
- Delete scaffolded API routes

## 🧠 Framework Support

| Framework | Scaffolded Path |
|-----------|-----------------|
| Next.js   | `app/api/exemption-iq/` or `pages/api/` |
| Remix     | `app/routes/api/exemption-iq/` |
| Astro     | `src/pages/api/exemption-iq/` |
| Express   | `src/api/exemption-iq/` |
| Generic   | `api/exemption-iq/` |

## 👥 Who Should Use This?

- Engineers integrating Avalara exemption workflows
- Teams using GenCert or CertCapture
- Projects needing easy, secure plug-in of exemption logic and API

## 🛡️ Powered by Tax CSA

Tax CSA provides high-compliance sales tax automation services. Exemption IQ is one of our developer-first tools to simplify Avalara integrations.

➡️ Visit us at [https://www.taxcsa.com](https://www.taxcsa.com)

## 📄 License

MIT