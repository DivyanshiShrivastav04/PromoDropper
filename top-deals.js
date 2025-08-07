// Page-specific styles for top deals
const pageStyles = `
.page-header {
    padding: 120px 0 60px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.page-header__content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.page-header__title {
    font-size: 3rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
}

.page-header__description {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 2rem;
}

.deals-filter {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.filter-group label {
    font-weight: 500;
    color: #374151;
    white-space: nowrap;
}

.filter-select {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    font-size: 14px;
    color: #374151;
    min-width: 150px;
}

.filter-select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

@media (max-width: 768px) {
    .page-header__title {
        font-size: 2.5rem;
    }
    
    .deals-filter {
        flex-direction: column;
        gap: 1rem;
    }
    
    .filter-group {
        justify-content: space-between;
        width: 100%;
    }
    
    .filter-select {
        min-width: 200px;
    }
}
`;

// Add page-specific styles
const style = document.createElement('style');
style.textContent = pageStyles;
document.head.appendChild(style);

// Filter functionality
const sortSelect = document.getElementById('sort-select');
const categorySelect = document.getElementById('category-select');
const dealCards = document.querySelectorAll('.deal__card');
const loadMoreBtn = document.getElementById('load-more');

// Sort functionality
sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    const dealsGrid = document.querySelector('.deals__grid');
    const cards = Array.from(dealCards);
    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'savings':
                const savingsA = parseInt(a.querySelector('.deal__savings').textContent.match(/\d+/)[0]);
                const savingsB = parseInt(b.querySelector('.deal__savings').textContent.match(/\d+/)[0]);
                return savingsB - savingsA;
            case 'expiring':
                const expiryA = new Date(a.querySelector('.deal__timer').dataset.expires);
                const expiryB = new Date(b.querySelector('.deal__timer').dataset.expires);
                return expiryA - expiryB;
            case 'popular':
                // Simulate popularity - in real app, this would be based on actual data
                return Math.random() - 0.5;
            case 'newest':
            default:
                return Math.random() - 0.5; // Random for demo
        }
    });
    
    // Re-append sorted cards
    cards.forEach(card => dealsGrid.appendChild(card));
});

// Category filter functionality
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    
    dealCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
});

// Load more functionality
let visibleDeals = 6;
const totalDeals = dealCards.length;

// Initially show only first 6 deals
function showDeals(count) {
    dealCards.forEach((card, index) => {
        if (index < count) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    if (count >= totalDeals) {
        loadMoreBtn.style.display = 'none';
    }
}

// Load more button handler
loadMoreBtn.addEventListener('click', () => {
    visibleDeals += 3; // Load 3 more deals
    showDeals(visibleDeals);
    
    if (visibleDeals >= totalDeals) {
        loadMoreBtn.textContent = 'All Deals Loaded';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.6';
    }
});

// Initialize with first 6 deals visible
showDeals(visibleDeals);

// Add smooth animations
dealCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        if (index < visibleDeals) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    }, index * 100);
});