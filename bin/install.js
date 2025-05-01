#!/usr/bin/env node

import prompts from "prompts";
import fetch from "node-fetch";
import { execa } from "execa";
import fs from "fs";
import path from "path";
import { tmpdir } from "os";
import { pipeline } from "stream/promises";

(async () => {
  console.log("\n📦 Welcome to the Exemption IQ installer\n");

  const { username, password } = await prompts([
    { type: "text", name: "username", message: "Username:" },
    { type: "password", name: "password", message: "Password:" },
  ]);

  const baseUrl = "https://exemptioniq-api.onrender.com";

  console.log("\n🔐 Authenticating...");
  const authRes = await fetch(`${baseUrl}/exemptioniq-api/auth/plugin-key`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!authRes.ok) {
    const errorText = await authRes.text();
    console.error("❌ Authentication failed:", errorText);
    process.exit(1);
  }

  const { token } = await authRes.json();
  console.log("✅ Authenticated\n");

  console.log("📥 Requesting secure package download URL...");
  const urlRes = await fetch(`${baseUrl}/exemptioniq-api/auth/get-package-url`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!urlRes.ok) {
    const errorText = await urlRes.text();
    console.error("❌ Failed to retrieve package URL:", errorText);
    process.exit(1);
  }

  const { url, version } = await urlRes.json();
  console.log(`📦 Downloading exemption-iq@${version}`);

  const tempFilePath = path.join(tmpdir(), `exemption-iq-${Date.now()}.tgz`);
  const projectRoot = process.cwd();
  const packageDir = path.join(projectRoot, "vendor", "exemption-iq");

  try {
    console.log("🔍 Verifying package URL...");
    const headCheck = await fetch(url, { method: "HEAD" });
    if (headCheck.status !== 200) {
      throw new Error("Signed URL not valid or expired.");
    }

    console.log(`⬇️  Downloading package to ${tempFilePath}...`);
    const packageRes = await fetch(url);
    if (!packageRes.ok || !packageRes.body) {
      throw new Error("Failed to fetch package content");
    }

    await pipeline(packageRes.body, fs.createWriteStream(tempFilePath));
    console.log("✅ Package downloaded\n");

    // Clean up existing package
    if (fs.existsSync(packageDir)) {
      fs.rmSync(packageDir, { recursive: true, force: true });
    }
    fs.mkdirSync(packageDir, { recursive: true });

    console.log("📦 Extracting package...");
    await execa("tar", ["-xzf", tempFilePath, "-C", packageDir, "--strip-components=1"]);

    const packageJsonPath = path.join(packageDir, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error("Extracted package is missing package.json");
    }

    // 🔧 Patch root package.json
    const rootPackagePath = path.join(projectRoot, "package.json");
    if (fs.existsSync(rootPackagePath)) {
      const rootPackageJson = JSON.parse(fs.readFileSync(rootPackagePath, "utf-8"));
      rootPackageJson.dependencies = rootPackageJson.dependencies || {};
      rootPackageJson.dependencies["exemption-iq"] = "file:vendor/exemption-iq";

      fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackageJson, null, 2));
      console.log("🛠️  Patched package.json with exemption-iq dependency");
    }

    // ✅ Auto-add vendor/ to .gitignore if in a Git repo
    const gitDir = path.join(projectRoot, ".git");
    const gitignorePath = path.join(projectRoot, ".gitignore");

    if (fs.existsSync(gitDir)) {
      let shouldWrite = true;

      if (fs.existsSync(gitignorePath)) {
        const contents = fs.readFileSync(gitignorePath, "utf-8");
        shouldWrite = !contents.split("\n").some(line => line.trim() === "vendor/");
      }

      if (shouldWrite) {
        fs.appendFileSync(gitignorePath, "\nvendor/\n", "utf-8");
        console.log("🔒 Added 'vendor/' to .gitignore to avoid committing extracted package");
      } else {
        console.log("✅ 'vendor/' is already ignored in .gitignore");
      }
    } else {
      console.log("ℹ️ No Git repository detected. Skipping .gitignore update.");
    }

    const localBin = path.join(packageDir, "dist", "bin", "init.js");
    if (!fs.existsSync(localBin)) {
      throw new Error("Cannot find CLI binary in extracted package.");
    }

    console.log("\n🚀 Running project scaffolding...");
    await execa("node", [localBin], { stdio: "inherit" });

    console.log("\n📦 Installing dependencies...");
    await execa("npm", ["install"], { stdio: "inherit" });

    console.log(`\n🎉 Done! Exemption IQ @${version} has been installed and initialized.`);
    console.log("🧹 To uninstall, run:");
    console.log("   node vendor/exemption-iq/dist/bin/init.js --uninstall");

  } catch (err) {
    console.error("❌ Installation failed:", err);
    process.exit(1);
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
      console.log(`🧼 Cleaned up temp file: ${tempFilePath}`);
    }
  }
})();
