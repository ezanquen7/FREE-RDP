// The Open Mind Demo - Advanced AI Interface
// This is a demonstration interface showcasing AI interaction concepts

class OpenMindDemo {
    constructor() {
        this.messageCount = 1; // Start at 1 to account for welcome message
        this.sessionStartTime = Date.now();
        this.topicCount = 0;
        this.conversationHistory = [];
        
        this.initializeElements();
        this.bindEvents();
        this.setupAutoResize();
        this.updateStats();
    }

    initializeElements() {
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.clearButton = document.getElementById('clearChat');
        this.exportButton = document.getElementById('exportChat');
        this.charCount = document.getElementById('charCount');
        this.messageCountEl = document.getElementById('messageCount');
        this.avgResponseTimeEl = document.getElementById('avgResponseTime');
        this.topicCountEl = document.getElementById('topicCount');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.quickPrompts = document.querySelectorAll('.quick-prompt');
    }

    bindEvents() {
        // Send message events
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Character count
        this.chatInput.addEventListener('input', () => this.updateCharCount());

        // Quick prompts
        this.quickPrompts.forEach(prompt => {
            prompt.addEventListener('click', () => {
                this.chatInput.value = prompt.textContent;
                this.chatInput.focus();
                this.updateCharCount();
            });
        });

        // Control buttons
        this.clearButton.addEventListener('click', () => this.clearChat());
        this.exportButton.addEventListener('click', () => this.exportChat());

        // Auto-focus input
        this.chatInput.focus();
    }

    setupAutoResize() {
        this.chatInput.addEventListener('input', () => {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 120) + 'px';
        });
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Disable input while processing
        this.setInputDisabled(true);
        this.showLoading(true);

        // Add user message
        this.addMessage('user', message);
        this.chatInput.value = '';
        this.updateCharCount();
        this.chatInput.style.height = 'auto';

        try {
            // Simulate AI response delay
            const startTime = Date.now();
            const response = await this.generateAIResponse(message);
            const responseTime = Date.now() - startTime;

            // Add AI response
            this.addMessage('assistant', response);
            this.updateResponseTime(responseTime);
            this.analyzeTopics(message);
            
        } catch (error) {
            console.error('Error generating response:', error);
            this.addMessage('assistant', 'I apologize, but I encountered an error while processing your request. Please try again.');
        } finally {
            this.setInputDisabled(false);
            this.showLoading(false);
            this.chatInput.focus();
        }
    }

    async generateAIResponse(userMessage) {
        // Simulate processing time
        await this.delay(800 + Math.random() * 1200);
        
        // Store conversation for context
        this.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        });

        // Generate contextual response based on message content
        const response = this.createContextualResponse(userMessage);
        
        this.conversationHistory.push({
            role: 'assistant',
            content: response,
            timestamp: new Date()
        });

        return response;
    }

    createContextualResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Philosophical/Deep thinking responses
        if (lowerMessage.includes('meaning') || lowerMessage.includes('purpose') || lowerMessage.includes('philosophy')) {
            return `This is a profound question that has occupied thinkers for millennia. The search for meaning often involves examining our relationships, our impact on others, and the legacy we create. From an existentialist perspective, meaning might be something we create rather than discover. What aspects of meaning resonate most strongly with your experience?`;
        }
        
        // Creative/Artistic requests
        if (lowerMessage.includes('creative') || lowerMessage.includes('story') || lowerMessage.includes('poem') || lowerMessage.includes('write')) {
            return `I'd be delighted to explore creative expression with you. Creativity often emerges from the intersection of experience, imagination, and technical skill. Whether we're crafting narrative, poetry, or conceptual frameworks, the process involves both structured thinking and intuitive leaps. What creative direction would you like to explore? I can help with storytelling, worldbuilding, character development, or experimental forms.`;
        }
        
        // Analytical/Problem-solving
        if (lowerMessage.includes('analyze') || lowerMessage.includes('problem') || lowerMessage.includes('solution') || lowerMessage.includes('think')) {
            return `Excellent - analytical thinking is one of my core strengths. I approach complex problems by breaking them into constituent elements, examining relationships between components, and considering multiple perspectives simultaneously. I can help with logical frameworks, decision matrices, root cause analysis, scenario planning, and structured problem decomposition. What specific challenge would you like to explore together?`;
        }
        
        // Science/Technical discussions
        if (lowerMessage.includes('science') || lowerMessage.includes('research') || lowerMessage.includes('technology') || lowerMessage.includes('data')) {
            return `Scientific inquiry and technological advancement represent humanity's systematic approach to understanding and shaping reality. I can engage with current research paradigms, methodological considerations, emerging technologies, and their societal implications. I'm particularly interested in interdisciplinary connections and the philosophy of science. What scientific or technical domain would you like to explore?`;
        }
        
        // Ethics/Morality discussions
        if (lowerMessage.includes('ethics') || lowerMessage.includes('moral') || lowerMessage.includes('right') || lowerMessage.includes('wrong')) {
            return `Ethical reasoning is fundamentally about navigating competing values, understanding consequences, and considering the perspectives of all affected parties. I can examine ethical frameworks from deontological, consequentialist, virtue ethics, and care ethics perspectives. These discussions often reveal the complexity inherent in moral decision-making. What ethical dimension would you like to explore?`;
        }
        
        // Learning/Education
        if (lowerMessage.includes('learn') || lowerMessage.includes('teach') || lowerMessage.includes('explain') || lowerMessage.includes('understand')) {
            return `Learning is most effective when it connects new information to existing knowledge structures while challenging our current understanding. I can adapt explanations to different levels of complexity, use analogies and examples, and help build conceptual frameworks. I'm particularly interested in metacognitive approaches - learning how to learn. What subject or concept would you like to explore together?`;
        }
        
        // Generic but thoughtful response
        const responses = [
            `That's an intriguing perspective. I find that the most valuable discussions often emerge when we examine the underlying assumptions and explore multiple dimensions of a topic. Your question touches on several interconnected themes that deserve careful consideration. Could you elaborate on which aspect interests you most?`,
            
            `This raises fascinating questions about the nature of knowledge, experience, and reasoning. I'm designed to engage with complex, nuanced topics that don't have simple answers. The depth of inquiry you're suggesting appeals to my analytical capabilities. What specific angle would you like to pursue?`,
            
            `I appreciate the thoughtfulness in your question. These kinds of open-ended explorations often lead to the most rewarding intellectual territory. I can examine this from multiple disciplinary perspectives - philosophical, scientific, historical, or practical. Which lens would be most valuable for our discussion?`,
            
            `Your inquiry invites a multi-layered analysis. I find that the most interesting conversations occur when we're willing to embrace complexity rather than seeking oversimplified answers. I can help examine the various facets of this topic, considering different stakeholder perspectives and potential implications. Where shall we begin?`,
            
            `This connects to some fundamental questions about knowledge, reality, and human experience. I'm equipped to engage with abstract concepts while maintaining intellectual rigor. The beauty of these discussions lies in their capacity to reveal unexpected connections and insights. What dimension would you like to explore first?`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const senderName = sender === 'user' ? 'You' : 'The Open Mind';
        const avatarIcon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender">${senderName}</span>
                    <span class="timestamp">${timeString}</span>
                </div>
                <div class="message-text">${this.formatMessage(content)}</div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        this.messageCount++;
        this.updateStats();
    }

    formatMessage(content) {
        // Basic markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    analyzeTopics(message) {
        const topics = ['philosophy', 'science', 'technology', 'ethics', 'creativity', 'analysis', 'learning'];
        const foundTopics = topics.filter(topic => 
            message.toLowerCase().includes(topic) || 
            message.toLowerCase().includes(topic.slice(0, -1)) // Handle plural/singular
        );
        
        if (foundTopics.length > 0) {
            this.topicCount = Math.min(this.topicCount + foundTopics.length, 10);
            this.updateStats();
        }
    }

    updateResponseTime(newTime) {
        const times = JSON.parse(localStorage.getItem('responseTimes') || '[]');
        times.push(newTime);
        if (times.length > 10) times.shift(); // Keep last 10
        localStorage.setItem('responseTimes', JSON.stringify(times));
        
        const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
        this.avgResponseTimeEl.textContent = `~${(avgTime / 1000).toFixed(1)}s`;
    }

    updateStats() {
        this.messageCountEl.textContent = this.messageCount;
        this.topicCountEl.textContent = this.topicCount;
    }

    updateCharCount() {
        const count = this.chatInput.value.length;
        this.charCount.textContent = `${count} characters`;
        
        // Enable/disable send button
        this.sendButton.disabled = count === 0;
    }

    setInputDisabled(disabled) {
        this.chatInput.disabled = disabled;
        this.sendButton.disabled = disabled || this.chatInput.value.trim().length === 0;
    }

    showLoading(show) {
        if (show) {
            this.loadingOverlay.classList.add('active');
        } else {
            this.loadingOverlay.classList.remove('active');
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    clearChat() {
        const userMessages = this.chatMessages.querySelectorAll('.user-message, .assistant-message:not(:first-child)');
        userMessages.forEach(msg => msg.remove());
        
        this.messageCount = 1; // Keep welcome message
        this.topicCount = 0;
        this.conversationHistory = [];
        this.updateStats();
        this.chatInput.focus();
    }

    exportChat() {
        const messages = Array.from(this.chatMessages.querySelectorAll('.message')).map(msg => {
            const sender = msg.querySelector('.sender').textContent;
            const timestamp = msg.querySelector('.timestamp').textContent;
            const text = msg.querySelector('.message-text').textContent;
            return `[${timestamp}] ${sender}: ${text}`;
        });
        
        const chatContent = messages.join('\n\n');
        const blob = new Blob([chatContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `open-mind-chat-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Advanced Features
class AdvancedFeatures {
    constructor(demo) {
        this.demo = demo;
        this.setupKeyboardShortcuts();
        this.setupThemeToggle();
        this.setupConversationMemory();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Escape to clear input
            if (e.key === 'Escape') {
                this.demo.chatInput.value = '';
                this.demo.updateCharCount();
            }
            
            // Ctrl/Cmd + K to focus input
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.demo.chatInput.focus();
            }
            
            // Ctrl/Cmd + Shift + C to clear chat
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.demo.clearChat();
            }
        });
    }

    setupThemeToggle() {
        // Could add theme switching functionality here
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.handleThemeChange(mediaQuery);
        mediaQuery.addListener(this.handleThemeChange);
    }

    handleThemeChange(e) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    setupConversationMemory() {
        // Save conversation state to localStorage periodically
        setInterval(() => {
            const state = {
                messageCount: this.demo.messageCount,
                topicCount: this.demo.topicCount,
                conversationHistory: this.demo.conversationHistory.slice(-20) // Keep last 20 messages
            };
            localStorage.setItem('openMindState', JSON.stringify(state));
        }, 30000); // Every 30 seconds
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const demo = new OpenMindDemo();
    new AdvancedFeatures(demo);
    
    // Add some welcome interactions
    setTimeout(() => {
        const welcomeTips = [
            "💡 Try asking about philosophy, science, or creative projects",
            "🔄 Use Ctrl+Enter to send messages quickly",
            "📁 Export your conversation anytime using the export button"
        ];
        
        const randomTip = welcomeTips[Math.floor(Math.random() * welcomeTips.length)];
        console.log(`Open Mind Demo Tip: ${randomTip}`);
    }, 2000);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Open Mind Demo Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Open Mind Demo loaded in ${loadTime}ms`);
        }, 0);
    });
}
