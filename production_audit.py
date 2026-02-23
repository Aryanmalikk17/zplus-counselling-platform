import os
import re

def audit_codebase():
    base_dir = "."
    backend_dir = os.path.join(base_dir, "backend")
    frontend_dir = os.path.join(base_dir, "my-frontend-app")
    
    report = ["# Production Readiness Audit Report\n"]
    
    # 1. Check for hardcoded secrets
    report.append("## 1. Hardcoded Secrets Check")
    secrets_patterns = [
        r"api[_-]key\s*=\s*['\"][\w-]{20,}['\"]",
        r"password\s*=\s*['\"][\w-]{8,}['\"]",
        r"secret\s*=\s*['\"][\w-]{20,}['\"]",
        r"token\s*=\s*['\"][\w-]{20,}['\"]",
        r"firebase[_-]config"
    ]
    
    found_secrets = []
    for root, _, files in os.walk(base_dir):
        if "node_modules" in root or ".git" in root or "target" in root:
            continue
        for file in files:
            if file.endswith((".java", ".ts", ".tsx", ".js", ".properties", ".yml", ".yaml")):
                path = os.path.join(root, file)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        content = f.read()
                        for pattern in secrets_patterns:
                            if re.search(pattern, content, re.IGNORECASE):
                                found_secrets.append(path)
                                break
                except Exception:
                    pass
    
    if found_secrets:
        report.append("⚠️ **Potential secrets found in:**")
        for secret_path in list(set(found_secrets)):
            report.append(f"- `{secret_path}`")
    else:
        report.append("✅ No obvious hardcoded secrets found.")
    
    # 2. Check for "localhost" in production files
    report.append("\n## 2. Environment Configuration Check")
    localhost_found = []
    prod_files = [".env.production", "docker-compose.prod.yml", "nginx.conf", "application-prod.properties"]
    
    for root, _, files in os.walk(base_dir):
        for file in files:
            if any(pf in file for pf in prod_files):
                path = os.path.join(root, file)
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        if "localhost" in f.read().lower():
                            localhost_found.append(path)
                except Exception:
                    pass
                    
    if localhost_found:
        report.append("⚠️ **'localhost' found in production-related configs:**")
        for lp in localhost_found:
            report.append(f"- `{lp}`")
    else:
        report.append("✅ Production configs seem to use external hostnames.")

    # 3. Check for console logs in frontend
    report.append("\n## 3. Frontend Audit")
    console_logs = []
    if os.path.exists(frontend_dir):
        for root, _, files in os.walk(os.path.join(frontend_dir, "src")):
            for file in files:
                if file.endswith((".ts", ".tsx", ".js")):
                    path = os.path.join(root, file)
                    try:
                        with open(path, "r", encoding="utf-8") as f:
                            if "console.log(" in f.read():
                                console_logs.append(path)
                    except Exception:
                        pass
    
    if console_logs:
        report.append(f"⚠️ **{len(console_logs)} files contain `console.log` statements.** These should be removed or replaced with a logger for production.")
    else:
        report.append("✅ No `console.log` statements found in `src`.")

    # 4. Check for Spring Boot Security Config
    report.append("\n## 4. Backend Audit (Spring Boot)")
    security_config_path = os.path.join(backend_dir, "src/main/java/com/zplus/counselling/config/SecurityConfig.java")
    if os.path.exists(security_config_path):
        try:
            with open(security_config_path, "r", encoding="utf-8") as f:
                content = f.read()
                if ".permitAll()" in content:
                    report.append("ℹ️ `SecurityConfig.java` uses `permitAll()`. Ensure this is intended for production endpoints.")
                if "csrf().disable()" in content:
                    report.append("⚠️ CSRF is disabled in `SecurityConfig.java`. Ensure this is safe for your production API usage.")
        except Exception:
            report.append("❌ Could not read `SecurityConfig.java`.")
    else:
        report.append("⚠️ `SecurityConfig.java` not found in expected location.")

    # Write report
    report_content = "\n".join(report)
    with open("production_readiness_report.md", "w") as f:
        f.write(report_content)
    
    print("Audit complete! Report generated: production_readiness_report.md")

if __name__ == "__main__":
    audit_codebase()
