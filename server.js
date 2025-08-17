// const express = require('express');
// const app = express();
// const path = require('path');


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// app.use(express.static(path.join(__dirname, 'public')));

// // Homepage route
// app.get('/', (req, res) => {
//     res.render('index');
// });

// // Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'myora-secret',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');


const categories = [
  { 
    name: "Electronics", 
    products: [
      {id: "smartphone", name: "Smartphone", image: "https://www.jiomart.com/images/product/original/493839355/apple-iphone-15-pro-max-256-gb-black-titanium-digital-o493839355-p604576516-0-202309141710.jpeg?im=Resize=(420,420)", price: 15000, discount: 10 },
      {id: "headphones", name: "Headphones", image: "https://cdn.shopify.com/s/files/1/0548/8849/7221/files/Flex_4a400d3e-607f-4b03-8109-833f118a1c18.jpg?v=1753965659", price: 2000, discount: 20 },
      {id: "laptop", name: "Laptop", image: "https://www.cnet.com/a/img/resize/bb8a2aa9c31f8ec08d82228a51eabf05f00e54d2/hub/2025/03/10/d190e21d-9634-440d-8f33-396c8cb3da6a/m4-macbook-air-15-11.jpg?auto=webp&height=500", price: 55000, discount: 15 },
      { name: "Smartwatch", image: "https://rukminim2.flixcart.com/image/260/260/xif0q/smartwatch/l/7/8/-original-imahauh2xtkdjmma.jpeg?q=90&crop=false", price: 4000, discount: 18 },
      { name: "Camera", image: "https://www.picturecorrect.com/wp-content/uploads/2016/05/dslr-camera-features.jpg", price: 30000, discount: 12 }
    ]
  },
  { 
    name: "Fashion", 
    products: [
      {id: "tshirt", name: "T-shirt", image: "https://thehouseofrare.com/cdn/shop/files/gis-mens-solid-t-shirt-black27624_91fbdead-2d6e-4b23-a5b6-596ddf9ce756.jpg?v=1747223789", price: 500, discount: 25 },
      {id: "jeans", name: "Jeans", image: "https://m.media-amazon.com/images/I/91E69wClQ4L._UY1100_.jpg", price: 1200, discount: 30 },
      {id: "sneakers", name: "Sneakers", image: "https://m.media-amazon.com/images/I/41iWFl52nuL._SR290,290_.jpg", price: 2500, discount: 20 },
      { name: "Jacket", image: "https://static.wixstatic.com/media/464bd7_576d9ec265c2424c99d61fa8040c3a31~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/464bd7_576d9ec265c2424c99d61fa8040c3a31~mv2.jpg", price: 3500, discount: 15 },
      { name: "Handbag", image: "https://www.remelifestyle.in/wp-content/uploads/2019/07/designer-handbag.jpg", price: 2000, discount: 22 }
    ]
  },
  { 
    name: "Home Appliances", 
    products: [
      {id: "referigerator", name: "Refrigerator", image: "https://media.istockphoto.com/id/1399160717/photo/refrigerator-standing-in-empty-room-free-copy-space-for-text-or-other-objects-household.jpg?s=612x612&w=0&k=20&c=U9H5GlhjPKbCuNRaOpO1T2H3vbnexjonA2RR-FSf_84=", price: 40000, discount: 18 },
      {id: "washingmachine", name: "Washing Machine", image: "https://cdn.thewirecutter.com/wp-content/media/2024/01/washerdryers-2048px-GTW585BSVWS1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200", price: 25000, discount: 20 },
      {id: "microwave", name: "Microwave Oven", image: "https://img.freepik.com/premium-photo/microwave-oven-kitchen-uhd-8k-generative-ai_849906-8713.jpg", price: 12000, discount: 15 },
      { name: "Air Conditioner", image: "https://img.freepik.com/premium-photo/air-conditioner-design-hd-8k-wallpaper-stock-photographic-image_890746-39745.jpg", price: 35000, discount: 10 },
      { name: "Vacuum Cleaner", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfePUae9tA1QzFto0b9JEmJCHkyIuJbU08A&s", price: 8000, discount: 25 }
    ]
  }
];

// Helper function to read users.json
function readUsers() {
    return JSON.parse(fs.readFileSync('users.json', 'utf8'));
}

// Helper function to save users.json
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

app.get("/product/:id", (req, res) => {
  const productId = req.params.id; // e.g. "headphones"
  res.render(`products/${productId}`); 
});


// Home page
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

app.get("/productList", (req, res) => {
  res.render("productList", { categories });
});


app.get("/headphones", (req, res) => {
  res.render("products/headphones"); 
});

app.get("/smartphone", (req, res) => {
  res.render("products/smartphone"); 
});

app.get("/laptop", (req, res) => {
  res.render("products/laptop"); 
});

app.get("/tshirt", (req, res) => {
  res.render("products/tshirt"); 
});

app.get("/jeans", (req, res) => {
  res.render("products/jeans"); 
});

app.get("/sneakers", (req, res) => {
  res.render("products/sneakers"); 
});

app.get("/refrigerator", (req, res) => {
  res.render("products/refrigerator"); 
});

app.get("/washingmachine", (req, res) => {
  res.render("products/washingmachine"); 
});

app.get("/microwave", (req, res) => {
  res.render("products/microwave"); 
});


app.get("/aboutus", (req, res) => {
    res.render("aboutus", {
        user: req.user, // or null if not logged in
        title: "About Us - Myora",
        aboutPoints: [
            "💡 Welcome to Myora, where innovation meets excellence. We're passionate about delivering high-quality products that enhance your lifestyle.",
            "🤝 Our commitment to customer satisfaction drives everything we do.",
            "🚀 Founded with a vision to revolutionize online shopping, we've grown into a trusted destination for discerning customers.",
            "✨ At Myora, you’ll find quality, style, and convenience all in one place."
        ],
        infoBoxes: [
            { title: "Innovation", text: "We constantly push boundaries to bring creative and modern solutions for our customers." },
            { title: "Quality", text: "Every product is carefully curated for premium quality and long-lasting durability." },
            { title: "Fast Service", text: "Our efficient logistics and support team ensure quick deliveries and seamless experience." },
            { title: "Customer", text: "We believe our customers are family, and their happiness is our top priority." },
            { title: "Sustainability", text: "We care about the planet, and our eco-friendly practices aim to reduce our carbon footprint." },
            { title: "Trust", text: "Thousands of happy customers trust Myora for reliability, safety, and great experiences." }
        ],
        policies: [
            { title: "Exchange Policy", text: "We offer a hassle-free 30-day exchange.", points: ["30-day exchange window", "Original packaging required", "Free exchange shipping"] },
            { title: "Return Policy", text: "Full refunds within 14 days of purchase.", points: ["14-day return window", "Money-back guarantee", "Easy return process"] }
        ]
    });
});


// Login page
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Login POST
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        req.session.user = user;
        return res.redirect('/');
    } else {
        return res.render('login', { error: 'Invalid email or password' });
    }
});

// Register page
app.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Register POST
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const users = readUsers();

    if (users.find(u => u.email === email)) {
        return res.render('register', { error: 'Email already registered' });
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    req.session.user = newUser;
    res.redirect('/');
});

// Profile page
app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('profile', { user: req.session.user });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
