# VivPod Domains - Premium Domain Marketplace

A Jekyll-based domain marketplace website inspired by HugeDomains, designed for selling premium domain names.

## 🚀 Features

- **Search Functionality**: Real-time domain search with filtering
- **Domain Cards**: Beautiful grid layout showcasing available domains
- **Individual Domain Pages**: Dedicated pages for each domain with detailed information
- **Make Offer Form**: Allow potential buyers to submit offers
- **Buy Now Integration**: Direct purchase via Escrow.com
- **Responsive Design**: Mobile-friendly layout
- **SEO Optimized**: Built-in SEO tags and meta descriptions

## 📁 Project Structure

```
vivpod-marketplace/
├── _config.yml           # Jekyll configuration
├── _data/
│   └── domains.yml       # Domain data for homepage cards
├── _domains/             # Individual domain pages (Markdown)
│   ├── techvault.md
│   ├── greenshift.md
│   └── ...
├── _layouts/
│   ├── default.html      # Base layout
│   └── domain.html       # Domain page layout
├── _includes/
│   ├── header.html       # Site header
│   └── footer.html       # Site footer
├── assets/
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   └── js/
│       ├── search.js     # Search functionality
│       ├── forms.js      # Form handling & Escrow integration
│       └── main.js       # General JavaScript
├── index.html            # Homepage
├── about.md              # About page
└── contact.md            # Contact page
```

## 🛠️ Setup & Installation

### Prerequisites

- Ruby 3.0+
- Bundler
- Jekyll 4.4+

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Alex11832/vivpod-marketplace.git
cd vivpod-marketplace
```

2. Install dependencies:
```bash
bundle install
```

3. Run the development server:
```bash
bundle exec jekyll serve
```

4. Open your browser and navigate to `http://localhost:4000`

## 📝 Adding New Domains

### Method 1: Using _data/domains.yml (for homepage cards)

Edit `_data/domains.yml`:

```yaml
- name: yourdomain.com
  price: 9999
  description: Your domain description
  category: Technology
  featured: true
```

### Method 2: Creating Individual Domain Pages

Create a new file in `_domains/` directory:

```markdown
---
layout: domain
name: yourdomain.com
price: 9999
description: Detailed description of your domain...
category: Technology
featured: true
---
```

The domain page will be automatically generated at `/domain/yourdomain/`

## 🔧 Configuration

### Site Settings

Edit `_config.yml`:

```yaml
title: Your Site Title
email: your-email@example.com
description: Your site description
url: "https://yourdomain.com"
```

### Escrow.com Integration

The "Buy Now" button automatically redirects to Escrow.com. The integration is in `assets/js/forms.js`:

```javascript
const escrowUrl = `https://www.escrow.com/buy/domain/${domainName}`;
```

### Form Submissions

To enable the "Make Offer" form submissions:

1. **Option 1: Formspree (Recommended for beginners)**
   - Sign up at [Formspree.io](https://formspree.io)
   - Get your form endpoint
   - Update `assets/js/forms.js`:
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

2. **Option 2: Custom Backend**
   - Set up your own API endpoint
   - Update the `submitOffer()` function in `assets/js/forms.js`

3. **Option 3: Email Fallback**
   - Uncomment the mailto section in `assets/js/forms.js`
   - Forms will open user's email client with pre-filled data

## 🌐 Deployment

### GitHub Pages (Free)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be published at `https://yourusername.github.io/vivpod-marketplace/`

### Custom Domain (vivpod.com)

1. In repository settings, add your custom domain
2. Create a `CNAME` file in the root:
```
vivpod.com
```

3. Configure DNS settings at your domain registrar:
   - Add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add CNAME record: `yourusername.github.io`

## 🎨 Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #4267B2;
    --secondary-color: #5CB85C;
    --text-color: #333;
}
```

### Search Behavior

Modify search logic in `assets/js/search.js`

### Layout & Design

- Header: `_includes/header.html`
- Footer: `_includes/footer.html`
- Homepage: `index.html`
- Domain pages: `_layouts/domain.html`

## 📧 Contact Form Setup

The contact form in `contact.md` uses the same submission system as the offer form. Configure it similarly in the inline script or extract to `forms.js`.

## 🔒 Security Notes

- All payment processing is handled by Escrow.com (secure third-party)
- Form submissions should be validated server-side
- Never store sensitive payment information on your site
- Use HTTPS in production (automatic with GitHub Pages)

## 📱 Responsive Design

The site is fully responsive and tested on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Performance

- Minimal JavaScript dependencies
- Optimized CSS
- Fast Jekyll static site generation
- CDN-ready (works great with GitHub Pages CDN)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or support:
- Email: contact@vivpod.com
- GitHub Issues: [Create an issue](https://github.com/Alex11832/vivpod-marketplace/issues)

## 🎯 Roadmap

- [ ] Add payment plan calculator
- [ ] Integrate with domain registrar APIs
- [ ] Add domain appraisal tool
- [ ] Multi-language support
- [ ] Advanced filtering (price range, TLD, length)
- [ ] Domain comparison feature
- [ ] Telegram/WhatsApp notifications for offers

---

Built with ❤️ using Jekyll
