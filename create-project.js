const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
    const args = { _: [] };
    for (let i = 0; i < argv.length; i += 1) {
        const token = argv[i];
        if (token.startsWith("--")) {
            const key = token.slice(2);
            const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : true;
            args[key] = value;
            if (value !== true) {
                i += 1;
            }
        } else {
            args._.push(token);
        }
    }
    return args;
}

async function copyDirectory(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await fs.promises.copyFile(srcPath, destPath);
        }
    }
}

function updateTemplateTitle(filePath, projectName) {
    const html = fs.readFileSync(filePath, "utf8");
    const updated = html.replace(/<title>.*?<\/title>/, `<title>${projectName}</title>`);
    fs.writeFileSync(filePath, updated, "utf8");
}

function insertProjectEntry(loaderPath, entry) {
    const content = fs.readFileSync(loaderPath, "utf8");
    const arrayMatch = content.match(/const\s+projects\s*=\s*\[([\s\S]*?)\];/);

    if (!arrayMatch) {
        throw new Error("找不到 projects 陣列，請確認 projects-loader.js 格式");
    }

    const arrayBody = arrayMatch[1].trim();
    const indent = "    ";
    const newEntry = [
        "{",
        `${indent}name: \"${entry.name}\",`,
        `${indent}description: \"${entry.description}\",`,
        `${indent}folder: \"${entry.folder}\",`,
        `${indent}thumbnail: \"${entry.thumbnail}\"`,
        "}"
    ].join(`\n${indent}`);

    let updatedArrayBody = arrayBody;
    if (arrayBody.length === 0) {
        updatedArrayBody = `\n${indent}${newEntry}\n`;
    } else {
        updatedArrayBody = `\n${indent}${newEntry},\n${indent}${arrayBody.trim()}\n`;
    }

    const updatedContent = content.replace(/const\s+projects\s*=\s*\[[\s\S]*?\];/, `const projects = [${updatedArrayBody}];`);
    fs.writeFileSync(loaderPath, updatedContent, "utf8");
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const folder = args._[0];

    if (!folder) {
        console.log("用法: node create-project.js <專案資料夾名稱> [--name 專案名稱] [--desc 專案描述] [--thumb 縮圖路徑]");
        process.exit(1);
    }

    const rootDir = path.resolve(__dirname);
    const projectsDir = path.join(rootDir, "projects");
    const templateDir = path.join(projectsDir, "template");
    const targetDir = path.join(projectsDir, folder);

    if (!fs.existsSync(templateDir)) {
        throw new Error("找不到 template 資料夾，請確認路徑是否正確");
    }

    if (fs.existsSync(targetDir)) {
        throw new Error(`資料夾已存在: ${targetDir}`);
    }

    const projectName = args.name === true || !args.name ? folder : args.name;
    const description = args.desc === true || !args.desc ? "請輸入專案描述" : args.desc;
    const thumbnail = args.thumb === true || !args.thumb ? `projects/${folder}/images/0130.png` : args.thumb;

    await copyDirectory(templateDir, targetDir);

    const indexPath = path.join(targetDir, "index.html");
    if (fs.existsSync(indexPath)) {
        updateTemplateTitle(indexPath, projectName);
    }

    const loaderPath = path.join(rootDir, "projects-loader.js");
    insertProjectEntry(loaderPath, {
        name: projectName,
        description,
        folder,
        thumbnail
    });

    console.log("✅ 已建立專案並更新 projects-loader.js");
}

main().catch(error => {
    console.error(`❌ ${error.message}`);
    process.exit(1);
});
