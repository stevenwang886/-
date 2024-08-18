// 动态标题效果
const title = "剧本影子剧本创作从未如此轻松";
const titleElement = document.getElementById('dynamic-title');
let index = 0;
let isDeleting = false;

function typeWriter() {
    if (!isDeleting && index <= title.length) {
        titleElement.innerHTML = title.slice(0, index) + '<span class="cursor">|</span>';
        index++;
        setTimeout(typeWriter, 100);
    } else if (isDeleting && index >= 0) {
        titleElement.innerHTML = title.slice(0, index) + '<span class="cursor">|</span>';
        index--;
        setTimeout(typeWriter, 50);
    } else {
        isDeleting = !isDeleting;
        setTimeout(typeWriter, isDeleting ? 1000 : 200);
    }
}

typeWriter();

// 文件上传功能
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');

uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

function handleFiles(files) {
    for (let file of files) {
        addDocumentToTable(file);
    }
}

function addDocumentToTable(file) {
    const tbody = document.querySelector('#document-table tbody');
    const row = tbody.insertRow();
    const now = new Date();
    const documentId = Math.random().toString(36).substr(2, 9);
    
    row.innerHTML = `
        <td class="document-name">${file.name}</td>
        <td>${now.toLocaleString()}</td>
        <td><button onclick="showRewritePage('${documentId}', '${file.name}')">生成</button></td>
        <td><button onclick="exportFullText('${file.name}')">导出</button></td>
    `;

    if (!window.documents) window.documents = {};
    window.documents[documentId] = { name: file.name, uploadTime: now };
}

function showRewritePage(documentId, fileName) {
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('rewrite-page').classList.add('active');
    document.getElementById('current-document').textContent = fileName;

    // 清除之前的内容
    document.getElementById('original-outline').value = '';
    document.getElementById('rewritten-outline').value = '';
    document.getElementById('character-list').innerHTML = '';
    document.getElementById('episode-outlines').innerHTML = '';
    document.getElementById('full-text-content').innerHTML = '';

    console.log(`准备处理文档：${fileName}，ID：${documentId}`);
}

function showHomePage() {
    document.getElementById('rewrite-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
}

function generateOriginalOutline() {
    const currentDocumentName = document.getElementById('current-document').textContent;
    console.log(`为 ${currentDocumentName} 生成原文大纲`);
    setTimeout(() => {
        document.getElementById('original-outline').value = `这是为 ${currentDocumentName} 生成的1000字原文大纲。
实际应用中，这里将包含由大模型生成的详细故事大纲，包括主要情节、人物、场景等元素。
...（此处省略约980字）`;
    }, 2000);
}

function rewriteOutline() {
    const originalOutline = document.getElementById('original-outline').value;
    console.log('改写大纲');
    setTimeout(() => {
        document.getElementById('rewritten-outline').value = `这是改写后的新故事框架和元素：
1. 主要人物：[新的人物名称列表]
2. 核心关系：[新的人物关系描述]
3. 关键物品：[新的重要物品列表]
4. 主要地点：[新的场景地点]
5. 关键事件：[新的故事事件]
...（此处省略更多细节）`;
    }, 2000);
}

// 剩下的代码继续...
function generateCharacters() {
    const rewrittenOutline = document.getElementById('rewritten-outline').value;
    if (!rewrittenOutline) {
        alert('请先生成并改写故事大纲！');
        return;
    }

    console.log('生成人物小传');
    setTimeout(() => {
        const characterList = document.getElementById('character-list');
        characterList.innerHTML = '';

        const characters = ['主角', '配角1', '配角2'];
        characters.forEach((character, index) => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'character-item';
            characterDiv.innerHTML = `
                <h3>${character}</h3>
                <textarea readonly>这是${character}的小传内容...</textarea>
                <textarea placeholder="输入改写需求..."></textarea>
                <button onclick="rewriteCharacter(${index})">改写人物小传</button>
            `;
            characterList.appendChild(characterDiv);
        });
    }, 2000);
}

function rewriteCharacter(index) {
    const characterDivs = document.querySelectorAll('.character-item');
    const characterContent = characterDivs[index].querySelectorAll('textarea')[0];
    const characterInput = characterDivs[index].querySelectorAll('textarea')[1];

    console.log(`改写第 ${index + 1} 个人物小传`);
    setTimeout(() => {
        characterContent.value = `这是根据用户输入 "${characterInput.value}" 改写的人物小传内容...`;
        characterInput.value = '';
    }, 1500);
}

function generateEpisodeOutlines() {
    const rewrittenOutline = document.getElementById('rewritten-outline').value;
    const characterList = document.getElementById('character-list');
    
    if (!rewrittenOutline || characterList.children.length === 0) {
        alert('请先生成并改写故事大纲，以及生成人物小传！');
        return;
    }

    console.log('生成分集大纲');
    const episodeOutlinesContainer = document.getElementById('episode-outlines');
    episodeOutlinesContainer.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        const episodeDiv = document.createElement('div');
        episodeDiv.className = 'episode-item';
        episodeDiv.innerHTML = `
            <h3>第${i}集</h3>
            <textarea>这是第${i}集的大纲内容...</textarea>
        `;
        episodeOutlinesContainer.appendChild(episodeDiv);
    }
}

function generateFullText() {
    const episodeOutlines = document.querySelectorAll('.episode-item');
    if (episodeOutlines.length === 0) {
        alert('请先生成分集大纲！');
        return;
    }

    console.log('生成正文');
    const fullTextContent = document.getElementById('full-text-content');
    fullTextContent.innerHTML = '';

    episodeOutlines.forEach((outline, index) => {
        const episodeTitle = outline.querySelector('h3').textContent;
        const episodeContent = outline.querySelector('textarea').value;

        setTimeout(() => {
            const episodeTextDiv = document.createElement('div');
            episodeTextDiv.className = 'episode-text';
            episodeTextDiv.innerHTML = `
                <h3>${episodeTitle}</h3>
                <textarea readonly>
根据${episodeTitle}大纲生成的正文（至少700字）：

${episodeContent}

这里是基于上述大纲生成的详细正文内容。实际应用中，这里将包含由大模型根据大纲生成的至少700字的正文，包括具体的场景描述、人物对话、情节发展等。

...（此处省略剩余内容，确保总字数不少于700字）...
                </textarea>
            `;
            fullTextContent.appendChild(episodeTextDiv);
        }, (index + 1) * 1000);
    });
}

function exportFullText(fileName) {
    console.log(`导出 ${fileName} 的全文`);
    // 这里添加导出全文的逻辑
}
