// Wave Blog API - Post Publishing Example
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class WaveBlogAPI {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.token = null;
  }

  // Step 1: Login and get token
  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseURL}/users/login`, {
        email,
        password
      });
      
      this.token = response.data.token;
      console.log('✅ Successfully logged in');
      return this.token;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Step 2: Upload hero image
  async uploadImage(imagePath, altText) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(imagePath));
      formData.append('alt', altText);

      const response = await axios.post(`${this.baseURL}/media`, formData, {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${this.token}`
        }
      });

      console.log('✅ Image uploaded successfully');
      return response.data.doc.id;
    } catch (error) {
      console.error('❌ Image upload failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Step 3: Create category if needed
  async createCategory(title, slug) {
    try {
      const response = await axios.post(`${this.baseURL}/categories`, {
        title,
        slug
      }, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ Category "${title}" created`);
      return response.data.doc.id;
    } catch (error) {
      // Category might already exist
      console.log(`ℹ️  Category "${title}" might already exist`);
      return null;
    }
  }

  // Step 4: Create and publish post
  async publishPost(postData) {
    try {
      const response = await axios.post(`${this.baseURL}/posts`, postData, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Post published successfully');
      console.log(`📝 Post URL: /posts/${response.data.doc.slug}`);
      return response.data.doc;
    } catch (error) {
      console.error('❌ Post creation failed:', error.response?.data || error.message);
      throw error;
    }
  }

  // Helper: Create Wave-branded content
  createWavePost(title, content, heroImageId = null, categoryIds = []) {
    return {
      title,
      ...(heroImageId && { heroImage: heroImageId }),
      content: {
        root: {
          type: 'root',
          children: content
        }
      },
      categories: categoryIds,
      meta: {
        title: `${title} - Wave AI Damage Assessment`,
        description: `${content[0]?.children?.[0]?.text?.substring(0, 160) || title} - Discover how Wave's AI technology is transforming insurance claims processing.`
      },
      _status: 'published',
      slug: title.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'),
      publishedAt: new Date().toISOString()
    };
  }
}

// Usage Example
async function publishWavePost() {
  const api = new WaveBlogAPI();
  
  try {
    // 1. Login
    await api.login('your-admin@buildwithwave.com', 'your-password');
    
    // 2. Upload hero image (optional)
    // const heroImageId = await api.uploadImage('./hero-image.jpg', 'Wave AI Dashboard');
    
    // 3. Create categories
    const caseStudyId = await api.createCategory('Case Studies', 'case-studies');
    const aiTechId = await api.createCategory('AI Technology', 'ai-technology');
    
    // 4. Create post content
    const content = [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Wave\'s AI-powered damage assessment platform is revolutionizing insurance claims processing, delivering accurate estimates in minutes instead of weeks.'
          }
        ]
      },
      {
        type: 'heading',
        tag: 'h2',
        children: [
          {
            type: 'text',
            text: 'Key Benefits for Insurance Companies'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: '• Reduce claim processing time by 95%\n• Improve accuracy with AI validation\n• Accelerate cash flow for customers\n• Lower operational costs significantly'
          }
        ]
      },
      {
        type: 'heading',
        tag: 'h2',
        children: [
          {
            type: 'text',
            text: 'Real-World Results'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Leading insurance companies report dramatic improvements in efficiency, customer satisfaction, and bottom-line results after implementing Wave\'s technology.'
          }
        ]
      }
    ];
    
    // 5. Create and publish post
    const postData = api.createWavePost(
      'How Wave AI Transforms Insurance Claims Processing',
      content,
      // heroImageId, // uncomment if you uploaded an image
      null,
      [caseStudyId, aiTechId].filter(Boolean)
    );
    
    const publishedPost = await api.publishPost(postData);
    
    console.log('🎉 Post published successfully!');
    console.log(`🔗 View at: http://localhost:3000/posts/${publishedPost.slug}`);
    
  } catch (error) {
    console.error('❌ Publishing failed:', error.message);
  }
}

// Run the example
publishWavePost();

module.exports = WaveBlogAPI;









