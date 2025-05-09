# Exemption IQ Installer

> 🧩 Securely install and scaffold [Exemption IQ](https://www.taxcsa.com) for simplified exemption certificate management with Avalara Avatax.

[![npm version](https://img.shields.io/npm/v/exemption-iq-installer.svg?style=flat-square)](https://www.npmjs.org/package/exemption-iq-installer) ![Read time](https://img.shields.io/badge/read--time-3%20min-blue?style=flat-square)


## 🚀 Quick Start

```bash
npx exemption-iq-installer
```


## ⚠️ Important Note

This package is built specifically for Avalara AvaTax account holders and integrates directly with CertCapture and GenCert services.

**Not an AvaTax customer yet?** You may still be able to leverage this package for your exemption workflows. If you're interested in integrating Exemption IQ into your own platform but do not have an AvaTax account, please contact the Tax CSA team to discuss partnership opportunities or potential alternative integrations.


## 🔍 What is Exemption IQ?

Exemption IQ is a Tax CSA plugin that simplifies exemption certificate management by providing:

- **GenCert** automation integration
- **Avalara's CertCapture** connection
- **Client- and server-side components** for exemption workflows
- **Framework compatibility** with Next.js, Remix, Express, Astro, and more


<!-- ## 🔄 Compatibility

Exemption IQ integrates directly with **Avalara CertCapture/ECM**, ensuring that every time a certificate is added or updated, **AvaTax** automatically adjusts the customer's taxability profile. 

If your accounting or billing platform is connected to AvaTax, those changes flow through instantly—keeping your systems accurate and compliant with zero manual input.


### ✅ Automatic Taxability Updates With:

- **QuickBooks Online & Desktop**
- **Chargebee**
- **Magento**
- **NetSuite**
- **Xero**
- **Sage Intacct**
- **Shopify Plus**
- **Microsoft Dynamics 365**
- **Zoho Books**
- **BigCommerce**
- **SAP Business One & S/4HANA**

> ✅ All platforms listed above support AvaTax integration.

### 🛠️ Not Using AvaTax?

If you're not leveraging AvaTax in your stack, Exemption IQ provides a **callback** which can be passed. This feature returns real-time success/failure responses upon certificate updates, empowering your systems to handle taxability logic on your terms.

Whether integrated or standalone, Exemption IQ keeps your tax compliance workflows efficient and flexible. -->


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
$ npx exemption-iq-installer

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

## 🌐 Environment Variables

Set the following environment variables in your server environment:

```env
EIQ_USERNAME=your-eiq-username
EIQ_PASSWORD=your-eiq-password
AVATAX_API_BASE=https://sandbox-rest.avatax.com/api/v2  # or https://rest.avatax.com/api/v2 for production
```

✅ Use the sandbox API base during development to validate the end-to-end user experience before going live.


## 🧠 Framework Support

| Framework | Scaffolded Path |
|-----------|-----------------|
| Next.js   | `app/api/exemption-iq/` or `pages/api/` |
| Remix     | `app/routes/api/exemption-iq/` |
| Astro     | `src/pages/api/exemption-iq/` |
| Express   | `src/api/exemption-iq/` |
| Generic   | `api/exemption-iq/` |


## 🖼️ Component Previews (Next.js)

Visual examples of Exemption IQ components integrated into a Next.js framework:

🛒 ExemptionIq Button at Checkout
![ExemptionIq Button at Checkout](https://emihnyognhhrgcemahdh.supabase.co/storage/v1/object/public/eiq-package-screens//next-checkout-button.png)

🧾 Customer Has a Certificate in the State Dialog
![Customer Has a Certificate in the State Dialog](https://emihnyognhhrgcemahdh.supabase.co/storage/v1/object/public/eiq-package-screens//next-already-own-cert.png)

✅ ExemptionIq Tax Exempt on Callback
![ExemptionIq Tax Exempt on Callback](https://emihnyognhhrgcemahdh.supabase.co/storage/v1/object/public/eiq-package-screens//next-exempt.png)

📋 ExemptionIq Customer Certificate Management Table
![ExemptionIq Customer Certificate Management Table](https://emihnyognhhrgcemahdh.supabase.co/storage/v1/object/public/eiq-package-screens//next-customer-table.png)


## 🧩 Using an ExemptionIQ Component

| Component | Use |
|-----------|-----------------|
| ExemptionIqServer   | Add Certificate button in checkout for a server component |
| ExemptionIqClient     | Add Certificate button in checkout for a client component |
| ExemptionIqCustomerServer     | Customer Managment Table for a server component |
| ExemptionIqCustomerClient   | Customer Managment Table for a server component |

Example usage (Next.js Server Component):

```tsx
import { ExemptionIqServer } from 'exemption-iq';

export default function Page() {
  return (
    <ExemptionIqServer
      customerCode={customerCode}
      customerInfo={{
        name: "Company Name",
        emailAddress: "email@example.com",
        addressLine1: "123 Main St",
        phoneNumber: "555-555-5555",
        city: "Orlando",
        country: "USA",
        postalCode: "32801",
        region: "FL"
      }}
      state="Florida"
      primaryColor="#2966B1"
      manualValidation={true}
      onComplete={(status) => {
        console.log("Certificate status:", status);
        return true;
      }}
    />
  );
}
```


### 🔑 Required Fields for customerInfo

```json
{
  "name": "string",
  "emailAddress": "string",
  "addressLine1": "string",
  "phoneNumber": "string",
  "city": "string",
  "country": "string",
  "postalCode": "string",
  "region": "string" // State abbreviation (e.g., "FL")
}
```


### ⚙️ Component Prop Reference

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| customerCode | string | — | Unique customer code specific to your company |
| customerInfo | object | — | Contains customer contact and address details |
| state | string | — | Full state name (e.g., "Florida") |
| showDownload | boolean | false | Allow users to download the certificate post-submission |
| manualValidation | boolean | true | Manual validation required on certificates on submit |
| enableGenCertModal | boolean | true | Displays GenCert as a modal (false embeds it inline) |
| buttonText | string | — | Custom text for the action button |
| buttonTextColor | string | — | Color of the button text |
| primaryColor | string | #2966B1 | Primary color of the button |
| dangerColor | string | #E76F51 | Color used for danger actions |
| successColor | string | #14AE5C | Color used for success indicators |
| buttonStyles | string | — | Inline CSS for custom button styling |
| onComplete | (boolean) => boolean | — | Callback when the certificate is uploaded/updated |


## 🧹 Uninstallation

To completely remove Exemption IQ:

```bash
node vendor/exemption-iq/dist/bin/init.js --uninstall
```

This will:
- Remove `vendor/exemption-iq`
- Unpatch `package.json`
- Delete scaffolded API routes


## 👥 Who Should Use This?

- Engineers integrating Avalara exemption workflows
- Teams using GenCert or CertCapture
- Projects needing easy, secure plug-in of exemption logic and API


## 📜 Licensing & Access

This package is licensed through Tax CSA and requires an ExemptionIQ authenticated user account to download and install.


## 🛡️ Powered by Tax CSA

Tax CSA provides high-compliance sales tax automation services. Exemption IQ is one of our developer-first tools to simplify Avalara integrations.

➡️ Visit us at [https://www.taxcsa.com](https://www.taxcsa.com)