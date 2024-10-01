document.getElementById('extractButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = inputText.match(emailRegex);
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = ''; // Clear previous results

    if (emails) {
        const uniqueEmails = [...new Set(emails)]; // Remove duplicates
        uniqueEmails.forEach(email => {
            const emailElement = document.createElement('div');
            emailElement.textContent = email;
            resultDiv.appendChild(emailElement);
        });

        // Highlight emails in the original input
        highlightEmails(inputText, uniqueEmails);
        document.getElementById('downloadButton').style.display = 'block'; // Show download button
    } else {
        resultDiv.textContent = 'No emails found.';
        document.getElementById('downloadButton').style.display = 'none'; // Hide download button
    }
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const emails = Array.from(document.getElementById('result').children).map(email => email.textContent).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'extracted_emails.txt';
    link.click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('inputText').value = e.target.result;
        };
        reader.readAsText(file);
    }
});

function highlightEmails(text, emails) {
    const regex = new RegExp(`(${emails.join('|')})`, 'g');
    const highlightedText = text.replace(regex, '<span class="highlight">$1</span>');
    document.getElementById('inputText').innerHTML = highlightedText;
}
