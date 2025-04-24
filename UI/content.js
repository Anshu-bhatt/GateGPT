async function sendMessage() {
            const input = document.getElementById("userInput");
            const message = input.value.trim();
            if (!message) return;
        
            const chatBox = document.getElementById("chatContainer");
        
            // Display user message
            chatBox.innerHTML += `
                <div class="message user-message">
                    <span class="message-label">You:</span>
                    <div class="message-content">${message}</div>
                </div>
            `;
            input.value = "";
        
            // Add loading spinner
            const loadingId = "loading-" + Date.now();
            chatBox.innerHTML += `
                <div class="message bot-message" id="${loadingId}">
                    <div class="loading-spinner"></div>
                    <span class="message-label">Bot:</span>
                    <div class="message-content">Thinking...</div>
                </div>
            `;
            chatBox.scrollTop = chatBox.scrollHeight;
        
            try {
                const res = await fetch("http://127.0.0.1:5000/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message })
                });
        
                const data = await res.json();
                const reply = data.reply || "Something went wrong.";
        
                // Replace loading with bot reply
                document.getElementById(loadingId).innerHTML = `
                    <span class="message-label">Bot:</span>
                    <div class="message-content">${reply}</div>
                `;
                chatBox.scrollTop = chatBox.scrollHeight;
            } catch (err) {
                document.getElementById(loadingId).innerHTML = `
                    <span class="message-label">Bot:</span>
                    <div class="message-content">Error: ${err.message}</div>
                `;
            }
        }
