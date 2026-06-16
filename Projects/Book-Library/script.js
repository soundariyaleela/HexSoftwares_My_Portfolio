// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(showLoginScreen, 1000);
    
    // Initialize app
    initApp();
});

// DOM Elements
let currentUser = null;
let books = JSON.parse(localStorage.getItem('booknook_books')) || [];
let selectedRating = 0;
let ratingBookId = null;
let currentPage = 'home';

// Book cover images from Picsum Photos (beautiful placeholder images)
const bookCoverImages = [
    // Beautiful book-related images
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop', // Book stack
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', // Reading person
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w-400&h=600&fit=crop', // Library
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w-400&h=600&fit=crop', // Book and coffee
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop', // Open book
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop', // Bookstore
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop', // Bookshelf
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop', // Reading nook
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop', // Book pages
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop', // Reading glasses
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop', // Library shelves
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop', // Bookmark in book
    'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=600&fit=crop', // Vintage books
    'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop', // Book collection
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop', // Library reading
    'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop', // Open notebook
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop', // Book closeup
    'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=600&fit=crop', // Reading time
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop', // Books and plant
    'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=600&fit=crop'  // Books on table
];

// Category-specific image indices (assign specific images to categories)
const categoryImages = {
    'Fiction': [0, 4, 8, 12, 16],
    'Non-Fiction': [1, 5, 9, 13, 17],
    'Science': [2, 6, 10, 14, 18],
    'Fantasy': [3, 7, 11, 15, 19],
    'Mystery': [0, 4, 8, 12, 16],
    'Biography': [1, 5, 9, 13, 17],
    'Self-Help': [2, 6, 10, 14, 18],
    'Technology': [3, 7, 11, 15, 19],
    'Science Fiction': [0, 4, 8, 12, 16]
};

// Book cover gradients by category (fallback if images don't load)
const categoryGradients = {
    'Fiction': ['#667eea', '#764ba2'],
    'Non-Fiction': ['#f093fb', '#f5576c'],
    'Science': ['#4facfe', '#00f2fe'],
    'Fantasy': ['#43e97b', '#38f9d7'],
    'Mystery': ['#fa709a', '#fee140'],
    'Biography': ['#30cfd0', '#330867'],
    'Self-Help': ['#a8edea', '#fed6e3'],
    'Technology': ['#ffecd2', '#fcb69f'],
    'Science Fiction': ['#ff9a9e', '#fad0c4'],
    'Romance': ['#ff758c', '#ff7eb3']
};

// Book icons by category
const categoryIcons = {
    'Fiction': 'fa-book',
    'Non-Fiction': 'fa-globe',
    'Science': 'fa-flask',
    'Fantasy': 'fa-dragon',
    'Mystery': 'fa-search',
    'Biography': 'fa-user',
    'Self-Help': 'fa-hands-helping',
    'Technology': 'fa-laptop-code',
    'Science Fiction': 'fa-rocket',
    'Romance': 'fa-heart'
};

// Sample books for discover page
const sampleDiscoverBooks = [
    {
        id: 'd1',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        category: 'Science Fiction',
        rating: 4.6,
        reason: 'Best-selling sci-fi adventure about space exploration'
    },
    {
        id: 'd2',
        title: 'The Midnight Library',
        author: 'Matt Haig',
        category: 'Fiction',
        rating: 4.2,
        reason: 'Thought-provoking novel about life choices and regrets'
    },
    {
        id: 'd3',
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'Self-Help',
        rating: 4.7,
        reason: 'Life-changing guide to building good habits'
    },
    {
        id: 'd4',
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        category: 'Non-Fiction',
        rating: 4.5,
        reason: 'Fascinating exploration of human history'
    },
    {
        id: 'd5',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        category: 'Fantasy',
        rating: 4.8,
        reason: 'Classic fantasy adventure that started it all'
    },
    {
        id: 'd6',
        title: 'Educated',
        author: 'Tara Westover',
        category: 'Biography',
        rating: 4.4,
        reason: 'Inspirational memoir about self-education'
    },
    {
        id: 'd7',
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        category: 'Mystery',
        rating: 4.3,
        reason: 'Psychological thriller with shocking twists'
    },
    {
        id: 'd8',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        category: 'Technology',
        rating: 4.6,
        reason: 'Essential reading for software developers'
    }
];

// Get a book cover image based on category and book ID
function getBookCoverImage(category, bookId) {
    // Convert bookId to a number for consistent hashing
    const idNum = Array.from(bookId).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    if (categoryImages[category]) {
        const imageIndices = categoryImages[category];
        const imageIndex = imageIndices[idNum % imageIndices.length];
        return bookCoverImages[imageIndex];
    }
    
    // Fallback to a random image from the main array
    return bookCoverImages[idNum % bookCoverImages.length];
}

// Cache DOM elements
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    loginPage: document.getElementById('loginPage'),
    mainApp: document.getElementById('mainApp'),
    loginForm: document.getElementById('loginForm'),
    signupForm: document.getElementById('signupForm'),
    signupToggle: document.getElementById('signupToggle'),
    signupOverlay: document.getElementById('signupOverlay'),
    closeSignup: document.getElementById('closeSignup'),
    showPassword: document.getElementById('showPassword'),
    bookForm: document.getElementById('book-form'),
    searchBooks: document.getElementById('searchBooks'),
    logoutBtn: document.getElementById('logoutBtn'),
    quickAddBtn: document.getElementById('quickAddBtn'),
    markAllReadBtn: document.getElementById('markAllReadBtn'),
    clearLibraryBtn: document.getElementById('clearLibraryBtn'),
    ratingModal: document.getElementById('ratingModal'),
    cancelRating: document.getElementById('cancelRating'),
    submitRating: document.getElementById('submitRating'),
    bookToRate: document.getElementById('bookToRate'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    heroDescription: document.getElementById('heroDescription'),
    userNameDisplay: document.getElementById('userNameDisplay'),
    totalBooks: document.getElementById('total-books'),
    readingNow: document.getElementById('reading-now'),
    pagesRead: document.getElementById('pages-read'),
    goalProgressFill: document.getElementById('goalProgressFill'),
    goalPercentage: document.getElementById('goalPercentage'),
    goalText: document.getElementById('goalText'),
    fictionCount: document.getElementById('fictionCount'),
    nonFictionCount: document.getElementById('nonFictionCount'),
    scienceCount: document.getElementById('scienceCount'),
    fantasyCount: document.getElementById('fantasyCount'),
    currentlyReading: document.getElementById('currently-reading'),
    recentBooks: document.getElementById('recent-books'),
    recommendations: document.getElementById('recommendations'),
    allBooks: document.getElementById('allBooks'),
    trendingBooks: document.getElementById('trendingBooks'),
    communityBooks: document.getElementById('communityBooks'),
    genreGrid: document.getElementById('genreGrid'),
    genreStats: document.getElementById('genreStats'),
    monthlyStats: document.getElementById('monthlyStats'),
    streakDisplay: document.getElementById('streakDisplay')
};

// Show login screen
function showLoginScreen() {
    elements.loadingScreen.style.display = 'none';
    elements.loginPage.style.display = 'flex';
    
    // Initialize sample books if none exist
    if (books.length === 0) {
        initializeSampleBooks();
    }
}

// Initialize the app
function initApp() {
    // Login form submission
    elements.loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple login validation
        if (email && password) {
            loginUser(email);
        } else {
            showNotification('Please enter email and password', 'danger');
        }
    });
    
    // Signup form submission
    elements.signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'danger');
            return;
        }
        
        if (name && email && password) {
            loginUser(email, name);
            elements.signupOverlay.style.display = 'none';
        }
    });
    
    // Show/hide password
    elements.showPassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('loginPassword');
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    // Show signup form
    elements.signupToggle.addEventListener('click', function(e) {
        e.preventDefault();
        elements.signupOverlay.style.display = 'flex';
    });
    
    // Close signup form
    elements.closeSignup.addEventListener('click', function() {
        elements.signupOverlay.style.display = 'none';
    });
    
    // Social login buttons
    document.getElementById('googleLogin').addEventListener('click', function() {
        showNotification('Google login would be implemented', 'warning');
    });
    
    document.getElementById('githubLogin').addEventListener('click', function() {
        showNotification('GitHub login would be implemented', 'warning');
    });
    
    // Forgot password
    document.getElementById('forgotPassword').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Password reset feature would be implemented', 'warning');
    });
    
    // Initialize main app
    initMainApp();
    
    // Check for saved user
    const savedUser = localStorage.getItem('booknook_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        elements.loginPage.style.display = 'none';
        elements.mainApp.style.display = 'block';
        updateUI();
        showNotification(`Welcome back, ${currentUser.name}!`, 'success');
    }
}

// Initialize main app
function initMainApp() {
    // Book form submission
    elements.bookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addBook();
    });
    
    // Quick add button
    elements.quickAddBtn.addEventListener('click', function() {
        document.getElementById('book-title').focus();
        showNotification('Start adding your book in the sidebar form!', 'info');
    });
    
    // Navigation buttons
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page !== currentPage) {
                navigateToPage(page);
            }
        });
    });
    
    // Logout
    elements.logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
    });
    
    // View all buttons
    document.getElementById('viewAllReading').addEventListener('click', function(e) {
        e.preventDefault();
        navigateToPage('mybooks');
        showNotification('Showing all reading books', 'info');
    });
    
    document.getElementById('viewAllRecent').addEventListener('click', function(e) {
        e.preventDefault();
        navigateToPage('mybooks');
        showNotification('Showing all books', 'info');
    });
    
    // Quick actions
    elements.markAllReadBtn.addEventListener('click', function() {
        if (books.length === 0) {
            showNotification('No books to mark as read', 'warning');
            return;
        }
        
        if (confirm('Mark all books as read?')) {
            books.forEach(book => {
                book.status = 'read';
                if (!book.dateRead) {
                    book.dateRead = new Date().toISOString().split('T')[0];
                }
                book.progress = 100;
            });
            saveBooks();
            updateUI();
            showNotification('All books marked as read!', 'success');
        }
    });
    
    elements.clearLibraryBtn.addEventListener('click', function() {
        if (books.length === 0) {
            showNotification('Library is already empty', 'warning');
            return;
        }
        
        if (confirm('Are you sure you want to clear your entire library? This action cannot be undone.')) {
            books = [];
            saveBooks();
            updateUI();
            showNotification('Library cleared successfully', 'success');
        }
    });
    
    // Search functionality
    elements.searchBooks.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length > 2) {
            const filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(searchTerm) || 
                book.author.toLowerCase().includes(searchTerm) ||
                book.category.toLowerCase().includes(searchTerm)
            );
            
            if (filteredBooks.length > 0) {
                showNotification(`Found ${filteredBooks.length} book${filteredBooks.length > 1 ? 's' : ''} matching "${searchTerm}"`, 'success');
            } else if (searchTerm.length > 0) {
                showNotification(`No books found matching "${searchTerm}"`, 'warning');
            }
        }
    });
    
    // Rating modal
    elements.cancelRating.addEventListener('click', function() {
        closeRatingModal();
    });
    
    elements.submitRating.addEventListener('click', function() {
        if (selectedRating === 0) {
            showNotification('Please select a rating', 'warning');
            return;
        }
        
        if (ratingBookId !== null) {
            const bookIndex = books.findIndex(book => book.id === ratingBookId);
            if (bookIndex !== -1) {
                books[bookIndex].rating = selectedRating;
                saveBooks();
                updateUI();
                showNotification(`Book rated ${selectedRating} star${selectedRating > 1 ? 's' : ''}!`, 'success');
            }
        }
        
        closeRatingModal();
    });
    
    // Initialize rating stars
    initRatingStars();
    
    // My Books page filters
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            updateMyBooks(filter);
        });
    });
    
    // Sort books
    document.getElementById('sortBooks').addEventListener('change', function() {
        updateMyBooks();
    });
    
    // Export button
    document.getElementById('exportBtn').addEventListener('click', function() {
        showNotification('Export feature would be implemented', 'warning');
    });
    
    // Subscribe button
    document.getElementById('subscribeBtn').addEventListener('click', function() {
        const email = document.getElementById('newsletterEmail').value;
        if (email) {
            showNotification('Subscribed to newsletter!', 'success');
            document.getElementById('newsletterEmail').value = '';
        } else {
            showNotification('Please enter your email', 'warning');
        }
    });
    
    // Add current reading button
    document.addEventListener('click', function(e) {
        if (e.target.id === 'addCurrentReadingBtn' || e.target.closest('#addCurrentReadingBtn')) {
            document.getElementById('book-title').focus();
            document.getElementById('book-status').value = 'reading';
            showNotification('Start adding your book in the sidebar form!', 'info');
        }
    });
}

// Navigate to page
function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    const pageElement = document.getElementById(page + 'Page');
    if (pageElement) {
        pageElement.style.display = 'block';
        pageElement.classList.add('active');
        pageElement.classList.add('page-transition');
        
        // Update navigation
        const navLink = document.querySelector(`[data-page="${page}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }
        
        currentPage = page;
        
        // Update page content
        switch(page) {
            case 'home':
                updateUI();
                break;
            case 'mybooks':
                updateMyBooks();
                break;
            case 'discover':
                updateDiscoverPage();
                break;
            case 'stats':
                updateStatsPage();
                break;
        }
        
        showNotification(`${page.charAt(0).toUpperCase() + page.slice(1)} page loaded`, 'info');
    }
}

// Initialize rating stars
function initRatingStars() {
    const ratingStars = document.querySelectorAll('.rating-stars-select i');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            selectRating(rating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });
    
    document.querySelector('.rating-stars-select').addEventListener('mouseleave', function() {
        highlightStars(selectedRating);
    });
}

// Login user
function loginUser(email, name = null) {
    currentUser = {
        email: email,
        name: name || email.split('@')[0]
    };
    
    localStorage.setItem('booknook_user', JSON.stringify(currentUser));
    
    // Show main app
    elements.loginPage.style.display = 'none';
    elements.mainApp.style.display = 'block';
    
    // Update UI with user data
    updateUI();
    
    showNotification(`Welcome back, ${currentUser.name}!`, 'success');
}

// Logout user
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('booknook_user');
        
        elements.mainApp.style.display = 'none';
        elements.loginPage.style.display = 'flex';
        
        // Reset login form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        
        showNotification('Logged out successfully', 'success');
    }
}

// Add a new book
function addBook() {
    const title = document.getElementById('book-title').value.trim();
    const author = document.getElementById('book-author').value.trim();
    const pages = parseInt(document.getElementById('book-pages').value);
    const category = document.getElementById('book-category').value;
    const status = document.getElementById('book-status').value;
    
    if (!title || !author || !pages || pages < 1) {
        showNotification('Please fill in all fields correctly', 'danger');
        return;
    }
    
    const newBook = {
        id: Date.now().toString(),
        title: title,
        author: author,
        pages: pages,
        category: category,
        status: status,
        rating: 0,
        dateAdded: new Date().toISOString().split('T')[0],
        dateRead: status === 'read' ? new Date().toISOString().split('T')[0] : null,
        progress: status === 'reading' ? Math.floor(Math.random() * 70) + 10 : 100
    };
    
    books.unshift(newBook);
    saveBooks();
    updateUI();
    
    // Reset form
    elements.bookForm.reset();
    document.getElementById('book-status').value = 'reading';
    
    showNotification(`"${title}" added to your library!`, 'success');
}

// Save books to localStorage
function saveBooks() {
    localStorage.setItem('booknook_books', JSON.stringify(books));
}

// Update UI with current data
function updateUI() {
    // Update welcome message
    if (currentUser) {
        const displayName = currentUser.name || 'Reader';
        elements.welcomeMessage.textContent = `Hello, ${displayName}!`;
        elements.userNameDisplay.textContent = displayName;
        
        const bookCount = books.length;
        elements.heroDescription.textContent = bookCount === 0 
            ? 'Start your reading journey today.' 
            : `You have ${bookCount} book${bookCount !== 1 ? 's' : ''} in your library.`;
    }
    
    // Update stats
    updateStats();
    
    // Update book categories
    updateCategoryCounts();
    
    // Update currently reading
    updateCurrentlyReading();
    
    // Update recent books
    updateRecentBooks();
    
    // Update recommendations
    updateRecommendations();
    
    // Update reading goal
    updateReadingGoal();
}

// Update statistics
function updateStats() {
    const totalBooks = books.length;
    const readingNow = books.filter(book => book.status === 'reading').length;
    const pagesRead = books
        .filter(book => book.status === 'read')
        .reduce((total, book) => total + (book.pages || 0), 0);
    
    elements.totalBooks.textContent = totalBooks;
    elements.readingNow.textContent = readingNow;
    elements.pagesRead.textContent = pagesRead;
}

// Update category counts
function updateCategoryCounts() {
    const categories = [
        { id: 'fictionCount', name: 'Fiction' },
        { id: 'nonFictionCount', name: 'Non-Fiction' },
        { id: 'scienceCount', name: 'Science' },
        { id: 'fantasyCount', name: 'Fantasy' }
    ];
    
    categories.forEach(cat => {
        const count = books.filter(book => book.category === cat.name).length;
        const element = document.getElementById(cat.id);
        
        if (element) {
            element.textContent = `${count} book${count !== 1 ? 's' : ''}`;
        }
    });
}

// Update currently reading section
function updateCurrentlyReading() {
    const currentlyReadingBooks = books.filter(book => book.status === 'reading');
    const container = elements.currentlyReading;
    
    container.innerHTML = '';
    
    if (currentlyReadingBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <p>You're not currently reading any books</p>
                <button class="btn-add" id="addCurrentReadingBtn">
                    <i class="fas fa-plus"></i> Add a book
                </button>
            </div>
        `;
        return;
    }
    
    currentlyReadingBooks.forEach(book => {
        const progress = book.progress || 0;
        const gradient = categoryGradients[book.category] || categoryGradients['Fiction'];
        const icon = categoryIcons[book.category] || 'fa-book';
        const bookImage = getBookCoverImage(book.category, book.id);
        
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card-carousel';
        bookCard.innerHTML = `
            <div class="book-cover" style="background: linear-gradient(45deg, ${gradient[0]}, ${gradient[1]}); position: relative; height: 250px;">
                <img src="${bookImage}" alt="${book.title}" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="book-overlay">
                    <button class="btn-quick-action mark-read" data-id="${book.id}" title="Mark as Read">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-quick-action rate-book" data-id="${book.id}" title="Rate Book">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="btn-quick-action remove-book" data-id="${book.id}" title="Remove Book">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="current-reading-progress">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="progress-bar-small">
                        <div class="progress-fill-small" style="width: ${progress}%"></div>
                    </div>
                </div>
                <div class="book-meta">
                    <span class="book-pages">${book.pages} pages</span>
                    <span class="book-status status-reading">Reading</span>
                </div>
                <div class="rating" data-id="${book.id}">
                    ${generateStarRating(book.rating)}
                </div>
            </div>
        `;
        
        container.appendChild(bookCard);
    });
    
    // Add event listeners
    attachBookEventListeners();
}

// Update recent books
function updateRecentBooks() {
    const recentBooksList = books.slice(0, 6); // Show 6 most recent books
    const container = elements.recentBooks;
    
    container.innerHTML = '';
    
    if (recentBooksList.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <p>No books in your library yet</p>
                <p>Start by adding your first book!</p>
            </div>
        `;
        return;
    }
    
    recentBooksList.forEach(book => {
        const statusClass = `status-${book.status}`;
        const statusText = book.status === 'reading' ? 'Reading' : 
                          book.status === 'want' ? 'Want to Read' : 'Read';
        const gradient = categoryGradients[book.category] || categoryGradients['Fiction'];
        const icon = categoryIcons[book.category] || 'fa-book';
        const bookImage = getBookCoverImage(book.category, book.id);
        
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card-grid';
        bookCard.innerHTML = `
                <img src="${bookImage}" alt="${book.title}" style="width: 100%; height: 220px; object-fit: cover;">
            </div>   
                <div class="book-category-badge">${book.category}</div>
                <div class="book-date-badge">${formatDate(book.dateAdded)}</div>
            
            <div class="book-grid-info">
                <h3 class="book-grid-title">${book.title}</h3>
                <p class="book-grid-author">${book.author}</p>
                <div class="book-grid-meta">
                    <span class="book-grid-pages">
                        <i class="fas fa-file-alt"></i> ${book.pages}
                    </span>
                    <span class="book-grid-status ${statusClass}">${statusText}</span>
                </div>
                <div class="book-grid-rating" data-id="${book.id}">
                    ${generateStarRating(book.rating)}
                                    <button class="btn-quick-action remove-book" data-id="${book.id}" title="Remove Book">
                                            <i class="fas fa-trash"></i>
                                    </button>
                </div>
                
            </div>
        `;
        
        container.appendChild(bookCard);
    });
    
    // Add event listeners
    attachBookEventListeners();
}

// Update recommendations
function updateRecommendations() {
    const container = elements.recommendations;
    
    // Filter out books already in library
    const sampleBooks = sampleDiscoverBooks.filter(rec => 
        !books.some(book => book.title === rec.title && book.author === rec.author)
    ).slice(0, 3);
    
    container.innerHTML = '';
    
    if (sampleBooks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-lightbulb"></i>
                <p>Add more books to get personalized recommendations</p>
            </div>
        `;
        return;
    }
    
    sampleBooks.forEach(rec => {
        const gradient = categoryGradients[rec.category] || categoryGradients['Fiction'];
        const bookImage = getBookCoverImage(rec.category, rec.id);
        
        const recCard = document.createElement('div');
        recCard.className = 'recommendation-card';
        recCard.innerHTML = `
            <div class="recommendation-cover">
                <img src="${bookImage}" alt="${rec.title}" style="width: 120px; height: 180px; object-fit: cover; border-radius: 12px;">
                <div class="recommendation-badge">Recommended</div>
            </div>
            <div class="recommendation-info">
                <h4>${rec.title}</h4>
                <p class="recommendation-author">${rec.author}</p>
                <div class="recommendation-rating">
                    ${generateStarRating(rec.rating)}
                    <span>${rec.rating}</span>
                </div>
                <p class="recommendation-reason">${rec.reason}</p>
                <button class="btn-add-to-library" data-id="${rec.id}">
                    <i class="fas fa-plus"></i> Add to Library
                </button>
            </div>
        `;
        
        container.appendChild(recCard);
    });
    
    // Add event listeners to recommendation buttons
    container.querySelectorAll('.btn-add-to-library').forEach(button => {
        button.addEventListener('click', function() {
            const recId = this.getAttribute('data-id');
            const rec = sampleDiscoverBooks.find(r => r.id === recId);
            
            if (rec) {
                // Check if book already exists
                if (books.some(book => book.title === rec.title && book.author === rec.author)) {
                    showNotification('This book is already in your library', 'warning');
                    return;
                }
                
                // Add the recommended book to library
                const newBook = {
                    id: Date.now().toString(),
                    title: rec.title,
                    author: rec.author,
                    pages: Math.floor(Math.random() * 300) + 200,
                    category: rec.category,
                    status: 'want',
                    rating: 0,
                    dateAdded: new Date().toISOString().split('T')[0]
                };
                
                books.unshift(newBook);
                saveBooks();
                updateUI();
                
                showNotification(`"${rec.title}" added to your library!`, 'success');
            }
        });
    });
}

// Update reading goal
function updateReadingGoal() {
    const booksRead = books.filter(book => book.status === 'read').length;
    const goal = 20; // 20 books per year
    const percentage = Math.min(Math.round((booksRead / goal) * 100), 100);
    
    elements.goalProgressFill.style.width = `${percentage}%`;
    elements.goalPercentage.textContent = `${percentage}% Complete`;
    elements.goalText.textContent = `${booksRead} of ${goal} books this year`;
}

// Update My Books page
function updateMyBooks(filter = 'all') {
    let filteredBooks = [...books];
    
    // Apply filter
    if (filter !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.status === filter);
    }
    
    // Apply sorting
    const sortBy = document.getElementById('sortBooks').value;
    filteredBooks.sort((a, b) => {
        switch(sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'author':
                return a.author.localeCompare(b.author);
            case 'rating':
                return b.rating - a.rating;
            case 'date':
            default:
                return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
    });
    
    const container = elements.allBooks;
    container.innerHTML = '';
    
    if (filteredBooks.length === 0) {
        const message = filter === 'all' ? 'No books in your library' : 
                       `No books marked as ${filter}`;
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <p>${message}</p>
                ${filter !== 'all' ? '<button class="btn-add" id="addBookBtn"><i class="fas fa-plus"></i> Add a book</button>' : ''}
            </div>
        `;
        
        if (filter !== 'all') {
            document.getElementById('addBookBtn').addEventListener('click', function() {
                navigateToPage('home');
            });
        }
        return;
    }
    
    filteredBooks.forEach(book => {
        const statusClass = `status-${book.status}`;
        const statusText = book.status === 'reading' ? 'Reading' : 
                          book.status === 'want' ? 'Want to Read' : 'Read';
        const gradient = categoryGradients[book.category] || categoryGradients['Fiction'];
        const bookImage = getBookCoverImage(book.category, book.id);
        
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card-large';
        bookCard.innerHTML = `
            <div class="book-cover-large-grid">
                <img src="${bookImage}" alt="${book.title}" style="width: 100%; height: 300px; object-fit: cover;">
                <div class="book-actions">
                    <button class="book-action-btn rate-book" data-id="${book.id}" title="Rate Book">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="book-action-btn ${book.status === 'read' ? 'mark-reading' : 'mark-read'}" data-id="${book.id}" title="${book.status === 'read' ? 'Mark as Reading' : 'Mark as Read'}">
                        <i class="fas ${book.status === 'read' ? 'fa-book-open' : 'fa-check'}"></i>
                    </button>
                    <button class="book-action-btn remove-book" data-id="${book.id}" title="Remove Book">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="book-info-large-grid">
                <h3 class="book-title-large">${book.title}</h3>
                <p class="book-author-large">${book.author}</p>
                <div class="book-meta-large">
                    <span class="book-pages-large">
                        <i class="fas fa-file-alt"></i> ${book.pages} pages
                    </span>
                    <span class="book-status-large ${statusClass}">${statusText}</span>
                </div>
                <div class="rating" data-id="${book.id}">
                    ${generateStarRating(book.rating)}
                </div>
                <div class="book-details">
                    <p><i class="fas fa-tag"></i> ${book.category}</p>
                    <p><i class="fas fa-calendar"></i> Added: ${formatDate(book.dateAdded)}</p>
                    ${book.dateRead ? `<p><i class="fas fa-check-circle"></i> Finished: ${formatDate(book.dateRead)}</p>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(bookCard);
    });
    
    // Add event listeners
    attachBookEventListeners();
}

// Update Discover page
function updateDiscoverPage() {
    // Update trending books
    updateTrendingBooks();
    
    // Update community books
    updateCommunityBooks();
    
    // Update genre grid
    updateGenreGrid();
}

// Update trending books
function updateTrendingBooks() {
    const container = elements.trendingBooks;
    container.innerHTML = '';
    
    sampleDiscoverBooks.slice(0, 4).forEach(book => {
        const gradient = categoryGradients[book.category] || categoryGradients['Fiction'];
        const bookImage = getBookCoverImage(book.category, book.id);
        
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card-grid';
        bookCard.innerHTML = `
            <div class="book-cover-grid">
                <img src="${bookImage}" alt="${book.title}" style="width: 100%; height: 220px; object-fit: cover;">
                <div class="book-grid-overlay">
                    <button class="btn-grid-action add-to-library-discover" data-id="${book.id}" title="Add to Library">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="book-category-badge">Trending</div>
            </div>
            <div class="book-grid-info">
                <h3 class="book-grid-title">${book.title}</h3>
                <p class="book-grid-author">${book.author}</p>
                <div class="book-grid-rating">
                    ${generateStarRating(book.rating)}
                    <span>${book.rating}</span>
                </div>
            </div>
        `;
        
        container.appendChild(bookCard);
    });
    
    // Add event listeners
    container.querySelectorAll('.add-to-library-discover').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            const book = sampleDiscoverBooks.find(b => b.id === bookId);
            
            if (book) {
                // Check if book already exists
                if (books.some(b => b.title === book.title && b.author === book.author)) {
                    showNotification('This book is already in your library', 'warning');
                    return;
                }
                
                // Add book to library
                const newBook = {
                    id: Date.now().toString(),
                    title: book.title,
                    author: book.author,
                    pages: Math.floor(Math.random() * 300) + 200,
                    category: book.category,
                    status: 'want',
                    rating: 0,
                    dateAdded: new Date().toISOString().split('T')[0]
                };
                
                books.unshift(newBook);
                saveBooks();
                updateUI();
                
                showNotification(`"${book.title}" added to your library!`, 'success');
            }
        });
    });
}

// Update community books
function updateCommunityBooks() {
    const container = elements.communityBooks;
    container.innerHTML = '';
    
    sampleDiscoverBooks.slice(2, 6).forEach(book => {
        const gradient = categoryGradients[book.category] || categoryGradients['Fiction'];
        const bookImage = getBookCoverImage(book.category, book.id);
        
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card-grid';
        bookCard.innerHTML = `
            <div class="book-cover-grid">
                <img src="${bookImage}" alt="${book.title}" style="width: 100%; height: 220px; object-fit: cover;">
                <div class="book-grid-overlay">
                    <button class="btn-grid-action add-to-library-discover" data-id="${book.id}" title="Add to Library">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="book-category-badge">Popular</div>
            </div>
            <div class="book-grid-info">
                <h3 class="book-grid-title">${book.title}</h3>
                <p class="book-grid-author">${book.author}</p>
                <div class="book-grid-rating">
                    ${generateStarRating(book.rating)}
                    <span>${book.rating}</span>
                </div>
            </div>
        `;
        
        container.appendChild(bookCard);
    });
    
    // Add event listeners (same as trending books)
    container.querySelectorAll('.add-to-library-discover').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            const book = sampleDiscoverBooks.find(b => b.id === bookId);
            
            if (book) {
                if (books.some(b => b.title === book.title && b.author === book.author)) {
                    showNotification('This book is already in your library', 'warning');
                    return;
                }
                
                const newBook = {
                    id: Date.now().toString(),
                    title: book.title,
                    author: book.author,
                    pages: Math.floor(Math.random() * 300) + 200,
                    category: book.category,
                    status: 'want',
                    rating: 0,
                    dateAdded: new Date().toISOString().split('T')[0]
                };
                
                books.unshift(newBook);
                saveBooks();
                updateUI();
                
                showNotification(`"${book.title}" added to your library!`, 'success');
            }
        });
    });
}

// Update genre grid
function updateGenreGrid() {
    const container = elements.genreGrid;
    container.innerHTML = '';
    
    const genres = [
        { name: 'Fiction', icon: 'fa-book' },
        { name: 'Non-Fiction', icon: 'fa-globe' },
        { name: 'Science', icon: 'fa-flask' },
        { name: 'Fantasy', icon: 'fa-dragon' },
        { name: 'Mystery', icon: 'fa-search' },
        { name: 'Biography', icon: 'fa-user' },
        { name: 'Self-Help', icon: 'fa-hands-helping' },
        { name: 'Technology', icon: 'fa-laptop-code' }
    ];
    
    genres.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.className = 'genre-card';
        genreCard.innerHTML = `
            <i class="fas ${genre.icon}"></i>
            <h4>${genre.name}</h4>
            <p>Browse books</p>
        `;
        
        genreCard.addEventListener('click', function() {
            navigateToPage('mybooks');
            showNotification(`Showing ${genre.name} books`, 'info');
        });
        
        container.appendChild(genreCard);
    });
}

// Update Stats page
function updateStatsPage() {
    // Update genre stats
    updateGenreStats();
    
    // Update monthly stats
    updateMonthlyStats();
    
    // Update streak
    updateStreak();
}

// Update genre stats
function updateGenreStats() {
    const container = elements.genreStats;
    container.innerHTML = '';
    
    // Count books by category
    const genreCounts = {};
    books.forEach(book => {
        genreCounts[book.category] = (genreCounts[book.category] || 0) + 1;
    });
    
    // Sort by count
    const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (sortedGenres.length === 0) {
        container.innerHTML = '<p class="empty">No reading data yet</p>';
        return;
    }
    
    sortedGenres.forEach(([genre, count]) => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <span class="stat-label">${genre}</span>
            <span class="stat-value">${count} book${count !== 1 ? 's' : ''}</span>
            <div class="stat-bar">
                <div class="stat-bar-fill" style="width: ${(count / Math.max(...Object.values(genreCounts))) * 100}%"></div>
            </div>
        `;
        container.appendChild(statItem);
    });
}

// Update monthly stats
function updateMonthlyStats() {
    const container = elements.monthlyStats;
    container.innerHTML = '';
    
    // Calculate books read per month (simulated)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyData = months.map(month => ({
        month,
        books: Math.floor(Math.random() * 5) + 1
    }));
    
    monthlyData.forEach(data => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <span class="stat-label">${data.month}</span>
            <span class="stat-value">${data.books}</span>
            <div class="stat-bar">
                <div class="stat-bar-fill" style="width: ${(data.books / 5) * 100}%"></div>
            </div>
        `;
        container.appendChild(statItem);
    });
}

// Update streak
function updateStreak() {
    const container = elements.streakDisplay;
    const streak = Math.floor(Math.random() * 30) + 1; // Random streak for demo
    
    container.querySelector('.streak-number').textContent = streak;
}

// Attach event listeners to book actions
function attachBookEventListeners() {
    // Mark as read buttons
    document.querySelectorAll('.mark-read, .mark-reading').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            const isCurrentlyReading = this.classList.contains('mark-reading');
            
            if (isCurrentlyReading) {
                markBookAsReading(bookId);
            } else {
                markBookAsRead(bookId);
            }
        });
    });
    
    // Remove book buttons
    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            removeBook(bookId);
        });
    });
    
    // Rate book buttons
    document.querySelectorAll('.rate-book, .rating, .book-grid-rating').forEach(element => {
        element.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            openRatingModal(bookId);
        });
    });
}

// Mark book as read
function markBookAsRead(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
        const bookTitle = books[bookIndex].title;
        
        if (confirm(`Mark "${bookTitle}" as read?`)) {
            books[bookIndex].status = 'read';
            books[bookIndex].dateRead = new Date().toISOString().split('T')[0];
            books[bookIndex].progress = 100;
            saveBooks();
            updateUI();
            if (currentPage === 'mybooks') updateMyBooks();
            showNotification('Book marked as read!', 'success');
        }
    }
}

// Mark book as reading
function markBookAsReading(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
        const bookTitle = books[bookIndex].title;
        
        if (confirm(`Mark "${bookTitle}" as currently reading?`)) {
            books[bookIndex].status = 'reading';
            books[bookIndex].progress = Math.floor(Math.random() * 70) + 10;
            saveBooks();
            updateUI();
            if (currentPage === 'mybooks') updateMyBooks();
            showNotification('Book marked as currently reading!', 'success');
        }
    }
}

// Remove book from library
function removeBook(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
        const bookTitle = books[bookIndex].title;
        
        if (confirm(`Remove "${bookTitle}" from your library?`)) {
            books.splice(bookIndex, 1);
            saveBooks();
            updateUI();
            if (currentPage === 'mybooks') updateMyBooks();
            showNotification('Book removed from library', 'success');
        }
    }
}

// Open rating modal
function openRatingModal(bookId) {
    const book = books.find(b => b.id === bookId);
    
    if (book) {
        ratingBookId = bookId;
        selectedRating = book.rating || 0;
        elements.bookToRate.textContent = `How would you rate "${book.title}"?`;
        
        // Highlight current rating
        highlightStars(selectedRating);
        
        elements.ratingModal.style.display = 'flex';
    }
}

// Close rating modal
function closeRatingModal() {
    elements.ratingModal.style.display = 'none';
    ratingBookId = null;
    selectedRating = 0;
}

// Select rating
function selectRating(rating) {
    selectedRating = rating;
    highlightStars(rating);
}

// Highlight stars
function highlightStars(rating) {
    const ratingStars = document.querySelectorAll('.rating-stars-select i');
    
    ratingStars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
        return 'Recently';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
    
    // Close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
}

// Initialize sample books
function initializeSampleBooks() {
    const sampleBooks = [
        {
            id: '1',
            title: 'The Silent Patient',
            author: 'Alex Michaelides',
            pages: 325,
            category: 'Mystery',
            status: 'read',
            rating: 4.5,
            dateAdded: '2024-01-15',
            dateRead: '2024-01-20'
        },
        {
            id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            pages: 320,
            category: 'Self-Help',
            status: 'reading',
            rating: 4.8,
            dateAdded: '2024-02-10',
            progress: 65
        },
        {
            id: '3',
            title: 'Project Hail Mary',
            author: 'Andy Weir',
            pages: 476,
            category: 'Science Fiction',
            status: 'want',
            rating: 0,
            dateAdded: '2024-02-05'
        },
        {
            id: '4',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            pages: 304,
            category: 'Fiction',
            status: 'read',
            rating: 4.2,
            dateAdded: '2024-01-25',
            dateRead: '2024-02-01'
        },
        {
            id: '5',
            title: 'Sapiens: A Brief History of Humankind',
            author: 'Yuval Noah Harari',
            pages: 443,
            category: 'Non-Fiction',
            status: 'reading',
            rating: 4.7,
            dateAdded: '2024-02-12',
            progress: 40
        },
        {
            id: '6',
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            pages: 310,
            category: 'Fantasy',
            status: 'read',
            rating: 4.9,
            dateAdded: '2024-01-30',
            dateRead: '2024-02-05'
        }
    ];
    
    books = sampleBooks;
    saveBooks();
}
