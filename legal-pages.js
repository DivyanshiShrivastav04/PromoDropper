// Legal pages specific styles
const legalStyles = `
.legal-page {
    padding: 120px 0 80px;
    min-height: 100vh;
    background: #fafafa;
}

.legal-page__header {
    text-align: center;
    margin-bottom: 3rem;
}

.legal-page__title {
    font-size: 3rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
}

.legal-page__updated {
    font-size: 1rem;
    color: #6b7280;
    font-style: italic;
}

.legal-page__content {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
}

.legal-section {
    margin-bottom: 2.5rem;
}

.legal-section:last-child {
    margin-bottom: 0;
}

.legal-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
}

.legal-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin: 1.5rem 0 1rem;
}

.legal-section p {
    color: #6b7280;
    line-height: 1.7;
    margin-bottom: 1rem;
}

.legal-section ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
}

.legal-section li {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 0.5rem;
}

.legal-section a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
}

.legal-section a:hover {
    text-decoration: underline;
}

.contact-info {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #2563eb;
    margin-top: 1rem;
}

.contact-info p {
    margin-bottom: 0.5rem;
}

.contact-info p:last-child {
    margin-bottom: 0;
}

@media (max-width: 768px) {
    .legal-page__title {
        font-size: 2.5rem;
    }
    
    .legal-page__content {
        padding: 2rem 1.5rem;
        margin: 0 1rem;
    }
    
    .legal-section h2 {
        font-size: 1.25rem;
    }
    
    .legal-section h3 {
        font-size: 1.125rem;
    }
}
`;

// Add legal page styles
const style = document.createElement('style');
style.textContent = legalStyles;
document.head.appendChild(style);

// Add smooth scroll to sections (if there are internal links)
document.addEventListener('DOMContentLoaded', () => {
    // Add table of contents functionality if needed
    const sections = document.querySelectorAll('.legal-section h2');
    if (sections.length > 3) {
        createTableOfContents(sections);
    }
});

function createTableOfContents(sections) {
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Table of Contents</h3>';
    
    const tocList = document.createElement('ol');
    
    sections.forEach((section, index) => {
        // Add ID to section
        const id = `section-${index + 1}`;
        section.id = id;
        
        // Create TOC item
        const tocItem = document.createElement('li');
        const tocLink = document.createElement('a');
        tocLink.href = `#${id}`;
        tocLink.textContent = section.textContent;
        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });
    
    toc.appendChild(tocList);
    
    // Insert TOC at the beginning of content
    const content = document.querySelector('.legal-page__content');
    content.insertBefore(toc, content.firstChild);
    
    // Add TOC styles
    const tocStyles = `
    .table-of-contents {
        background: #f8fafc;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        border: 1px solid #e5e7eb;
    }
    
    .table-of-contents h3 {
        margin: 0 0 1rem 0;
        font-size: 1.125rem;
        color: #374151;
    }
    
    .table-of-contents ol {
        margin: 0;
        padding-left: 1.5rem;
    }
    
    .table-of-contents li {
        margin-bottom: 0.5rem;
    }
    
    .table-of-contents a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9rem;
    }
    
    .table-of-contents a:hover {
        text-decoration: underline;
    }
    `;
    
    const tocStyleSheet = document.createElement('style');
    tocStyleSheet.textContent = tocStyles;
    document.head.appendChild(tocStyleSheet);
}