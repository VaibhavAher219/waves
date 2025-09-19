# Wave Blog Integration Guide

## 🎯 Overview
This PayloadCMS system serves as your blog/content management system that integrates with your main Wave landing page.

## 🔗 Integration Setup

### 1. Environment Variables
Add to your `.env` file:
```env
# Main landing page URL (update with your actual domain)
NEXT_PUBLIC_MAIN_SITE_URL=https://buildwithwave.com

# Or for development
# NEXT_PUBLIC_MAIN_SITE_URL=http://localhost:3001
```

### 2. Deployment Options

#### Option A: Subdomain (Recommended)
- Main Site: `https://buildwithwave.com`
- Blog: `https://blog.buildwithwave.com`

**Steps:**
1. Deploy this PayloadCMS to `blog.buildwithwave.com`
2. Update `NEXT_PUBLIC_MAIN_SITE_URL=https://buildwithwave.com`
3. Add blog link to your main site header

#### Option B: Subdirectory (Your Current Structure)
- Main Site: `https://buildwithwave.com`
- Features: `https://buildwithwave.com/features`
- Resource Center: `https://buildwithwave.com/resource-center`
- Blog: `https://buildwithwave.com/blog`

**Steps:**
1. Deploy this PayloadCMS to `buildwithwave.com/blog` and `buildwithwave.com/resource-center`
2. Update `NEXT_PUBLIC_MAIN_SITE_URL=https://buildwithwave.com`
3. Configure reverse proxy/routing

### 3. Main Landing Page Updates

Add this to your main landing page header:
```jsx
// Your main landing page header
<nav className="flex gap-6 items-center">
  <a href="/">Home</a>
  <a href="/features">Features</a>
  <a href="/resource-center">Resource Center</a>
  <a href="/blog">Blog</a>
</nav>
```

### 4. Cross-Domain Navigation
The PayloadCMS header now includes:
- **Home** → Links back to your main landing page
- **Features** → Links to main site features section
- **About** → Links to main site about section
- **Contact** → Links to main site contact section
- **Blog** → Internal blog navigation (stays in PayloadCMS)

### 5. SEO & Analytics
- Set up Google Analytics on both sites
- Use canonical URLs to avoid duplicate content
- Implement structured data for blog posts

## 🚀 Development Workflow

### For Blog Development:
```bash
cd /path/to/waves-ai
pnpm dev
# Blog runs on http://localhost:3000
```

### For Main Site Development:
```bash
cd /path/to/your-main-site
# Run your main landing page
# Should run on different port like http://localhost:3001
```

## 📱 Mobile Considerations
- Both sites should have consistent branding
- Mobile navigation should work seamlessly
- Consider a unified mobile menu

## 🎨 Design Consistency
- ✅ Wave branding applied throughout blog
- ✅ Consistent color scheme (grays and blues)
- ✅ Matching typography and spacing
- ✅ Blue gradient buttons
- ✅ Dotted background patterns

## 🔧 Admin Panel
- Access blog admin: `https://blog.wave.com/admin`
- Create and manage blog posts
- Configure navigation items
- Manage media and categories

## 📊 Content Strategy
Use this blog system for:
- Company updates and news
- Industry insights
- Technical articles about AI damage assessment
- Customer success stories
- Product announcements
