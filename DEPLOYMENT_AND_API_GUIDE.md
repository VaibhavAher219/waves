# Wave CMS Deployment & API Guide

## 🚀 Deployment to buildwithwave.com

### Option 1: Subdomain Deployment (Recommended)
Deploy your CMS to a subdomain like `cms.buildwithwave.com` or `blog.buildwithwave.com`

#### Step 1: Environment Setup
Create a `.env.production` file:
```env
# Database
DATABASE_URI=postgresql://username:password@your-db-host:5432/wave_cms

# Security
PAYLOAD_SECRET=your-super-secure-secret-key-here
JWT_SECRET=another-secure-jwt-secret

# Domain Configuration  
NEXT_PUBLIC_SERVER_URL=https://cms.buildwithwave.com
NEXT_PUBLIC_MAIN_SITE_URL=https://buildwithwave.com

# Email (for admin notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@buildwithwave.com
SMTP_PASS=your-app-password

# Optional: File Storage
AWS_S3_BUCKET=wave-cms-media
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

#### Step 2: Build and Deploy
```bash
# Build the application
npm run build

# Deploy to your hosting platform (Vercel, Railway, DigitalOcean, etc.)
# Example for Vercel:
vercel --prod --env-file .env.production

# Example for Railway:
railway up --environment production

# Example for DigitalOcean App Platform:
doctl apps create --spec .do/app.yaml
```

#### Step 3: DNS Configuration
Add these DNS records to your domain:
```
Type: CNAME
Name: cms
Value: your-hosting-provider-url.com
```

### Option 2: Subdirectory Deployment
Deploy as part of your main site at `buildwithwave.com/cms`

#### Nginx Configuration Example:
```nginx
server {
    listen 80;
    server_name buildwithwave.com;

    # Main site (your existing landing page)
    location / {
        proxy_pass http://your-main-site:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # CMS routes
    location /cms {
        rewrite ^/cms(.*) $1 break;
        proxy_pass http://wave-cms:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /posts {
        proxy_pass http://wave-cms:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /resource-center {
        proxy_pass http://wave-cms:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /testimonials {
        proxy_pass http://wave-cms:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📡 API Content Management Workflow

### 1. API Endpoints Overview
Once deployed to `https://cms.buildwithwave.com`, your API endpoints will be:

```
Base URL: https://cms.buildwithwave.com/api

Authentication:
POST /api/users/login
POST /api/users/logout

Content Management:
GET    /api/posts              # List all posts
POST   /api/posts              # Create new post
GET    /api/posts/:id          # Get specific post
PATCH  /api/posts/:id          # Update post
DELETE /api/posts/:id          # Delete post

GET    /api/resources          # List resources
POST   /api/resources          # Create resource
GET    /api/resources/:id      # Get specific resource
PATCH  /api/resources/:id      # Update resource
DELETE /api/resources/:id      # Delete resource

Media Management:
POST   /api/media              # Upload media
GET    /api/media              # List media
DELETE /api/media/:id          # Delete media

Categories:
GET    /api/categories         # List categories
POST   /api/categories         # Create category
```

### 2. Authentication Flow

#### Step 1: Create Admin User
First, create an admin user through the web interface:
1. Visit `https://cms.buildwithwave.com/admin`
2. Create your admin account
3. Note down your credentials

#### Step 2: API Authentication
```javascript
// Login to get JWT token
const loginResponse = await fetch('https://cms.buildwithwave.com/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'your-admin@buildwithwave.com',
    password: 'your-secure-password'
  })
});

const { token } = await loginResponse.json();

// Use token for authenticated requests
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### 3. Complete Content Publishing Workflow

#### Updated API Class for Production:
```javascript
class WaveCMSAPI {
  constructor() {
    this.baseURL = 'https://cms.buildwithwave.com/api';
    this.token = null;
  }

  async login(email, password) {
    const response = await fetch(`${this.baseURL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    this.token = data.token;
    return this.token;
  }

  async publishBlogPost(title, content, categories = [], heroImage = null) {
    const postData = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-'),
      content: {
        root: {
          type: 'root',
          children: content
        }
      },
      categories,
      heroImage,
      _status: 'published',
      publishedAt: new Date().toISOString(),
      meta: {
        title: `${title} - Wave AI`,
        description: content[0]?.children?.[0]?.text?.substring(0, 160) || title
      }
    };

    const response = await fetch(`${this.baseURL}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    return await response.json();
  }

  async createResource(title, type, description, downloadUrl = null) {
    const resourceData = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-'),
      resourceType: type,
      excerpt: description,
      downloadUrl,
      _status: 'published'
    };

    const response = await fetch(`${this.baseURL}/resources`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resourceData)
    });

    return await response.json();
  }

  async uploadMedia(file, altText) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', altText);

    const response = await fetch(`${this.baseURL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: formData
    });

    return await response.json();
  }
}
```

### 4. Practical Usage Examples

#### Example 1: Publishing a Blog Post
```javascript
const cms = new WaveCMSAPI();

async function publishPost() {
  // 1. Login
  await cms.login('admin@buildwithwave.com', 'your-password');
  
  // 2. Create content
  const content = [
    {
      type: 'paragraph',
      children: [{
        type: 'text',
        text: 'Wave AI has revolutionized damage assessment for insurance companies...'
      }]
    },
    {
      type: 'heading',
      tag: 'h2',
      children: [{
        type: 'text',
        text: 'Key Benefits'
      }]
    },
    {
      type: 'paragraph',
      children: [{
        type: 'text',
        text: '• 95% faster processing\n• 99% accuracy rate\n• Significant cost savings'
      }]
    }
  ];
  
  // 3. Publish
  const result = await cms.publishBlogPost(
    'Wave AI Transforms Insurance Claims Processing',
    content,
    [], // categories
    null // hero image
  );
  
  console.log(`Published: https://cms.buildwithwave.com/posts/${result.doc.slug}`);
}
```

#### Example 2: Adding Resources
```javascript
async function addResources() {
  await cms.login('admin@buildwithwave.com', 'your-password');
  
  // Add case study
  await cms.createResource(
    'Premier Insurance Case Study',
    'case-study',
    'How Premier Insurance reduced claim processing time by 95% with Wave AI',
    'https://buildwithwave.com/downloads/premier-case-study.pdf'
  );
  
  // Add template
  await cms.createResource(
    'Damage Assessment Template',
    'template',
    'Standardized template for property damage assessment reports',
    'https://buildwithwave.com/downloads/assessment-template.docx'
  );
}
```

### 5. Automated Content Publishing

#### GitHub Actions Example:
```yaml
# .github/workflows/publish-content.yml
name: Publish Content to Wave CMS

on:
  push:
    paths:
      - 'content/**'
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install axios form-data
        
      - name: Publish Content
        env:
          CMS_EMAIL: ${{ secrets.CMS_EMAIL }}
          CMS_PASSWORD: ${{ secrets.CMS_PASSWORD }}
        run: node scripts/publish-content.js
```

### 6. Content Management Dashboard

#### Web Interface Access:
- **Admin Panel**: `https://cms.buildwithwave.com/admin`
- **Live Site**: `https://cms.buildwithwave.com`

#### Key Features Available:
- ✅ Rich text editor for blog posts
- ✅ Media library management
- ✅ Resource center management
- ✅ Category management
- ✅ SEO meta fields
- ✅ Draft/publish workflow
- ✅ User management

### 7. Integration with Main Site

#### Update your main buildwithwave.com navigation:
```html
<!-- Add these links to your main site header -->
<nav>
  <a href="https://buildwithwave.com">Home</a>
  <a href="https://cms.buildwithwave.com/posts">Blog</a>
  <a href="https://cms.buildwithwave.com/resource-center">Resources</a>
  <a href="https://cms.buildwithwave.com/testimonials">Testimonials</a>
</nav>
```

### 8. SEO and Analytics Setup

#### Add to your CMS pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Schema.org structured data for blog posts -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{post.title}}",
  "author": {
    "@type": "Organization",
    "name": "Wave AI"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wave AI",
    "logo": {
      "@type": "ImageObject",
      "url": "https://buildwithwave.com/logo.png"
    }
  }
}
</script>
```

This setup gives you a fully functional CMS at `cms.buildwithwave.com` with complete API access for automated content management!
