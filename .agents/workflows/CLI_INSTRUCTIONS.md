# ZPluse Ingestion Agent: Global CLI Integration

To enable the `/kaam krde bhai` command globally on your Mac, follow these steps:

### 1. The ZSH Function
Copy the following block and append it to your `~/.zshrc` file. This function now supports a third argument for the test type (`psychometric` or `objective`).

```bash
# ZPluse Ingestion Agent Global Trigger
# Usage: /kaam krde bhai <file_path> <category> <test_type>
# Supports: .jpg, .jpeg, .png, .webp, .docx
function /kaam() {
    if [[ "$1" == "krde" && "$2" == "bhai" ]]; then
        # Arguments: $3=path, $4=category, $5=test_type
        node "/Users/apple/Documents/github-agents/scripts/ingestion-agent.js" "$3" "$4" "$5"
    else
        # Fallback to standard behavior if not the special command
        echo "Usage: /kaam krde bhai <image_path> <category> <test_type>"
        echo "Example: /kaam krde bhai ./gto_test.pdf \"Aptitude\" \"objective\""
    fi
}
```

### 2. Terminal Installation Commands
Run these commands in your terminal to automate the setup (this will overwrite the old version):

```bash
# Update the function in your .zshrc
cat << 'EOF' > ~/.zshrc_tmp
# ZPluse Ingestion Agent Global Trigger
function /kaam() {
    if [[ "$1" == "krde" && "$2" == "bhai" ]]; then
        node "/Users/apple/Documents/github-agents/scripts/ingestion-agent.js" "$3" "$4" "$5"
    else
        echo "Usage: /kaam krde bhai <image_path> <category> <test_type>"
        echo "Example: /kaam krde bhai ./gto_test.pdf \"Aptitude\" \"objective\""
    fi
}
EOF

# Append to .zshrc if not present, or replace the old one manually
# For now, just run: source ~/.zshrc after manually updating.
```

### 3. Final Step: Add your API Keys
Ensure your `.env` file is up to date:
```bash
# Edit the .env file with your GEMINI_API_KEY and FIREBASE_ADMIN_TOKEN
```

Now you can run the command from anywhere:
`/kaam krde bhai ./images/gto_test.pdf "Aptitude" "objective"`
