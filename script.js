document.addEventListener('DOMContentLoaded', () => {
    
    // --- Gentle Fade-Ins on Scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- Smooth Anchor Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; 

            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Interactive Live Code Showcase Logic ---
    const skillData = {
        react: {
            filename: "Dashboard.jsx",
            badge: "Proficient",
            percent: 85,
            desc: "Proficient • UI/UX Rendering & API States",
            useCases: ["Dynamic Views Template", "Frontend Architecture", "State Engine Handlers"],
            code: `// Dynamic Full-Stack Implementation
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(\`/users/\${userId}\`);
    return setDashboardState(response.data);
  } catch (error) {
    console.error("API Design handling:", error);
  }
};`
        },
        php: {
            filename: "routes/api.php",
            badge: "Proficient",
            percent: 80,
            desc: "Proficient • Server-Side Control",
            useCases: ["Payload Validation", "MVC Framework Pipelines", "JSON API Integration"],
            code: `// Backend routing and Laravel logic
Route::post('/process-data', function (Request $request) {
    $validated = $request->validate([
        'title' => 'required|max:255',
        'body' => 'required',
    ]);
    
    return response()->json([
        'status' => 'success',
        'data' => $validated
    ]);
});`
        },
        node: {
            filename: "server.js",
            badge: "Competent",
            percent: 75,
            desc: "Competent • Event Loop APIs",
            useCases: ["Middleware Assemblies", "Database Access Routing", "Express Engine Nodes"],
            code: `// Node.js Express server setup
const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(\`Incoming request: \${req.method} \${req.url}\`);
  next();
});

app.listen(3000, () => console.log('Server running on port 3000'));`
        },
        python: {
            filename: "automation.py",
            badge: "Familiar",
            percent: 65,
            desc: "Familiar • Logical Automation",
            useCases: ["Data Parsing Maps", "Process Scripting", "Algorithms Flow"],
            code: `def process_data(records):
    """
    Filters and formats incoming data payloads.
    """
    clean_data = []
    for record in records:
        if record.is_valid:
            clean_data.append(record.format())
            
    return clean_data`
        }
    };

    const skillTabs = document.querySelectorAll('.skill-tab');
    if(skillTabs.length > 0) {
        const fileNameEl = document.getElementById('skill-filename');
        const badgeEl = document.getElementById('skill-badge');
        const codeContentEl = document.getElementById('code-content');
        const lineNumbersEl = document.getElementById('line-numbers');
        const masteryPercentEl = document.getElementById('mastery-percent');
        const masteryBarEl = document.getElementById('mastery-bar');
        const masteryDescEl = document.getElementById('mastery-desc');
        const useCasesEl = document.getElementById('use-cases');

        function updateSkillUI(skillKey) {
            const data = skillData[skillKey];

            fileNameEl.textContent = data.filename;
            badgeEl.textContent = data.badge;
            codeContentEl.textContent = data.code;
            
            masteryPercentEl.textContent = data.percent;
            masteryBarEl.style.width = `${data.percent}%`;
            masteryDescEl.textContent = data.desc;

            useCasesEl.innerHTML = '';
            data.useCases.forEach(useCase => {
                const span = document.createElement('span');
                span.textContent = useCase;
                useCasesEl.appendChild(span);
            });

            const lineCount = data.code.split('\n').length;
            lineNumbersEl.innerHTML = '';
            for (let i = 1; i <= lineCount; i++) {
                lineNumbersEl.innerHTML += `${i}<br>`;
            }
        }

        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                skillTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const skillKey = tab.getAttribute('data-skill');
                updateSkillUI(skillKey);
            });
        });

        // Initialize first tab selection
        updateSkillUI('react');
    }
});